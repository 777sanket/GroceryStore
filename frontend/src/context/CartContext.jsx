// import React, { createContext, useContext, useReducer, useEffect } from "react";

// // Initial state
// const initialState = {
//   items: [],
//   storeId: null,
//   totalAmount: 0,
// };

// // Action types
// const ADD_TO_CART = "ADD_TO_CART";
// const REMOVE_FROM_CART = "REMOVE_FROM_CART";
// const UPDATE_QUANTITY = "UPDATE_QUANTITY";
// const CLEAR_CART = "CLEAR_CART";
// const SET_STORE = "SET_STORE";

// // Reducer function
// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case ADD_TO_CART: {
//       // Check if the item already exists in the cart
//       const existingItemIndex = state.items.findIndex(
//         (item) => item.id === action.payload.id
//       );

//       if (existingItemIndex >= 0) {
//         // Item exists, update quantity
//         const updatedItems = [...state.items];
//         updatedItems[existingItemIndex] = {
//           ...updatedItems[existingItemIndex],
//           quantity: updatedItems[existingItemIndex].quantity + 1,
//         };

//         return {
//           ...state,
//           items: updatedItems,
//           totalAmount: calculateTotalAmount(updatedItems),
//         };
//       } else {
//         // New item, add to cart
//         const newItem = { ...action.payload, quantity: 1 };
//         return {
//           ...state,
//           items: [...state.items, newItem],
//           totalAmount: calculateTotalAmount([...state.items, newItem]),
//         };
//       }
//     }

//     case REMOVE_FROM_CART: {
//       const filteredItems = state.items.filter(
//         (item) => item.id !== action.payload
//       );
//       return {
//         ...state,
//         items: filteredItems,
//         totalAmount: calculateTotalAmount(filteredItems),
//       };
//     }

//     case UPDATE_QUANTITY: {
//       const updatedItems = state.items.map((item) => {
//         if (item.id === action.payload.id) {
//           return { ...item, quantity: action.payload.quantity };
//         }
//         return item;
//       });

//       return {
//         ...state,
//         items: updatedItems,
//         totalAmount: calculateTotalAmount(updatedItems),
//       };
//     }

//     case CLEAR_CART:
//       return {
//         ...initialState,
//       };

//     case SET_STORE:
//       // If store changes, clear the cart
//       if (
//         state.storeId &&
//         state.storeId !== action.payload &&
//         state.items &&
//         state.items.length > 0
//       ) {
//         return {
//           items: [],
//           storeId: action.payload,
//           totalAmount: 0,
//         };
//       }
//       return {
//         ...state,
//         storeId: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// // Helper function to calculate total amount
// const calculateTotalAmount = (items) => {
//   if (!items) return 0;
//   return items.reduce((total, item) => total + item.price * item.quantity, 0);
// };

// // Create context
// const CartContext = createContext();

// // Custom hook to use the cart context
// export const useCart = () => useContext(CartContext);

// // Provider component
// export const CartProvider = ({ children }) => {
//   // Initialize state from localStorage if available
//   const [state, dispatch] = useReducer(cartReducer, initialState, () => {
//     try {
//       const localData = localStorage.getItem("cart");
//       return localData ? JSON.parse(localData) : initialState;
//     } catch (error) {
//       console.error("Error parsing cart data from localStorage:", error);
//       return initialState;
//     }
//   });

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     try {
//       localStorage.setItem("cart", JSON.stringify(state));
//     } catch (error) {
//       console.error("Error saving cart to localStorage:", error);
//     }
//   }, [state]);

//   // Action creators
//   const addToCart = (item) => {
//     dispatch({ type: ADD_TO_CART, payload: item });
//   };

//   const removeFromCart = (itemId) => {
//     dispatch({ type: REMOVE_FROM_CART, payload: itemId });
//   };

//   const updateQuantity = (itemId, quantity) => {
//     dispatch({
//       type: UPDATE_QUANTITY,
//       payload: { id: itemId, quantity: quantity },
//     });
//   };

//   const clearCart = () => {
//     dispatch({ type: CLEAR_CART });
//   };

//   const setStore = (storeId) => {
//     dispatch({ type: SET_STORE, payload: storeId });
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         items: state.items || [],
//         storeId: state.storeId,
//         totalAmount: state.totalAmount || 0,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         setStore,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  items: [],
  storeId: null,
  totalAmount: 0,
};

// Action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const CLEAR_CART = "CLEAR_CART";
const SET_STORE = "SET_STORE";

// Reducer function
const cartReducer = (state = initialState, action) => {
  // Ensure state has valid properties
  const safeState = {
    ...initialState,
    ...state,
    items: state?.items || [],
  };

  switch (action.type) {
    case ADD_TO_CART: {
      // Check if the item already exists in the cart
      const existingItemIndex = safeState.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...safeState.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };

        return {
          ...safeState,
          items: updatedItems,
          totalAmount: calculateTotalAmount(updatedItems),
        };
      } else {
        // New item, add to cart
        const newItem = { ...action.payload, quantity: 1 };
        return {
          ...safeState,
          items: [...safeState.items, newItem],
          totalAmount: calculateTotalAmount([...safeState.items, newItem]),
        };
      }
    }

    case REMOVE_FROM_CART: {
      const filteredItems = safeState.items.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...safeState,
        items: filteredItems,
        totalAmount: calculateTotalAmount(filteredItems),
      };
    }

    case UPDATE_QUANTITY: {
      const updatedItems = safeState.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });

      return {
        ...safeState,
        items: updatedItems,
        totalAmount: calculateTotalAmount(updatedItems),
      };
    }

    case CLEAR_CART:
      return {
        ...initialState,
      };

    case SET_STORE:
      // If store changes, clear the cart
      if (
        safeState.storeId &&
        safeState.storeId !== action.payload &&
        safeState.items.length > 0
      ) {
        return {
          items: [],
          storeId: action.payload,
          totalAmount: 0,
        };
      }
      return {
        ...safeState,
        storeId: action.payload,
      };

    default:
      return safeState;
  }
};

// Helper function to calculate total amount
const calculateTotalAmount = (items = []) => {
  return items.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );
};

// Create context
const CartContext = createContext({
  items: [],
  storeId: null,
  totalAmount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  setStore: () => {},
});

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    try {
      const localData = localStorage.getItem("cart");
      if (!localData) return initialState;

      const parsedData = JSON.parse(localData);
      // Validate parsed data has expected structure
      if (!parsedData || typeof parsedData !== "object") {
        return initialState;
      }

      // Ensure items is an array
      if (!Array.isArray(parsedData.items)) {
        parsedData.items = [];
      }

      return {
        ...initialState,
        ...parsedData,
      };
    } catch (error) {
      console.error("Error parsing cart data from localStorage:", error);
      return initialState;
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      const safeState = {
        ...state,
        items: state?.items || [],
        totalAmount: state?.totalAmount || 0,
      };
      localStorage.setItem("cart", JSON.stringify(safeState));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [state]);

  // Action creators
  const addToCart = (item) => {
    if (!item) return;
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const removeFromCart = (itemId) => {
    if (!itemId) return;
    dispatch({ type: REMOVE_FROM_CART, payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    if (!itemId || quantity < 1) return;
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { id: itemId, quantity: quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const setStore = (storeId) => {
    dispatch({ type: SET_STORE, payload: storeId });
  };

  // Create a safe state object for the context value
  const contextValue = {
    items: state?.items || [],
    storeId: state?.storeId || null,
    totalAmount: state?.totalAmount || 0,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setStore,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
