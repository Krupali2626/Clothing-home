import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Row, Col, Form, Offcanvas, Badge } from "react-bootstrap";
import {
  FaFilter,
  FaSort,
  FaChevronDown,
  FaChevronRight,
  FaTimes,
  FaThLarge,
  FaList,
} from "react-icons/fa";
import ProductCard from "../components/common/ProductCard";
import GoogleAdBanner from "../components/common/GoogleAdBanner";
import products from "../data/products";
import categories from "../data/categories";
import "./Clothing.css";

const clothingCats = categories.filter((c) => c.type === "clothing");
const clothingProducts = products.filter((p) => p.type === "clothing");

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Biggest Discount" },
];

const BRANDS = [...new Set(clothingProducts.map((p) => p.brand))];
const PRICE_RANGES = [
  { label: "Under ₹1,000", min: 0, max: 999 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 1999 },
  { label: "₹2,000 – ₹3,500", min: 2000, max: 3499 },
  { label: "₹3,500 – ₹5,000", min: 3500, max: 4999 },
  { label: "Above ₹5,000", min: 5000, max: Infinity },
];

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

const FilterPanel = ({ filters, setFilters }) => {
  const handleBrand = (brand) => {
    setFilters((f) => ({
      ...f,
      brands: f.brands.includes(brand)
        ? f.brands.filter((b) => b !== brand)
        : [...f.brands, brand],
    }));
  };

  const handlePrice = (range) => {
    setFilters((f) => ({
      ...f,
      priceRange: f.priceRange === range ? null : range,
    }));
  };

  const handleRating = (r) => {
    setFilters((f) => ({ ...f, minRating: f.minRating === r ? 0 : r }));
  };

  return (
    <div className="d_filter_panel">
      <FilterSection title="Category">
        <ul className="d_filter_list">
          {clothingCats.map((c) => (
            <li key={c.id}>
              <label className="d_filter_checkbox">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(c.slug)}
                  onChange={() =>
                    setFilters((f) => ({
                      ...f,
                      categories: f.categories.includes(c.slug)
                        ? f.categories.filter((x) => x !== c.slug)
                        : [...f.categories, c.slug],
                    }))
                  }
                />
                <span>{c.name}</span>
                <small>{c.count}</small>
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Brand">
        <ul className="d_filter_list">
          {BRANDS.map((b) => (
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
              {"★".repeat(r)}{"☆".repeat(5 - r)} & above
            </span>
          </label>
        ))}
      </FilterSection>

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

      <button
        className="d_filter_clear"
        onClick={() =>
          setFilters({ categories: [], brands: [], priceRange: null, minRating: 0, inStock: false })
        }
      >
        Clear All Filters
      </button>
    </div>
  );
};

const Clothing = () => {
  const [searchParams] = useSearchParams();
  const initCategory = searchParams.get("category") || "";
  const initSort = searchParams.get("sort") || "featured";
  const initFilter = searchParams.get("filter") || "";

  const [sort, setSort] = useState(initSort);
  const [filters, setFilters] = useState({
    categories: initCategory ? [initCategory] : [],
    brands: [],
    priceRange: null,
    minRating: 0,
    inStock: false,
  });
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = [...clothingProducts];

    if (initFilter === "sale") list = list.filter((p) => p.discount >= 15);
    if (filters.categories.length)
      list = list.filter((p) => filters.categories.includes(p.category?.toLowerCase().replace(/\s+/g, "-") || ""));
    if (filters.brands.length) list = list.filter((p) => filters.brands.includes(p.brand));
    if (filters.priceRange) {
      const range = PRICE_RANGES.find((r) => r.label === filters.priceRange);
      if (range) list = list.filter((p) => p.salePrice >= range.min && p.salePrice <= range.max);
    }
    if (filters.minRating) list = list.filter((p) => p.rating >= filters.minRating);
    if (filters.inStock) list = list.filter((p) => p.stock > 0);
    if (search.trim())
      list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    switch (sort) {
      case "newest": return list.reverse();
      case "price-asc": return list.sort((a, b) => a.salePrice - b.salePrice);
      case "price-desc": return list.sort((a, b) => b.salePrice - a.salePrice);
      case "rating": return list.sort((a, b) => b.rating - a.rating);
      case "discount": return list.sort((a, b) => b.discount - a.discount);
      default: return list;
    }
  }, [filters, sort, search, initFilter]);

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    (filters.priceRange ? 1 : 0) +
    (filters.minRating ? 1 : 0) +
    (filters.inStock ? 1 : 0);

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
              <li><Link to="/">Home</Link></li>
              <li><FaChevronRight size={10} /></li>
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
            <FilterPanel filters={filters} setFilters={setFilters} />
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
                    <Badge bg="" className="d_filter_badge">{activeFilterCount}</Badge>
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
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="d_sort_wrap">
                  <FaSort size={13} />
                  <Form.Select
                    size="sm"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="d_sort_select"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className="d_grid_toggle">
                  <button
                    className={gridView ? "active" : ""}
                    onClick={() => setGridView(true)}
                    aria-label="Grid view"
                  >
                    <FaThLarge />
                  </button>
                  <button
                    className={!gridView ? "active" : ""}
                    onClick={() => setGridView(false)}
                    aria-label="List view"
                  >
                    <FaList />
                  </button>
                </div>
              </div>
            </div>

            {/* Products grid */}
            {filtered.length === 0 ? (
              <div className="d_no_results">
                <p>No products match your filters.</p>
                <button
                  className="d_btn_outline"
                  onClick={() =>
                    setFilters({ categories: [], brands: [], priceRange: null, minRating: 0, inStock: false })
                  }
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <Row className={`g-3 ${gridView ? "" : "d_list_view"}`}>
                {filtered.map((p) => (
                  <Col
                    key={p.id}
                    xs={6}
                    md={gridView ? 4 : 12}
                    lg={gridView ? 4 : 12}
                    xl={gridView ? 3 : 12}
                  >
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
          <h5>Filters {activeFilterCount > 0 && <Badge bg="">{activeFilterCount}</Badge>}</h5>
          <button onClick={() => setShowMobileFilter(false)} aria-label="Close filters">
            <FaTimes />
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FilterPanel filters={filters} setFilters={setFilters} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Clothing;
