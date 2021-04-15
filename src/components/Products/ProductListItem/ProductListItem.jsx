import React from "react";
import { getFormattedPrice } from "../../../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

/*
  This Method will recieve the product (item) as a props and will show the item values.
*/

export const ProductListItem = ({ item }) => {
  return (
    <div className="ui-product-item" data-testid="product-item-container">
      <a href={`/items/${item.id}`}>
        <div className="ui-product-item__image-container">
          <img
            src={item.picture}
            alt="Imagen del Producto"
            className="ui-product-item__image-container__image"
          />
        </div>
        <div className="ui-product-item__description-container" data-testid="description-container">
          <p className="ui-product-item__description-container__value-price" data-testid="price-value">
            {getFormattedPrice(item.price)}
            { item.free_shipping && 
              <FontAwesomeIcon
                icon={faTruck} 
                className="ui-product-item__description-container__free-shipping-icon"
                />
            }
          </p>
          <p className="ui-product-item__description-container__value-title" data-testid="product-title">
            {item.title}
          </p>
        </div>
        <div className="ui-product-item__province-container" data-testid="province-container">
          <p className="ui-product-item__province-container__value-province">
            {item.province}
          </p>
        </div>
      </a>
    </div>
  );
};
