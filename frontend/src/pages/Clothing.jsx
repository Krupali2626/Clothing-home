import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Row, Col, Form, Offcanvas, Badge } from "react-bootstrap";
import {
  FaFilter,
  FaSort,
  FaChevronDown,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import ProductCard from "../components/common/ProductCard";
import GoogleAdBanner from "../components/common/GoogleAdBanner";
import { useShop } from "../context/ShopContext";
import { productAPI } from "../services/api";
import "./Clothing.css";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Biggest Discount" },
];

const PRICE_RANGES = [
  { label: "Under ₹1,000", min: 0, max: 999 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 1999 },
  { label: "₹2,000 – ₹3,500", min: 2000, max: 3499 },
  { label: "₹3,500 – ₹5,000", min: 3500, max: 4999 },
  { label: "Above ₹5,000", min: 5000, max: Infinity },
];

// ─── Filter Section (collapsible) ────────────────────────────────────────────
const FilterSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="d_filter_section">
      <button className="d_filter_heading" onClick={() => setOpen((o) => !o)}>
        {title}
        <FaChevronDown className={`d_filter_chevron ${open ? "open" : ""}`} />
      </button>
      {open && <div className="d_filter_body">{children}</div>}
    </div>
  );
};

// ─── Filter Panel ─────────────────────────────────────────────────────────────
const FilterPanel = ({
  filters,
  setFilters,
  brands = [],
  categories = [],
  onClearAll,
}) => {
  const handleBrand = (brand) => {
    setFilters((f) => ({
      ...f,
      brands: f.brands.includes(brand)
        ? f.brands.filter((b) => b !== brand)
        : [...f.brands, brand],
    }));
  };

  const handlePrice = (label) => {
    setFilters((f) => ({
      ...f,
      priceRange: f.priceRange === label ? null : label,
    }));
  };

  const handleRating = (r) => {
    setFilters((f) => ({ ...f, minRating: f.minRating === r ? 0 : r }));
  };

  const handleCategory = (slug) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(slug)
        ? f.categories.filter((c) => c !== slug)
        : [...f.categories, slug],
    }));
  };

  return (
    <div className="d_filter_panel">
      {/* Gender */}
      <FilterSection title="Gender">
        <ul className="d_filter_list">
          {["all", "male", "female"].map((g) => (
            <li key={g}>
              <label className="d_filter_checkbox">
                <input
                  type="radio"
                  name="gender"
                  checked={
                    g === "all"
                      ? (filters.gender || []).length === 0
                      : (filters.gender || []).includes(g)
                  }
                  onChange={() =>
                    setFilters((f) => ({
                      ...f,
                      gender: g === "all" ? [] : [g],
                    }))
                  }
                />
                <span>
                  {g === "all" ? "All" : g === "male" ? "Male" : "Female"}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Category */}
      {categories.length > 0 && (
        <FilterSection title="Category">
          <ul className="d_filter_list">
            {categories.map((c) => (
              <li key={c.id || c.slug}>
                <label className="d_filter_checkbox">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(c.slug)}
                    onChange={() => handleCategory(c.slug)}
                  />
                  <span>{c.name}</span>
                  {c.count != null && <small>{c.count}</small>}
                </label>
              </li> 
            ))}
          </ul>
        </FilterSection>
      )}

      {/* Brand */}
      {brands.length > 0 && (
        <FilterSection title="Brand">
          <ul className="d_filter_list">
            {brands.map((b) => (
              <li key={b}>
                <label className="d_filter_checkbox">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(b)}
                    onChange={() => handleBrand(b)}
                  />
                  <span>{b}</span>
                </label>
              </li>
            ))}
          </ul>
        </FilterSection>
      )}

      {/* Price Range */}
      <FilterSection title="Price Range">
        <ul className="d_filter_list">
          {PRICE_RANGES.map((r) => (
            <li key={r.label}>
              <label className="d_filter_checkbox">
                <input
                  type="radio"
                  name="price"
                  checked={filters.priceRange === r.label}
                  onChange={() => handlePrice(r.label)}
                />
                <span>{r.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Minimum Rating */}
      <FilterSection title="Minimum Rating">
        {[4, 3, 2].map((r) => (
          <label key={r} className="d_filter_checkbox d_filter_rating">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === r}
              onChange={() => handleRating(r)}
            />
            <span>
              {"★".repeat(r)}
              {"☆".repeat(5 - r)} & above
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <label className="d_filter_checkbox">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={() => setFilters((f) => ({ ...f, inStock: !f.inStock }))}
          />
          <span>In Stock Only</span>
        </label>
      </FilterSection>

      <button className="d_filter_clear" onClick={onClearAll}>
        Clear All Filters
      </button>
    </div>
  );
};

// ─── Default filter state ─────────────────────────────────────────────────────
const defaultFilters = {
  categories: [],
  brands: [],
  priceRange: null,
  minRating: 0,
  inStock: false,
  gender: [],
};

// ─── Main Clothing Page ───────────────────────────────────────────────────────
const Clothing = () => {
  const { categories: apiCategories } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Local products state (separate from ShopContext global) ──
  const [allProducts, setAllProducts] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);

  // ── Read URL params once on mount ──
  const urlCategory = searchParams.get("category") || "";
  const urlSort = searchParams.get("sort") || "featured";
  const urlFilter = searchParams.get("filter") || "";
  const urlSearch = searchParams.get("search") || "";

  const [sort, setSort] = useState(urlSort);
  const [search, setSearch] = useState(urlSearch);
  const [filters, setFilters] = useState({
    ...defaultFilters,
    categories: urlCategory ? [urlCategory] : [],
  });
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // ── Fetch clothing products once ──────────────────────────────────────────
  useEffect(() => {
    setLocalLoading(true);
    productAPI
      .getAllProducts({ type: "clothing" })
      .then((res) => setAllProducts(res.products || []))
      .catch((err) => {
        console.error("Failed to fetch clothing products:", err);
        setAllProducts([]);
      })
      .finally(() => setLocalLoading(false));
  }, []);

  // ── Sync URL → filter state when URL changes externally (e.g. nav links) ──
  useEffect(() => {
    const cat = searchParams.get("category") || "";
    setFilters((f) => {
      const already =
        f.categories.length === (cat ? 1 : 0) &&
        (!cat || f.categories[0] === cat);
      if (already) return f; // no change, avoid re-render
      return { ...f, categories: cat ? [cat] : [] };
    });
  }, [searchParams.get("category")]);

  // ── Derived: unique brands from local products ────────────────────────────
  const brands = useMemo(
    () => [...new Set(allProducts.map((p) => p.brand || "").filter(Boolean))],
    [allProducts],
  );

  // ── Derived: clothing categories (optionally filtered by gender) ──────────
  const clothingCats = useMemo(() => {
    // Accept categories that have type "clothing" OR whose slug appears in products
    const productCategorySlugs = new Set(allProducts.map((p) => p.category).filter(Boolean));

    let cats = apiCategories.filter(
      (c) =>
        c.type === "clothing" ||
        productCategorySlugs.has(c.slug),
    );

    // When a single gender is selected, only show categories that have products for that gender
    if (filters.gender.length === 1) {
      const gender = filters.gender[0].toLowerCase();
      const genderSlugs = new Set(
        allProducts
          .filter((p) => p.gender && p.gender.toLowerCase() === gender)
          .map((p) => p.category)
          .filter(Boolean),
      );
      cats = cats.filter((c) => genderSlugs.has(c.slug));
    }

    return cats;
  }, [apiCategories, allProducts, filters.gender]);

  // ── Filtered + sorted product list ───────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...allProducts];

    // URL ?filter=sale
    if (urlFilter === "sale") {
      list = list.filter((p) => (p.discount || 0) >= 15);
    }

    // Gender
    if (filters.gender.length > 0) {
      list = list.filter(
        (p) => p.gender && filters.gender.includes(p.gender.toLowerCase()),
      );
    }

    // Category
    if (filters.categories.length > 0) {
      list = list.filter((p) =>
        filters.categories.includes(p.category || ""),
      );
    }

    // Brand
    if (filters.brands.length > 0) {
      list = list.filter((p) => filters.brands.includes(p.brand));
    }

    // Price range
    if (filters.priceRange) {
      const range = PRICE_RANGES.find((r) => r.label === filters.priceRange);
      if (range) {
        list = list.filter(
          (p) =>
            (p.salePrice || p.price || 0) >= range.min &&
            (p.salePrice || p.price || 0) <= range.max,
        );
      }
    }

    // Rating
    if (filters.minRating > 0) {
      list = list.filter((p) => (p.rating || 0) >= filters.minRating);
    }

    // In stock
    if (filters.inStock) {
      list = list.filter((p) => p.stock > 0);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.brand || "").toLowerCase().includes(q),
      );
    }

    // Sort
    switch (sort) {
      case "newest":
        return [...list].reverse();
      case "price-asc":
        return [...list].sort(
          (a, b) => (a.salePrice || a.price || 0) - (b.salePrice || b.price || 0),
        );
      case "price-desc":
        return [...list].sort(
          (a, b) => (b.salePrice || b.price || 0) - (a.salePrice || a.price || 0),
        );
      case "rating":
        return [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "discount":
        return [...list].sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return list;
    }
  }, [allProducts, filters, sort, search, urlFilter]);

  // ── Active filter count (for badge) ──────────────────────────────────────
  const activeFilterCount =
    (filters.gender.length > 0 ? 1 : 0) +
    filters.categories.length +
    filters.brands.length +
    (filters.priceRange ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0);

  // ── Clear all filters ─────────────────────────────────────────────────────
  const clearAllFilters = () => {
    setFilters(defaultFilters);
    setSearch("");
    setSort("featured");
    // Clear all filter-related params from URL
    const newParams = new URLSearchParams();
    // Keep only non-filter params like ?filter=sale if present
    const filterParam = searchParams.get("filter");
    if (filterParam) newParams.set("filter", filterParam);
    setSearchParams(newParams);
  };

  // ── Search handler ────────────────────────────────────────────────────────
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set("search", val);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  // ── Sort handler ──────────────────────────────────────────────────────────
  const handleSortChange = (e) => {
    const val = e.target.value;
    setSort(val);
    const newParams = new URLSearchParams(searchParams);
    if (val && val !== "featured") {
      newParams.set("sort", val);
    } else {
      newParams.delete("sort");
    }
    setSearchParams(newParams);
  };

  const isLoading = localLoading;

  if (isLoading) {
    return (
      <div className="d_listing_page">
        <div className="container d_section text-center">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d_listing_page">
      {/* Page Banner */}
      <div
        className="d_page_banner"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&h=300&fit=crop&auto=format)",
        }}
      >
        <div className="d_page_banner_overlay" />
        <div className="d_page_banner_content container">
          <h1>Clothing</h1>
          <nav aria-label="breadcrumb">
            <ol className="d_breadcrumb">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <FaChevronRight size={10} />
              </li>
              <li>Clothing</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container d_section">
        {/* Ad Banner */}
        <div className="mb-4">
          <GoogleAdBanner size="banner" />
        </div>

        <div className="d_listing_layout">
          {/* Sidebar (desktop) */}
          <aside className="d_sidebar d-none d-lg-block">
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              brands={brands}
              categories={clothingCats}
              onClearAll={clearAllFilters}
            />
          </aside>

          {/* Main content */}
          <div className="d_listing_main">
            {/* Toolbar */}
            <div className="d_listing_toolbar">
              <div className="d_toolbar_left">
                <button
                  className="d_filter_mobile_btn d-lg-none"
                  onClick={() => setShowMobileFilter(true)}
                >
                  <FaFilter /> Filters
                  {activeFilterCount > 0 && (
                    <Badge bg="" className="d_filter_badge">
                      {activeFilterCount}
                    </Badge>
                  )}
                </button>
                <p className="d_result_count">
                  <strong>{filtered.length}</strong> products
                </p>
              </div>

              <div className="d_toolbar_right">
                <div className="d_search_inline">
                  <input
                    type="text"
                    placeholder="Search clothing…"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="d_sort_wrap">
                  <FaSort size={13} />
                  <Form.Select
                    size="sm"
                    value={sort}
                    onChange={handleSortChange}
                    className="d_sort_select"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            </div>

            {/* Products grid */}
            {filtered.length === 0 ? (
              <div className="d_no_results">
                <p>No products match your filters.</p>
                <button className="d_btn_outline" onClick={clearAllFilters}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <Row className="g-3">
                {filtered.map((p) => (
                  <Col key={p.id || p._id} xs={6} md={4} lg={4} xl={3}>
                    <ProductCard product={p} />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter offcanvas */}
      <Offcanvas
        show={showMobileFilter}
        onHide={() => setShowMobileFilter(false)}
        placement="start"
        className="d_filter_offcanvas"
      >
        <Offcanvas.Header className="d_filter_offcanvas_header">
          <h5>
            Filters{" "}
            {activeFilterCount > 0 && (
              <Badge bg="">{activeFilterCount}</Badge>
            )}
          </h5>
          <button
            onClick={() => setShowMobileFilter(false)}
            aria-label="Close filters"
          >
            <FaTimes />
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            brands={brands}
            categories={clothingCats}
            onClearAll={clearAllFilters}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Clothing;
