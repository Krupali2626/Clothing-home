import React from 'react';
import { Container, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaStar, FaHeart, FaShoppingCart, FaShareAlt, FaCheckCircle } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import GoogleAdBanner from '../components/GoogleAdBanner';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) {
    return <div className="text-center p-5">Product not found</div>;
  }

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <>
      <section className="d_section">
        <Container>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <Swiper
                modules={[Navigation]}
                navigation
                className="mb-3"
                style={{ borderRadius: '18px', overflow: 'hidden' }}
              >
                {product.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={img}
                      alt={product.name}
                      style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Row className="g-2">
                {product.images.map((img, i) => (
                  <Col key={i} xs={3}>
                    <img
                      src={img}
                      alt={`View ${i + 1}`}
                      style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '12px', cursor: 'pointer' }}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col md={6}>
              {product.badge && (
                <span className="d_badge mb-2" style={{ position: 'relative', top: '0', left: '0' }}>{product.badge}</span>
              )}
              <h2 style={{ color: '#4A3F35', marginBottom: '16px' }}>{product.name}</h2>
              
              <div className="d-flex align-items-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <FaStar key={i} size={16} color={i <= Math.floor(product.rating) ? '#FFB84D' : '#E5E7EB'} />
                ))}
                <span style={{ color: '#8B7E74' }}>({product.reviews} reviews)</span>
              </div>

              <div className="d-flex align-items-center gap-3 mb-4">
                {product.discount > 0 && (
                  <span style={{ fontSize: '20px', color: '#B8A99D', textDecoration: 'line-through' }}>
                    ${product.price.toFixed(2)}
                  </span>
                )}
                <span style={{ fontSize: '32px', color: '#4A3F35', fontWeight: '700', background: 'linear-gradient(135deg, #FF9A8B 0%, #FFECD2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  ${product.discountedPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="d_badge_danger" style={{ fontSize: '14px', position: 'relative', top: '0', left: '0' }}>
                    Save {product.discount}%
                  </span>
                )}
              </div>

              <p style={{ color: '#8B7E74', marginBottom: '24px' }}>{product.description}</p>

              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <h6 style={{ marginBottom: '12px', color: '#4A3F35' }}>Color: <span style={{ color: '#8B7E74' }}>Black</span></h6>
                  <div className="d-flex gap-2">
                    {product.colors.map((color, i) => (
                      <Button key={i} variant="outline-secondary" size="sm" className="d_btn_outline" style={{ borderColor: '#F5E6D3', color: '#4A3F35' }}>{color}</Button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4">
                  <h6 style={{ marginBottom: '12px', color: '#4A3F35' }}>Size: <span style={{ color: '#8B7E74' }}>M</span></h6>
                  <div className="d-flex gap-2">
                    {product.sizes.map((size, i) => (
                      <Button key={i} variant="outline-secondary" size="sm" className="d_btn_outline" style={{ borderColor: '#F5E6D3', color: '#4A3F35' }}>{size}</Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="d-flex align-items-center gap-2 mb-4">
                <FaCheckCircle size={18} style={{ color: '#6BCB77' }} />
                <span style={{ color: '#6BCB77', fontWeight: '600' }}>In Stock</span>
              </div>

              <div className="d-flex gap-3 mb-4 flex-wrap">
                <Button className="d_btn" style={{ padding: '12px 32px' }}>
                  <FaShoppingCart className="me-2" /> Add to Cart
                </Button>
                <Button className="d_btn" style={{ padding: '12px 32px', background: 'linear-gradient(135deg, #C7CEEA 0%, #B5D7E5 100%)' }}>
                  Buy Now
                </Button>
                <Button variant="outline-secondary" className="rounded-circle d_product_action_btn" style={{ width: '48px', height: '48px', background: 'white' }}>
                  <FaHeart />
                </Button>
                <Button variant="outline-secondary" className="rounded-circle d_product_action_btn" style={{ width: '48px', height: '48px', background: 'white' }}>
                  <FaShareAlt />
                </Button>
              </div>

              <div className="d-flex gap-4 small" style={{ color: '#8B7E74' }}>
                <span>SKU: PRD{product.id}</span>
                <span>Category: {product.category}</span>
                <span>Brand: {product.brand}</span>
              </div>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <Tabs defaultActiveKey="description">
                <Tab eventKey="description" title="Description">
                  <div className="d_card p-4 mt-3">
                    <h5 style={{ marginBottom: '16px', color: '#4A3F35' }}>Product Description</h5>
                    <p style={{ color: '#8B7E74' }}>{product.description}</p>
                    <p style={{ color: '#8B7E74' }}>
                      Experience premium quality with our {product.name}. Designed for comfort and durability, this product is perfect for everyday use.
                    </p>
                  </div>
                </Tab>
                <Tab eventKey="specifications" title="Specifications">
                  <div className="d_card p-4 mt-3">
                    <h5 style={{ marginBottom: '16px', color: '#4A3F35' }}>Technical Specifications</h5>
                    {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                      <Row key={key} className="border-bottom py-2" style={{ borderColor: '#F5E6D3' }}>
                        <Col md={4} style={{ fontWeight: '500', color: '#4A3F35' }}>{key}</Col>
                        <Col md={8} style={{ color: '#8B7E74' }}>{value}</Col>
                      </Row>
                    ))}
                  </div>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                  <div className="d_card p-4 mt-3">
                    <h5 style={{ marginBottom: '16px', color: '#4A3F35' }}>Customer Reviews</h5>
                    <p style={{ color: '#8B7E74' }}>No reviews yet. Be the first to review this product!</p>
                  </div>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </section>

      <GoogleAdBanner />

      <section className="d_section d_section_white">
        <Container>
          <h2 className="d_section_title">Related Products</h2>
          <Row className="g-4">
            {relatedProducts.map(p => (
              <Col key={p.id} lg={3} md={4} sm={6}>
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;
