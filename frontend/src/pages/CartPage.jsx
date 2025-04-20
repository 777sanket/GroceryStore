import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "../ui/cartPage.css";

const CartPage = () => {
  const { items, totalAmount, storeId, clearCart, updateQuantity } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [quantityIssues, setQuantityIssues] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [storeInfo, setStoreInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStoreInfo = async () => {
      if (storeId) {
        try {
          const response = await axios.get(
            // `http://localhost:5001/api/stores/${storeId}`
            `https://grocerystore-dy82.onrender.com/api/stores/${storeId}`
          );
          setStoreInfo(response.data);
        } catch (err) {
          console.error("Error fetching store info:", err);
        }
      }
    };

    fetchStoreInfo();
  }, [storeId]);

  useEffect(() => {
    const checkQuantities = async () => {
      if (items && items.length > 0) {
        let hasIssues = false;

        for (const item of items) {
          try {
            const response = await axios.get(
              // `http://localhost:5001/api/products/${item.id}`
              `https://grocerystore-dy82.onrender.com/api/products/${item.id}`
            );
            const availableQuantity = response.data.quantity;

            if (item.quantity > availableQuantity) {
              hasIssues = true;

              if (availableQuantity > 0) {
                updateQuantity(item.id, availableQuantity);
              }
            }
          } catch (err) {
            console.error(`Error checking product ${item.id}:`, err);
          }
        }

        setQuantityIssues(hasIssues);
      }
    };

    checkQuantities();
  }, [items, updateQuantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!items || items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    if (quantityIssues) {
      setError(
        "Some items in your cart have quantity issues. Please review your cart."
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const orderData = {
        customerName,
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        storeId,
        totalAmount,
      };

      const response = await axios.post(
        // "http://localhost:5001/api/orders",
        "https://grocerystore-dy82.onrender.com/api/orders",
        orderData
      );

      for (const item of items) {
        try {
          const productResponse = await axios.get(
            // `http://localhost:5001/api/products/${item.id}`
            `https://grocerystore-dy82.onrender.com/api/products/${item.id}`
          );
          const currentProduct = productResponse.data;

          // await axios.put(`http://localhost:5001/api/products/${item.id}`, {
          await axios.put(
            `https://grocerystore-dy82.onrender.com/api/products/${item.id}`,
            {
              ...currentProduct,
              quantity: currentProduct.quantity - item.quantity,
            }
          );
        } catch (err) {
          console.error(`Error updating product ${item.id} quantity:`, err);
        }
      }

      setOrderSuccess(true);

      clearCart();

      setTimeout(() => {
        navigate(`/order-confirmation/${response.data._id}`);
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-6">
      {/* Page Header with Breadcrumbs */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="bg-green-500 h-8 w-1 rounded-full mr-3"></div>
          <h1 className="text-3xl font-bold text-gray-800">
            Your Shopping Cart
          </h1>
        </div>

        {storeInfo && (
          <div className="text-gray-500 flex items-center">
            <Link to="/" className="hover:text-green-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link
              to={`/store/${storeId}`}
              className="hover:text-green-600 transition-colors"
            >
              {storeInfo.name}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Cart</span>
          </div>
        )}
      </div>

      {/* Cart Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Cart />
        </div>

        {/* Checkout Form */}
        {items && items.length > 0 && (
          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="checkout-form bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-semibold mb-6 cart-header inline-block">
                Checkout
              </h2>

              {/* Success Message */}
              {orderSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Order placed successfully! Redirecting...</span>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Quantity Warning */}
              {quantityIssues && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Some products in your cart have quantity issues. We've
                    adjusted your cart.
                  </span>
                </div>
              )}

              <div className="mb-6">
                <label
                  htmlFor="customerName"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="input-animated w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <h3 className="font-medium text-gray-700 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length} items):</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                </div>
                <div className="flex justify-between font-medium text-gray-800 pt-4 mt-2 border-t border-dashed border-gray-200">
                  <span>Total:</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || quantityIssues || items.length === 0}
                className={`submit-button w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition-all duration-200 ${
                  isSubmitting || quantityIssues || items.length === 0
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:shadow-md"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Place Order"
                )}
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                By placing your order, you agree to our Terms of Service and
                Privacy Policy
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
