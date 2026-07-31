import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useShop } from "../../context/ShopContext";

const CartNotice = () => {
  const { cartNotice, setCartNotice } = useShop();
  useEffect(() => {
    if (!cartNotice) return undefined;
    const timer = setTimeout(() => setCartNotice(null), 3000);
    return () => clearTimeout(timer);
  }, [cartNotice, setCartNotice]);

  if (!cartNotice) return null;
  return <Alert variant={cartNotice.type} dismissible onClose={() => setCartNotice(null)} className="d_cart_notice">{cartNotice.text}</Alert>;
};

export default CartNotice;
