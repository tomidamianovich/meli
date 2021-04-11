/*
  This module is used for handle common contants that are being shared among other modules
  and could change in a future so in order to avoid the neccesity of change all the files 
  that for example use an API name, we use this module.
*/

module.exports = Object.freeze({
  MELI_API_URLS: {
    BASE: 'https://api.mercadolibre.com/',
    QUERY: `https://api.mercadolibre.com/sites/MLA/search?q=`,
    ITEMS: `https://api.mercadolibre.com/items/`,
    DESCRIPTION: '/description',
    PARAMS: {
      SEARCH: 'search',
      QUERY_STRING_SEARCH: `?search`,
      ID: 'id'
    },
    FILTERS: {
      CATEGORY: 'category',
      CATEGORY_KEY: 'values',
    },
    SHIPPING: {
      FREE_SHIPING: 'free_shipping'
    }
  },
  APP_URL: {
    PATH: 'http://localhost',
    PORT: '9000'
  },
  AUTHOR: {
    KEY: 'author',
    NAME: 'Tomas',
    LASTNAME: 'Damianovich'
  },
  RESULTS_PER_PAGE: 4,
  
});