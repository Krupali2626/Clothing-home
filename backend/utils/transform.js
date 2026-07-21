// Shared response transformers so the frontend components receive the
// field shape they expect (id, salePrice, mrp, discount, reviewCount, image, badge)

const toProductObject = (product, opts = {}) => {
  const p = typeof product.toObject === "function" ? product.toObject() : { ...product };

  const price = Number(p.price) || 0;
  const discountPrice = Number(p.discountPrice) || 0;
  const salePrice = discountPrice > 0 && discountPrice < price ? discountPrice : price;
  const mrp = price;
  const discount = mrp > 0 ? Math.round(((mrp - salePrice) / mrp) * 100) : 0;

  let badge = null;
  if (p.flashSale) badge = "Flash Sale";
  else if (p.bestSeller) badge = "Best Seller";
  else if (p.featured) badge = "Featured";

  const categoryValue = (() => {
    if (typeof p.category === "object" && p.category !== null) {
      return p.category.slug || String(p.category._id || "");
    }
    return p.category || "";
  })();

  return {
    ...p,
    id: String(p._id),
    price,
    salePrice,
    mrp,
    discount,
    reviewCount: p.numReviews || 0,
    image: Array.isArray(p.images) && p.images.length ? p.images[0] : "",
    badge,
    category: categoryValue,
  };
};

const toCategoryObject = (category) => {
  const c = typeof category.toObject === "function" ? category.toObject() : { ...category };
  return {
    ...c,
    id: String(c._id),
  };
};

module.exports = { toProductObject, toCategoryObject };
