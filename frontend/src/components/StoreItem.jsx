import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const StoreItem = ({ store, index }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(50);
  const [mouseY, setMouseY] = useState(50);

  const categoryIcons = ["🛒", "🥬", "🥖", "🥩", "🧀", "🛍️"];

  const categoryIcon = categoryIcons[index % categoryIcons.length];

  const gradients = [
    "linear-gradient(to bottom right, #60A5FA, #93C5FD)",
    "linear-gradient(to bottom right, #4ADE80, #86EFAD)",
    "linear-gradient(to bottom right, #FBBF24, #FCD34D)",
    "linear-gradient(to bottom right, #F87171, #FCA5A5)",
    "linear-gradient(to bottom right, #818CF8, #C4B5FD)",
    "linear-gradient(to bottom right, #9CA3AF, #D1D5DB)",
  ];

  const gradientStyle = gradients[index % gradients.length];

  const cardStyle = {
    "--rotate-x": `${rotateX}deg`,
    "--rotate-y": `${rotateY}deg`,
    "--x": `${mouseX}%`,
    "--y": `${mouseY}%`,
    animationDelay: `${index * 0.1}s`,
    background: gradientStyle,
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    setRotateX(-percentY * 5);
    setRotateY(percentX * 5);

    setMouseX(((e.clientX - rect.left) / rect.width) * 100);
    setMouseY(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const productIcons = ["🍎", "🥕", "🥦", "🍌", "🥚", "🍞", "🥛"];

  const randomProducts = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * productIcons.length);
    randomProducts.push(productIcons[randomIndex]);
  }

  return (
    <Link
      to={`/store/${store._id}`}
      className="store-card rounded-xl shadow-md p-6 h-50 fade-in-up"
      style={cardStyle}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Store icon */}
      <div className="category-icon" aria-hidden="true">
        {categoryIcon}
      </div>

      {/* Card content */}
      <div className="card-content flex flex-col h-full">
        <h2 className="text-xl font-bold text-white drop-shadow-sm mt-4">
          {store.name}
        </h2>

        <p className="text-white/80 font-medium">{store.location}</p>

        {store.description && (
          <p className="text-white/70 mt-2 text-sm line-clamp-3">
            {store.description}
          </p>
        )}

        <div className="mt-auto">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white font-medium">
            View Products
          </span>
        </div>
      </div>

      {/* Floating product bubbles */}
      {randomProducts.map((icon, i) => (
        <div key={i} className="product-bubble" style={{ zIndex: 10 - i }}>
          {icon}
        </div>
      ))}
    </Link>
  );
};

export default StoreItem;
