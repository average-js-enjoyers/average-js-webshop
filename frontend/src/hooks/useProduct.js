//src/hooks/useProduct.js

import { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "context/ProductContext";
import ProductCard from "components/common/ProductCard";

export const useProduct = () => {
  const productContext = useContext(ProductContext);
  const navigate = useNavigate();

  const renderProductCards = (productCardsData) => {
    return productCardsData.map((product, index) => {
      return (
        <ProductCard
          key={index}
          productId={product.productId}
          className={product.className}
          name={product.name}
          img={product.img}
          badges={product.badges}
          priceBase={product.priceBase}
          priceCurrent={product.priceCurrent}
          onToggleCart={product.onToggleCart}
          onToggleFavorite={product.onToggleFavorite}
        />
      );
    });
  };

  return {
    ...productContext,
    renderProductCards,
  };
};
