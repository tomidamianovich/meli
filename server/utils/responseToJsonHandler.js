var constants = require('../utils/constants');
const { NAME, LASTNAME } = constants.AUTHOR

/*
  This module is used for handle the response of the meli api endpoints and 
  returns the data in the required structure that the web app needs.
*/

function getProductDetailHandler (response, plainText, categories) {
  // All download done, process responses array
  const {
    id,
    title,
    price,
    currency_id,
    thumbnail,
    condition,
    shipping,
    sold_quantity
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
        constants.MELI_API_URLS.SHIPPING.FREE_SHIPPING in shipping
          ? shipping.free_shipping
          : undefined,
      sold_quantity: sold_quantity,
      // Some descriptions values were coming with \n line breaks despite of parsing the data
      description: plainText,
      breadcrumbs_route: categories.path_from_root
    },
    appUrl: `${constants.APP_URL.PATH}:${constants.APP_URL.PORT}/items`
  };
}


function getProductListHandler (response) {
  const dataParsed = JSON.parse(response);
  /* From the endpoint a lot of filters are currently coming, we need the info coming
     as categories so we are filtering the categories filter and the making a js reduce 
     operation in order to get the sting name of each category available. */
  let categories = dataParsed.filters.find(
    (filter) => filter.id === constants.MELI_API_URLS.FILTERS.CATEGORY
  );
  
  let greatherResultsCategory = []
  if (categories && "values" in categories) {
    /* For the breadcrumbs we need the category with more appeareances */
    greatherResultsCategory = categories.values.reduce((a,b)=> a.results > b.results ? a:b )
    greatherResultsCategory = "path_from_root" in greatherResultsCategory 
      ? greatherResultsCategory.path_from_root 
      : []
    /* Categories string names array */
    categories = categories.values.reduce((acc, curVal) => [...acc, curVal.name],[]);
  }

  /*
    Getting just the first elements of the array of products that comes from the response
    of the endpoint due to a client requiment, in the future we could add a paginator in the 
    client side and make and endpoint that accepts ?page as a query strings param.

    I research for a better and performant way (we still retrieving from the BE tons of
    products and the slicing the results) to do this but i didnt found in the meli APIS a
    page filter that also allow me to add amount of products per page or something like that. 

    The pages already loaded in the client side should be stored in a state manager like 
    context API, apollo, redux, etc. in order to avoid calling again the endpoin
  */
  const firstPageItems = dataParsed.results.length
    ? dataParsed.results.slice(0, constants.RESULTS_PER_PAGE)
    : []
  let items = firstPageItems.reduce((acc, curItem) => {
    const {
      id,
      title,
      price,
      currency_id,
      thumbnail,
      condition,
      shipping,
      address
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
      free_shipping: constants.MELI_API_URLS.SHIPPING.FREE_SHIPPING in shipping 
        ? shipping.free_shipping
        : false,
      province: address.state_name
    };
    return [...acc, newItem];
  }, []);

  return {
    author: {
      name: NAME,
      lastname: LASTNAME,
    },
    categories: categories ? categories : [],
    items: items,
    breadcrumbs_route: greatherResultsCategory,
    appUrl: `${constants.APP_URL.PATH}:${constants.APP_URL.PORT}/items`
  };
}

module.exports = {
  getProductDetailHandler,
  getProductListHandler
};