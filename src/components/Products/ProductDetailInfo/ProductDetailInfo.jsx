import React from "react";
import { 
  getConditionAndSells,
  getFormattedPrice,
  getFormattedCents
 } from "../../../utils/helpers";

export const ProductDetailInfo = ({
   item 
  }) => {

  const handleBuyProduct = (itemId) => {
    // Method that will handle and dispatch the buy process of a product
    console.log('You bought product id: ' + itemId)
  }

  return (
    <div className="ui-product-detail-info">
      <div className="ui-product-detail-info__main">
        <div className="ui-product-detail-info__main__image-container">
          <img 
            className="ui-product-detail-info__main__image-container__image"
            src={item.picture}
            alt="Imagen del Producto"
          />
        </div>
        <div className="ui-product-detail-info__main__values">
          <p className="ui-product-detail-info__main__values--condition">
            { getConditionAndSells(item.condition, item.sold_quantity) }
          </p>
          <p className="ui-product-detail-info__main__values--title">
            {item.title}
          </p>
          <div className="ui-product-detail-info__main__values__price-container">
            <span className="ui-product-detail-info__main__values__price-container--amount">
              { getFormattedPrice(item.price) }
            </span>
            <span className="ui-product-detail-info__main__values__price-container--cents">
              { getFormattedCents(item.price) }
            </span>
          </div>
          <button
            onClick={() => handleBuyProduct(item.id)}
            className="ui-product-detail-info__main__values__buy-button"
          >
            Comprar
          </button>
        </div>
      </div>
      <div className="ui-product-detail-info__description">
        <h2 className="ui-product-detail-info__description__title">
          Descripción del producto
        </h2>
        <p className="ui-product-detail-info__description__value">
          {item.description}
        </p>
      </div>
    </div>
  );
};
