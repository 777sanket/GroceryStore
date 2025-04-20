import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { items } = useCart();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (items && items.length > itemCount) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 500);
      return () => clearTimeout(timer);
    }
    setItemCount(items ? items.length : 0);
  }, [items, itemCount]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 ease-in-out overflow-hidden">
      {/* Animated background layer */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-gradient-to-r from-green-800 to-green-600"
            : "bg-gradient-to-r from-green-700 to-green-500"
        }`}
      >
        {/* Animated pattern overlays */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-pattern-squares bg-repeat animate-moveLeft"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-pattern-circles bg-repeat animate-moveRight"></div>
        </div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="shimmer-element animate-shimmer"></div>
        </div>
      </div>

      {/* Header content */}
      <div
        className={`relative container mx-auto px-4 ${
          scrolled ? "py-2" : "py-4"
        } transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-2xl font-bold flex items-center transition-all duration-300 hover:scale-105 transform text-white group"
            >
              <span className="mr-2 animate-pulse">🍎</span>
              <span className="hidden sm:inline relative">
                Hyperlocal Store
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>

            <nav className="hidden md:flex space-x-4">
              <Link
                to="/"
                className={`
                  flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-white
                  ${
                    isActive("/")
                      ? "bg-white/20 shadow-inner font-semibold backdrop-blur-sm"
                      : "hover:bg-white/10 hover:shadow"
                  }
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 mr-1 transition-transform duration-300 ${
                    isActive("/") ? "rotate-12" : "group-hover:rotate-12"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="relative overflow-hidden group">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            </nav>
          </div>

          {/* Mobile home button (visible on small screens) */}
          <div className="flex md:hidden mr-auto ml-4">
            <Link
              to="/"
              className={`
                flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-white
                ${
                  isActive("/")
                    ? "bg-white/20 shadow-inner"
                    : "hover:bg-white/10 hover:shadow"
                }
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-300 ${
                  isActive("/") ? "rotate-12" : "hover:rotate-12"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
          </div>

          <Link to="/cart" className="relative group">
            <div
              className={`
              p-2 rounded-full transition-all duration-300 ease-in-out transform
              ${
                cartBounce
                  ? "animate-bounce bg-white/20 backdrop-blur-sm"
                  : "hover:scale-110 bg-white/10 hover:bg-white/20"
              }
            `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white transition-transform duration-300 ease-in-out group-hover:rotate-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            {items && items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out transform group-hover:scale-110">
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
