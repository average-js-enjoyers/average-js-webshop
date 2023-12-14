//src/context/GlobalContextProvider.js

import React from "react";
import { AuthProvider } from "context/AuthContext";
import { CartProvider } from "context/CartContext";
import { ProductProvider } from "context/ProductContext";
import { CheckoutProvider } from "context/CheckoutContext";
import { ModalProvider } from "context/ModalContext"; // Import the ModalProvider

const GlobalContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <CheckoutProvider>
            <ModalProvider>{children}</ModalProvider>{" "}
            {/* Wrap with ModalProvider */}
          </CheckoutProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default GlobalContextProvider;
