import React from "react";

export const ProductDetailInfo = ({
   item 
  }) => {

  const getConditionAndSells = (condition, soldQuantity) => {
    const itemCondition = condition === 'new' ? 'Nuevo' : 'Usado'
    return `${itemCondition} - ${soldQuantity} vendidos`
  }

  const getFormattedPrice = (price) => {
    if (!('amount' in price)) return "$ 00"
    const amountFormatted = price.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    return  `$ ${amountFormatted}`
  }
  
  const getFormattedCents = (price) => {
    if (!('decimals' in price)) return "00"
    return price.decimals === 0 ? '00' : item.price.decimals.toString().substring(2, 4)
  }

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
