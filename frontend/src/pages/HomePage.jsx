import React, { useState, useEffect } from "react";
import StoreList from "../components/StoreList";
import axios from "axios";

const HomePage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5001/api/stores");
        console.log(response.data);
        setStores(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 animate-spin rounded-full border-t-4 border-b-4 border-green-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl">🛒</span>
          </div>
        </div>
        <p className="mt-4 text-gray-500 animate-pulse">
          Loading stores near you...
        </p>
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

  return (
    <div className="py-8">
      <div className="flex items-center mb-8">
        <div className="bg-green-500 h-10 w-1 rounded-full mr-3"></div>
        <h1 className="text-3xl font-bold text-gray-800">Fresh Finds Nearby</h1>
      </div>

      <div className="bg-gradient-to-r from-green-100 via-blue-50 to-green-100 p-6 rounded-xl mb-8 shadow-sm">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">🍎</span>
          <h2 className="text-xl font-semibold text-gray-700">
            Welcome to Hyperlocal Markets
          </h2>
        </div>
        <p className="text-gray-600">
          Discover local stores around you offering fresh produce, organic
          goods, and everyday essentials. Support local businesses while
          enjoying the freshest ingredients for your kitchen.
        </p>
      </div>

      <StoreList stores={stores} />

      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>Prices and availability may vary by location. Updated hourly.</p>
      </div>
    </div>
  );
};

export default HomePage;
