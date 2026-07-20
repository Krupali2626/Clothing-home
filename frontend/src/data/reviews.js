// Reviews with real Unsplash avatar images
const avatarImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&auto=format",
];

const names = [
  "Ananya Sharma",
  "Rohit Verma",
  "Priya Nair",
  "Karan Mehta",
  "Sara Khan",
  "Vikram Singh",
  "Neha Gupta",
  "Arjun Reddy",
  "Divya Iyer",
  "Manish Patel",
];

const comments = [
  "Great quality and the delivery was much faster than expected. Absolutely love the product!",
  "Exactly as described, fits perfectly and feels premium. Will definitely buy again.",
  "Customer support helped me pick the right size — very happy with the overall experience.",
  "Good value for money, packaging was excellent and product exceeded expectations.",
  "The quality is outstanding for the price. Highly recommend D.Store to everyone.",
  "Super fast delivery and the product looks even better in person. Totally worth it.",
  "I was skeptical at first but the quality completely won me over. Five stars!",
  "Ordered for a gift and the recipient loved it. Great presentation and fast shipping.",
  "Exactly what I was looking for. The size guide was accurate and the fit is perfect.",
  "Impressive build quality. You can tell the materials are premium. Very satisfied.",
];

const reviews = Array.from({ length: 50 }).map((_, i) => ({
  id: `rev-${i + 1}`,
  name: names[i % names.length],
  avatar: avatarImages[i % avatarImages.length],
  rating: [4, 5, 5, 4, 3][i % 5],
  comment: comments[i % comments.length],
  date: `2026-0${(i % 6) + 1}-1${i % 9}`,
  product: i % 2 === 0 ? "Clothing" : "Home Appliances",
}));

export default reviews;
