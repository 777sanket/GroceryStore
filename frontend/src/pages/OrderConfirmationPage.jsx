// import React, { useState, useEffect } from "react";
// import { useParams, Navigate } from "react-router-dom";
// import axios from "axios";
// import OrderConfirmation from "../components/OrderConfirmation";

// const OrderConfirmationPage = () => {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `http://localhost:5001/api/orders/${id}`
//         );
//         setOrder(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <Navigate to="/" />;
//   }

//   return (
//     <div>
//       <OrderConfirmation order={order} />
//     </div>
//   );
// };

// export default OrderConfirmationPage;

import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from "axios";
import OrderConfirmation from "../components/OrderConfirmation";

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5001/api/orders/${id}`,
          { signal: controller.signal }
        );

        setOrder(response.data);

        // If order has storeId, fetch store details
        if (response.data && response.data.storeId) {
          try {
            const storeResponse = await axios.get(
              `http://localhost:5001/api/stores/${response.data.storeId}`,
              { signal: controller.signal }
            );
            setStore(storeResponse.data);
          } catch (storeErr) {
            console.error("Error fetching store:", storeErr);
          }
        }

        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchOrder();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="loading-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className="text-gray-500 mt-4 animate-pulse">
          Processing your order...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md max-w-lg mx-auto text-center">
        <svg
          className="w-16 h-16 text-red-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">
          We couldn't find your order. Please try again or contact support.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
        >
          Go Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Breadcrumbs */}
      {store && (
        <div className="max-w-lg mx-auto mb-8 text-gray-500">
          <div className="flex items-center text-sm">
            <Link to="/" className="hover:text-green-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link
              to={`/store/${store._id}`}
              className="hover:text-green-600 transition-colors"
            >
              {store.name}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">Order Confirmation</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="max-w-lg mx-auto mb-8">
        <div className="flex items-center justify-center">
          <div className="bg-green-500 h-6 w-1 rounded-full mr-3"></div>
          <h1 className="text-2xl font-bold text-gray-800">
            Order Confirmation
          </h1>
        </div>
      </div>

      {/* Order Confirmation Component */}
      <OrderConfirmation order={order} />

      {/* Additional Information */}
      <div className="max-w-lg mx-auto mt-12 text-center text-sm text-gray-500 bg-white/50 p-6 rounded-xl fade-in-up">
        <h3 className="font-medium text-gray-700 mb-3">What happens next?</h3>
        <div className="space-y-3">
          <p>• Your order has been received and is being processed</p>
          <p>• You'll receive updates about your order status via email</p>
          <p>
            • For any questions about your order, please contact customer
            support
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
