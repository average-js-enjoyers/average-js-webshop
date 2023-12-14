import React, { createContext, useState, useContext } from "react";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const dummyProductCardData = [
    {
      productId: 1,
      className: "favorites-summary__item",
      name: "“420 Blaze It” High Quality Hand-made Tobacco Grinder",
      img: "/assets/img/grinder420.png",
      badges: [
        { text: "New", color: "success" },
        { text: "Sale", color: "secondary" },
        { text: "-50%", color: "danger" },
      ],
      priceBase: "€ 69,000",
      priceCurrent: "€ 42,000",
      onToggleCart: () => console.log("Toggled Cart State!"),
      onToggleFavorite: () => console.log("Toggled Favorite State!"),
    },
    {
      productId: 2,
      className: "favorites-summary__item",
      name: "“420 Blaze It” High Quality Hand-made Tobacco Grinder",
      img: "/assets/img/grinder420.png",
      badges: [
        { text: "New", color: "success" },
        { text: "Sale", color: "secondary" },
      ],
      priceBase: "€ 69,000",
      priceCurrent: "€ 42,000",
      onToggleCart: () => console.log("Toggled Cart State!"),
      onToggleFavorite: () => console.log("Toggled Favorite State!"),
    },
    {
      productId: 3,
      className: "favorites-summary__item",
      name: "“420 Blaze It” High Quality Hand-made Tobacco Grinder",
      img: "/assets/img/grinder420.png",
      badges: [
        { text: "New", color: "success" },
        { text: "Sale", color: "secondary" },
      ],
      priceBase: "€ 69,000",
      priceCurrent: "€ 42,000",
      onToggleCart: () => console.log("Toggled Cart State!"),
      onToggleFavorite: () => console.log("Toggled Favorite State!"),
    },
    {
      productId: 4,
      className: "favorites-summary__item",
      name: "“420 Blaze It” High Quality Hand-made Tobacco Grinder",
      img: "/assets/img/grinder420.png",
      badges: [
        { text: "New", color: "success" },
        { text: "Sale", color: "secondary" },
      ],
      priceBase: "€ 69,000",
      priceCurrent: "€ 42,000",
      onToggleCart: () => console.log("Toggled Cart State!"),
      onToggleFavorite: () => console.log("Toggled Favorite State!"),
    },
    {
      productId: 5,
      className: "favorites-summary__item",
      name: "“420 Blaze It” High Quality Hand-made Tobacco Grinder",
      img: "/assets/img/grinder420.png",
      badges: [
        { text: "New", color: "warning" },
        { text: "Sale", color: "secondary" },
      ],
      priceBase: "€ 69,000",
      priceCurrent: "€ 42,000",
      onToggleCart: () => console.log("Toggled Cart State!"),
      onToggleFavorite: () => console.log("Toggled Favorite State!"),
    },
    {
      productId: 6,
      className: "favorites-summary__item",
      name: "“420 Blaze It” High Quality Hand-made Tobacco Grinder",
      img: "/assets/img/grinder420.png",
      badges: [
        { text: "New", color: "warning" },
        { text: "Sale", color: "secondary" },
      ],
      priceBase: "€ 69,000",
      priceCurrent: "€ 42,000",
      onToggleCart: () => console.log("Toggled Cart State!"),
      onToggleFavorite: () => console.log("Toggled Favorite State!"),
    },
    // ... (8 more product objects following the same structure)
  ];

  const productState = {
    products,
    dummyProductCardData,
  };

  return (
    <ProductContext.Provider value={{ ...productState }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export default ProductContext;
