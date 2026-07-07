import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../Component/ProductCard';
import { products, categories } from './productsData';
import {
  FiSearch,
  FiSliders,
  FiRefreshCw,
  FiTruck,
  FiCheckCircle,
  FiArrowRight,
} from 'react-icons/fi';
import { TbShirt, TbHome, TbShoppingBag, TbArmchair, TbLayoutGrid } from 'react-icons/tb';

const categoryIcons = {
  all: <TbLayoutGrid size={18} />,
  clothing: <TbShirt size={18} />,
  'home-appliances': <TbHome size={18} />,
  accessories: <TbShoppingBag size={18} />,
  furniture: <TbArmchair size={18} />,
};

function Shop() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(1000);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    setActiveCategory(cat || 'all');
  }, [location.search]);

  let filtered = products.filter((p) => {
    const matchCat = activeCategory === 'all' || p.tags.includes(activeCategory);
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice = p.price <= priceRange;
    return matchCat && matchSearch && matchPrice;
  });

  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sortBy === 'newest') filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

  return (
    <main className="z_shop_page">
      <div className="z_page_hero">
        <div className="container">
          <span className="z_page_breadcrumb">Home / Shop</span>
          <h1 className="z_page_title">Our Collection</h1>
          <p className="z_page_subtitle">Explore {products.length}+ curated products across clothing &amp; home living</p>
        </div>
      </div>

      <div className="container z_shop_container">
        {/* ===== ADVERTISEMENT BANNER ===== */}
        <div className="z_ad_banner">
          <div className="z_ad_banner_content">
            <div className="z_ad_banner_text">
              <div className="z_ad_badge">
                <FiTruck size={16} />
                <span>Exclusive Offer</span>
              </div>
              <h3 className="z_ad_title">Free Shipping on Orders Over $75!</h3>
              <p className="z_ad_desc">Shop your favorite items and get free delivery when you spend $75 or more. Upgrade your lifestyle today!</p>
              <div className="z_ad_features">
                <div className="z_ad_feature">
                  <FiCheckCircle size={16} />
                  <span>Fast Delivery</span>
                </div>
                <div className="z_ad_feature">
                  <FiCheckCircle size={16} />
                  <span>Secure Payment</span>
                </div>
                <div className="z_ad_feature">
                  <FiCheckCircle size={16} />
                  <span>Easy Returns</span>
                </div>
              </div>
              <Link to="/shop" className="z_ad_btn">
                Browse Collection <FiArrowRight size={14} />
              </Link>
            </div>
            <div className="z_ad_banner_visual">
              <div className="z_ad_visual_decor_1"></div>
              <div className="z_ad_visual_decor_2"></div>
              <div className="z_ad_main_icon">
                <FiTruck size={64} />
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-lg-3">
            <div className="z_filters_panel">
              <h5 className="z_filters_title">
                <FiSliders size={18} style={{ marginRight: 8 }} />
                Filters
              </h5>

              {/* Search */}
              <div className="z_filter_group">
                <label className="z_filter_label">Search</label>
                <div className="z_search_input_wrap">
                  <input
                    type="text"
                    className="z_filter_search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FiSearch className="z_filter_search_icon" size={15} />
                </div>
              </div>

              {/* Categories */}
              <div className="z_filter_group">
                <label className="z_filter_label">Category</label>
                <div className="z_filter_cats">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`z_filter_cat_btn ${activeCategory === cat.id ? 'z_filter_cat_active' : ''}`}
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      <span className="z_filter_cat_icon">{categoryIcons[cat.id]}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="z_filter_group">
                <label className="z_filter_label">
                  Max Price: <strong>${priceRange}</strong>
                </label>
                <input
                  type="range"
                  className="z_price_range"
                  min={20}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
                <div className="z_price_range_labels">
                  <span>$20</span>
                  <span>$1000</span>
                </div>
              </div>

              {/* Reset */}
              <button
                className="z_filter_reset_btn"
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); setPriceRange(1000); setSortBy('default'); }}
              >
                <FiRefreshCw size={14} style={{ marginRight: 6 }} />
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            <div className="z_shop_toolbar">
              <p className="z_results_count">
                Showing <strong>{filtered.length}</strong> products
              </p>
              <div className="z_sort_wrap">
                <label className="z_sort_label">Sort by:</label>
                <select className="z_sort_select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="z_no_products">
                <FiSearch size={48} className="z_no_products_icon" />
                <h5>No products found</h5>
                <p>Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="row g-4">
                {filtered.map((product) => (
                  <div className="col-6 col-md-4 col-xl-4" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Shop;
