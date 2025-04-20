import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const OrderConfirmation = ({ order }) => {
  useEffect(() => {
    // Create and append confetti elements to the DOM
    const confettiContainer = document.createElement("div");
    confettiContainer.style.position = "fixed";
    confettiContainer.style.inset = "0";
    confettiContainer.style.pointerEvents = "none";
    confettiContainer.style.zIndex = "100";
    confettiContainer.style.overflow = "hidden";

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;

      confettiContainer.appendChild(confetti);
    }

    document.body.appendChild(confettiContainer);

    const timer = setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 8000);

    return () => {
      clearTimeout(timer);
      if (document.body.contains(confettiContainer)) {
        document.body.removeChild(confettiContainer);
      }
    };
  }, []);

  const getRandomColor = () => {
    const colors = [
      "#22c55e",
      "#3b82f6",
      "#eab308",
      "#ec4899",
      "#8b5cf6",
      "#f97316",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (!order) {
    return (
      <div className="text-center text-gray-500 my-8 bg-white/50 p-8 rounded-xl shadow-md">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg">Order not found.</p>
        <Link
          to="/"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 mt-4"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="confirmation-card bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto text-center relative overflow-hidden">
      {/* Animated Checkmark */}
      <div className="checkmark">
        <svg
          className="checkmark-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark-circle"
            cx="26"
            cy="26"
            r="23"
            fill="none"
          />
          <path
            className="checkmark-check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>

      <h2 className="thank-you-text text-3xl font-bold mb-3">
        Thank you,{" "}
        <span className="customer-name text-green-600">
          {order.customerName}
        </span>
        !
      </h2>

      <p className="message-text text-gray-600 mb-6">
        Your order has been placed successfully and is being processed.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        className="home-button inline-block bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300"
      >
        <div className="flex items-center justify-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Continue Shopping
        </div>
      </Link>

      {/* Extra message */}
      <p className="message-text text-sm text-gray-500 mt-6">
        A confirmation email has been sent to your registered email address.
      </p>
    </div>
  );
};

export default OrderConfirmation;
