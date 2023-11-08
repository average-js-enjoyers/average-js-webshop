import React from "react";
import { AuthProvider } from "context/AuthContext";
import { CartProvider } from "context/CartContext";
import { ProductProvider } from "context/ProductContext";
import { CheckoutProvider } from "context/CheckoutContext";

const GlobalContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <CheckoutProvider>{children}</CheckoutProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default GlobalContextProvider;
