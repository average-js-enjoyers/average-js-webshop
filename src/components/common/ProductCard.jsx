//src/components/common/ProductCard.jsx

import { useState } from "react";
import {
  CartPlusFill,
  CartCheck,
  Heart,
  SuitHeartFill,
} from "react-bootstrap-icons";

export default function ProductCard({
  productId,
  className,
  name,
  img,
  badges,
  onToggleFavorite,
  onToggleCart,
  priceBase,
  priceCurrent,
}) {
  className = className || "";

  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  return (
    <div key={productId} className={`product-card ${className}`}>
      <div className="product-card__img-wrapper">
        <div className="product-card__badge-list">
          {badges &&
            badges.map((badge) => (
              <span
                className={`product-card__badge badge badge--${badge.color}`}
              >
                {badge.text}
              </span>
            ))}
        </div>
        <button
          className={`product-card__button product-card__button--favorite ${
            isFavorite ? "product-card__button--active" : ""
          }`}
          onClick={() => {
            setIsFavorite((isFavorite) => !isFavorite);
            onToggleFavorite();
          }}
        >
          {isFavorite ? (
            <SuitHeartFill className="product-card__icon product-card__icon--favorite-remove" />
          ) : (
            <Heart className="product-card__icon product-card__icon--favorite-add" />
          )}
        </button>
        <img src={img} alt="" className="product-card__img" />
      </div>
      <p className="product-card__name">{name}</p>
      <div className="product-card__footer">
        <div className="product-card__prices">
          <p className="product-card__base">{priceBase}</p>
          <p className="product-card__current">{priceCurrent}</p>
        </div>
        <button
          className={`product-card__button product-card__button--cart ${
            isInCart ? "product-card__button--active" : ""
          }`}
          onClick={() => {
            setIsInCart((isInCart) => !isInCart);
            onToggleCart();
          }}
        >
          {isInCart ? (
            <CartCheck className="product-card__icon product-card__icon--cart-remove" />
          ) : (
            <CartPlusFill className="product-card__icon product-card__icon--cart-add" />
          )}
        </button>
      </div>
    </div>
  );
}
