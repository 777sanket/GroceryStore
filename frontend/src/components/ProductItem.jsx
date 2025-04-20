import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (product.quantity <= 0) return;

    setIsAdding(true);

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      storeId: product.storeId,
    });

    setTimeout(() => setIsAdding(false), 500);
  };

  const getProductEmoji = () => {
    const name = product.name.toLowerCase();
    if (name.includes("apple")) return "🍎";
    if (name.includes("banana")) return "🍌";
    if (name.includes("carrot")) return "🥕";
    if (name.includes("potato")) return "🥔";
    if (name.includes("tomato")) return "🍅";
    if (name.includes("bread")) return "🍞";
    if (name.includes("milk")) return "🥛";
    if (name.includes("cheese")) return "🧀";
    if (name.includes("egg")) return "🥚";
    if (name.includes("meat") || name.includes("beef")) return "🥩";
    if (name.includes("chicken")) return "🍗";

    // Default emojis if no match
    const defaultEmojis = ["🍏", "🥦", "🍊", "🥬", "🍇", "🍞", "🥖"];
    return defaultEmojis[Math.floor(Math.random() * defaultEmojis.length)];
  };

  return (
    <div className="p-4 flex justify-between items-center group">
      {/* Product info */}
      <div className="flex items-center">
        <div className="bg-gray-100 h-12 w-12 rounded-full flex items-center justify-center mr-4 overflow-hidden transform transition-transform group-hover:scale-110">
          <span className="text-xl">{getProductEmoji()}</span>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center mt-1">
            <div className="price-tag bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm font-medium">
              ₹{product.price}
            </div>

            {product.quantity > 0 && (
              <div className="ml-2 text-sm text-gray-500">
                {product.quantity} in stock
              </div>
            )}

            {product.quantity <= 0 && (
              <div className="ml-2 text-sm text-red-500 font-medium">
                Out of stock
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add to cart button */}
      <button
        onClick={handleAddToCart}
        disabled={product.quantity <= 0}
        className={`
          add-to-cart-btn px-3 py-1.5 rounded transition-all duration-200
          ${
            product.quantity > 0
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
          ${isAdding ? "scale-110" : ""}
        `}
      >
        <div className="flex items-center">
          <span className={isAdding ? "animate-bounce" : ""}>
            {isAdding ? "✓" : "Add"}
          </span>
        </div>
      </button>
    </div>
  );
};

export default ProductItem;
