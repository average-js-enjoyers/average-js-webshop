import React, { createContext, useState, useContext } from "react";

const CheckoutContext = createContext(null);

export const CheckoutProvider = ({ children }) => {
  const [isCheckoutComplete, setCheckoutComplete] = useState(false);

  const checkout = async (cartItems) => {
    // Here you would integrate with your payment and order processing backend
    console.log("Processing checkout", cartItems);
    // Dummy implementation
    setCheckoutComplete(true);
  };

  const contextValue = {
    isCheckoutComplete,
    checkout,
  };

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
