const { SearchForm } = require("../src/components/Main/SearchForm");
const { ProductDetail } = require("../src/components/Products/ProductDetail");
const { ProductsList } = require("../src/components/Products/ProductsList");

module.exports = [
  {
    path: "/",
    exact: true,
    component: SearchForm,
  },
  {
    path: "/items",
    exact: true,
    component: ProductsList,
  },
  {
    path: "/items/:id",
    exact: true,
    component: ProductDetail,
  },
];
