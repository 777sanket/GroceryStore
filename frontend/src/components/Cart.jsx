import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../ui/cartPage.css";

const Cart = () => {
  const { items, totalAmount, removeFromCart, updateQuantity } = useCart();

  // Function to get item emoji based on name
  const getItemEmoji = (name) => {
    const itemName = name.toLowerCase();
    if (itemName.includes("apple")) return "🍎";
    if (itemName.includes("banana")) return "🍌";
    if (itemName.includes("carrot")) return "🥕";
    if (itemName.includes("potato")) return "🥔";
    if (itemName.includes("tomato")) return "🍅";
    if (itemName.includes("bread")) return "🍞";
    if (itemName.includes("milk")) return "🥛";
    if (itemName.includes("cheese")) return "🧀";
    if (itemName.includes("egg")) return "🥚";
    if (itemName.includes("meat") || itemName.includes("beef")) return "🥩";
    if (itemName.includes("chicken")) return "🍗";

    // Default emojis if no match
    const defaultEmojis = ["🍏", "🥦", "🍊", "🥬", "🍇", "🍞", "🥖"];
    return defaultEmojis[Math.floor(Math.random() * defaultEmojis.length)];
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 empty-cart-container bg-white/50 backdrop-blur-sm rounded-xl shadow-sm">
        <div className="empty-cart-icon text-5xl mb-4">🛒</div>
        <p className="text-gray-600 mb-4 text-lg">Your cart is empty.</p>
        <p className="text-gray-500 mb-6">
          Add some fresh products to get started!
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 hover:shadow-md"
        >
          Browse Stores
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="cart-header text-xl font-semibold mb-6 inline-block">
        Your Cart
      </h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="cart-item p-4 flex justify-between items-center fade-in-right"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center">
                <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                  <span>{getItemEmoji(item.name)}</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <label className="mr-2 text-gray-600">Qty:</label>
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="quantity-selector border rounded-lg p-1 bg-white focus:outline-none"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-button ml-4 text-red-400 hover:text-red-600 p-1"
                  aria-label="Remove item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200">
          <div className="flex justify-between font-semibold text-lg total-amount">
            <span>Total:</span>
            <span className="text-green-600">₹{totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
