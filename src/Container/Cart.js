import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import {
  FiShoppingBag,
  FiArrowRight,
  FiArrowLeft,
  FiTrash2,
  FiShield,
  FiLock,
} from 'react-icons/fi';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="z_cart_page">
        <div className="z_page_hero">
          <div className="container">
            <span className="z_page_breadcrumb">Home / Cart</span>
            <h1 className="z_page_title">Your Cart</h1>
          </div>
        </div>
        <div className="container z_empty_cart">
          <div className="z_empty_cart_inner">
            <FiShoppingBag size={64} className="z_empty_cart_icon" />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet. Let's fix that!</p>
            <Link to="/shop" className="z_btn_primary">Start Shopping <FiArrowRight size={16} /></Link>
          </div>
        </div>
      </main>
    );
  }

  const shipping = cartTotal >= 75 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;

  return (
    <main className="z_cart_page">
      <div className="z_page_hero">
        <div className="container">
          <span className="z_page_breadcrumb">Home / Cart</span>
          <h1 className="z_page_title">Your Cart</h1>
          <p className="z_page_subtitle">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your bag</p>
        </div>
      </div>

      <div className="container z_cart_container">
        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="z_cart_items">
              <div className="z_cart_header">
                <span>Product</span>
                <span>Price</span>
                <span>Qty</span>
                <span>Total</span>
              </div>
              {cartItems.map((item) => (
                <div className="z_cart_item" key={item.id}>
                  <div className="z_cart_item_product">
                    <div className="z_cart_item_image" style={{ background: item.bgColor || '#f5f0eb' }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="z_cart_item_img" />
                      ) : (
                        <FiShoppingBag size={28} color="#ccc" />
                      )}
                    </div>
                    <div className="z_cart_item_details">
                      <h6 className="z_cart_item_name">{item.name}</h6>
                      <span className="z_cart_item_category">{item.category}</span>
                      <button className="z_cart_remove_btn" onClick={() => removeFromCart(item.id)}>
                        <FiTrash2 size={13} style={{ marginRight: 4 }} /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="z_cart_item_price">${item.price.toFixed(2)}</div>
                  <div className="z_cart_item_qty">
                    <button className="z_qty_btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span className="z_qty_num">{item.quantity}</span>
                    <button className="z_qty_btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="z_cart_item_total">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              <div className="z_cart_actions">
                <Link to="/shop" className="z_btn_ghost">
                  <FiArrowLeft size={15} /> Continue Shopping
                </Link>
                <button className="z_cart_clear_btn" onClick={clearCart}>
                  <FiTrash2 size={14} style={{ marginRight: 4 }} /> Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="z_order_summary">
              <h5 className="z_summary_title">Order Summary</h5>
              <div className="z_summary_row">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="z_summary_row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="z_free_tag">FREE</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="z_free_shipping_note">
                  Add ${(75 - cartTotal).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="z_summary_row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="z_summary_divider"></div>
              <div className="z_summary_row z_summary_total">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              <div className="z_promo_code_wrap">
                <input type="text" className="z_promo_input" placeholder="Promo code" />
                <button className="z_promo_apply_btn">Apply</button>
              </div>

              <button className="z_checkout_btn">
                Proceed to Checkout <FiArrowRight size={18} />
              </button>

              <div className="z_secure_badges">
                <FiLock size={13} />
                <span>Secure Checkout</span>
                <span>•</span>
                <FiShield size={13} />
                <span>SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
