var constants = require('../utils/constants');
const { NAME, LASTNAME } = constants.AUTHOR

/*
  This module is used for handle the response of the meli api endpoints and 
  returns the data in the required structure that the web app needs.
*/

function getProductDetailHandler (response, plainText) {
  // All download done, process responses array
  const {
    id,
    title,
    price,
    currency_id,
    thumbnail,
    condition,
    shipping,
    sold_quantity,
  } = response;

  return {
    author: {
      name: NAME,
      lastname: LASTNAME,
    },
    item: {
      id: `${id}`,
      title: title,
      price: {
        currency: currency_id,
        amount: price ? Math.floor(price) : 0,
        decimals: price ? price - Math.floor(price) : 0,
      },
      picture: thumbnail,
      condition: condition,
      free_shipping:
        constants.MELI_API_URLS.SHIPPING.FREE_SHIPING in shipping
          ? shipping.free_shipping
          : undefined,
      sold_quantity: sold_quantity,
      // Some descriptions values were coming with \n line breaks despite of parsing the data
      description: plainText.length
        ? plainText.replace(/(\r\n|\n|\r)/g, "")
        : plainText
    },
  };
}


function getProductListHandler (response) {
  const dataParsed = JSON.parse(response);
  /* From the endpoint a lot of filters are currently coming, we need the info coming
     as categories so we are filtering the categories filter and the making a js reduce 
     operation in order to get the sting name of each category available. */
  let categories = dataParsed.available_filters.find(
    (filter) => filter.id === constants.MELI_API_URLS.FILTERS.CATEGORY
  );
  categories =
    categories && constants.MELI_API_URLS.FILTERS.CATEGORY_KEY in categories
      ? categories.values.reduce(
          (acc, curVal) => [...acc, curVal.name],
          []
        )
      : [];

  let items = dataParsed.results.reduce((acc, curItem) => {
    const {
      id,
      title,
      price,
      currency_id,
      thumbnail,
      condition,
      shipping,
    } = curItem;
    var newItem = {
      id: id,
      title: title,
      price: {
        currency: currency_id,
        amount: price ? Math.floor(price) : 0,
        decimals: price ? price - Math.floor(price) : 0,
      },
      picture: thumbnail,
      condition: condition,
      free_shipping: constants.MELI_API_URLS.SHIPPING.FREE_SHIPING in shipping 
        ? shipping.free_shipping
        : undefined,
    };
    return [...acc, newItem];
  }, []);

  return {
    author: {
      name: NAME,
      lastname: LASTNAME,
    },
    categories: categories,
    items: items,
  };
}

module.exports = {
  getProductDetailHandler,
  getProductListHandler
};