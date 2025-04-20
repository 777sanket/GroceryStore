import React from "react";
import StoreItem from "./StoreItem";

const StoreList = ({ stores }) => {
  if (!stores || stores.length === 0) {
    return (
      <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-lg">
        <div className="text-4xl mb-4">🏪</div>
        <p className="text-gray-500 mb-2">No stores found in your area.</p>
        <p className="text-gray-400 text-sm">
          Try searching in a different location.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
      {stores.map((store, index) => (
        <StoreItem key={store._id} store={store} index={index} />
      ))}
    </div>
  );
};

export default StoreList;
