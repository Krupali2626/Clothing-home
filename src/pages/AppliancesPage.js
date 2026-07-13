import React from 'react';
import { Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import categories from '../data/categories';
import GoogleAdBanner from '../components/GoogleAdBanner';

const AppliancesPage = () => {
  const { category } = useParams();
  
  const filteredProducts = products.filter(p => 
    p.category === category || p.subcategory === category
  );

  const categoryData = categories.find(c => c.slug === category);

  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #A8E6CF 0%, #Dcedc1 50%, #FFF3CD 100%)', padding: '80px 0', textAlign: 'center' }}>
        <Container>
          <h1 style={{ color: '#4A3F35', fontSize: '48px', marginBottom: '16px' }}>
            {categoryData ? categoryData.name : 'Home Appliances'}
          </h1>
          <p style={{ color: '#8B7E74', fontSize: '18px' }}>Upgrade your home today</p>
        </Container>
      </section>

      <section className="d_section">
        <Container>
          <Row>
            <Col md={3} className="mb-4 mb-md-0">
              <div className="d_card p-4 mb-4">
                <h5 style={{ color: '#4A3F35', marginBottom: '20px' }}>Filters</h5>
                
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: '500', color: '#4A3F35' }}>Price Range</Form.Label>
                  <Form.Range />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: '500', color: '#4A3F35' }}>Brand</Form.Label>
                  {['Samsung', 'LG', 'Sony', 'Whirlpool'].map(brand => (
                    <Form.Check key={brand} type="checkbox" label={brand} />
                  ))}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: '500', color: '#4A3F35' }}>Rating</Form.Label>
                  {['4 Stars & Up', '3 Stars & Up'].map(r => (
                    <Form.Check key={r} type="checkbox" label={r} />
                  ))}
                </Form.Group>

                <Button className="d_btn w-100">Apply Filters</Button>
              </div>
            </Col>
            <Col md={9}>
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <p style={{ color: '#8B7E74', marginBottom: 0 }}>
                  Showing {filteredProducts.length} products
                </p>
                <Form.Select style={{ width: 'auto' }} className="d_input">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </Form.Select>
              </div>

              <Row className="g-4">
                {filteredProducts.map(product => (
                  <Col key={product.id} lg={4} md={6} sm={6}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>

              <div className="d-flex justify-content-center mt-5">
                <Pagination>
                  <Pagination.First />
                  <Pagination.Prev />
                  <Pagination.Item active>{1}</Pagination.Item>
                  <Pagination.Item>{2}</Pagination.Item>
                  <Pagination.Item>{3}</Pagination.Item>
                  <Pagination.Ellipsis />
                  <Pagination.Next />
                  <Pagination.Last />
                </Pagination>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <GoogleAdBanner />
    </>
  );
};

export default AppliancesPage;
