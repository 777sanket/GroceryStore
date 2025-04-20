// export default StorePage;

import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { useCart } from "../context/CartContext";
import "../ui/storePage.css"; // Import your CSS file for styles

const StorePage = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setStore: setCartStore, items } = useCart();
  const headerRef = useRef(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchStoreAndProducts = async () => {
      try {
        setLoading(true);
        const storeResponse = await axios.get(
          `http://localhost:5001/api/stores/${id}`,
          { signal: controller.signal }
        );
        setStore(storeResponse.data);

        const productsResponse = await axios.get(
          `http://localhost:5001/api/products/store/${id}`,
          { signal: controller.signal }
        );
        setProducts(productsResponse.data);

        setCartStore(id);

        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchStoreAndProducts();
    return () => {
      controller.abort();
    };
  }, [id]);

  const getStoreType = () => {
    if (!store) return "grocery";

    const name = store.name.toLowerCase();
    if (name.includes("organic")) return "organic";
    if (name.includes("bakery")) return "bakery";
    if (name.includes("dairy")) return "dairy";
    if (name.includes("butcher")) return "butcher";
    return "grocery";
  };

  const getStoreColors = () => {
    const type = getStoreType();
    switch (type) {
      case "organic":
        return "from-green-500 to-green-300";
      case "bakery":
        return "from-yellow-500 to-amber-300";
      case "butcher":
        return "from-red-500 to-red-300";
      case "dairy":
        return "from-indigo-500 to-purple-300";
      default:
        return "from-blue-500 to-blue-300";
    }
  };

  const getStoreEmoji = () => {
    const type = getStoreType();
    switch (type) {
      case "organic":
        return "🥬";
      case "bakery":
        return "🥖";
      case "butcher":
        return "🥩";
      case "dairy":
        return "🧀";
      default:
        return "🛒";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 animate-spin rounded-full border-t-4 border-b-4 border-green-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl">{getStoreEmoji()}</span>
          </div>
        </div>
        <p className="mt-4 text-gray-500 animate-pulse">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 my-6 bg-red-50 rounded-lg">
        <div className="text-3xl mb-2">⚠️</div>
        <p className="text-red-500 font-medium">Error: {error}</p>
        <p className="text-gray-500 mt-2">
          We're having trouble connecting to our servers.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Store not found.</p>
        <Link
          to="/"
          className="text-green-600 hover:text-green-700 mt-2 inline-block"
        >
          Go back to stores
        </Link>
      </div>
    );
  }

  const productsByCategory = products.reduce(
    (groups, product) => {
      if (product.quantity > 0) {
        groups.available.push(product);
      } else {
        groups.outOfStock.push(product);
      }

      return groups;
    },
    { available: [], outOfStock: [] }
  );

  return (
    <div className="pb-12">
      <div
        className={`store-banner bg-gradient-to-r ${getStoreColors()} rounded-xl p-6 mb-8 shadow-md store-header`}
        ref={headerRef}
      >
        <div className="flex items-start">
          <div className="flex-1">
            <div className="flex items-center">
              <span className="text-4xl mr-3 animate-pulse">
                {getStoreEmoji()}
              </span>
              <h1 className="text-3xl font-bold text-white drop-shadow-sm">
                {store.name}
              </h1>
            </div>
            <p className="text-white/90 mt-2 font-medium">{store.location}</p>
            {store.description && (
              <p className="text-white/80 mt-4 max-w-2xl">
                {store.description}
              </p>
            )}
          </div>

          {items && items.length > 0 && (
            <Link
              to="/cart"
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-green-600 px-4 py-2 rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg group"
            >
              <span className="mr-2 group-hover:scale-110 transition-transform">
                🛒
              </span>
              <span>View Cart ({items.length})</span>
            </Link>
          )}
        </div>

        {/* Store details */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white availability-badge">
            <span className="font-semibold">
              {productsByCategory.available.length}
            </span>{" "}
            Products Available
          </div>

          {products.length > 0 && (
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white availability-badge">
              Updated {new Date().toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      {/* Product listing */}
      {products.length === 0 ? (
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 text-center shadow-md">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-600 text-lg font-medium mb-2">
            No products available
          </p>
          <p className="text-gray-500">
            This store doesn't have any products listed right now.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Browse Other Stores
          </Link>
        </div>
      ) : (
        <div>
          {/* Available Products Section */}
          {productsByCategory.available.length > 0 && (
            <div className="mb-12">
              <h2 className="section-title text-2xl font-semibold mb-6 text-gray-800 border-l-4 border-green-500 pl-3">
                Available Products
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productsByCategory.available.map((product, index) => (
                  <div
                    key={product._id}
                    className="product-card bg-white rounded-xl shadow-md overflow-hidden fade-in-up"
                    style={{
                      "--x": `${mousePosition.x}px`,
                      "--y": `${mousePosition.y}px`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <ProductItem product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Out of Stock Section */}
          {productsByCategory.outOfStock.length > 0 && (
            <div>
              <h2 className="section-title text-xl font-semibold mb-6 text-gray-600 border-l-4 border-gray-400 pl-3">
                Out of Stock
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 out-of-stock">
                {productsByCategory.outOfStock.map((product, index) => (
                  <div
                    key={product._id}
                    className="product-card bg-white/70 rounded-xl shadow-sm fade-in-up"
                    style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                  >
                    <ProductItem product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StorePage;
