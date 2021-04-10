import React from "react";

export const ProductItem = ({
   item 
  }) => {
  return (
    <div className="ui-product-item">
      <a href={`/items/${item.id}`}>
        <div className="ui-product-item__image-container">
          <img
            src={item.picture}
            alt="item picture"
            className="ui-product-item__image-container__image"
          />
        </div>
        <div className="ui-product-item__description-container">
          <p className="ui-product-item__description-container__value-price">
            $ {item.price.amount}
          </p>
          <p className="ui-product-item__description-container__value-title">
            {item.title}
          </p>
        </div>
        <div className="ui-product-item__province-container">
          <p className="ui-product-item__province-container__value-province">
            {item.province}
          </p>
        </div>
      </a>
    </div>
  );
};
