import { constants } from '../utils/constants'

// Function that returns an endpoint URI based in the params that it recieves.
const urlGetter = (baseUrl, path,  param) => `${baseUrl}${path}${param}`

// Function that returns the price of a product separated by dots.
const getFormattedPrice = (price) => {
  if (!('amount' in price)) return "$ 00"
  const amountFormatted = price.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  return  `$ ${amountFormatted}`
}
// Function that returns the conditon and the sells amount formatted.
const getConditionAndSells = (condition, soldQuantity) => {
  const itemCondition = condition === 'new' ? 'Nuevo' : 'Usado'
  return `${itemCondition} - ${soldQuantity} vendidos`
}

/* Function that returns the amount of cents that a value has. If it is a value greather
than one millon we dont show the cents */
const getFormattedCents = (price) => {
  if ('amount' in price  && price.amount.toString().length > 6) return ""
  if (!('decimals' in price)) return "00"
  return price.decimals === 0 ? '00' : price.decimals.toString().substring(2, 4)
}

/* Function that returns the app logo of the application, it will by returned by the
backend and a placeholder was setted in order to catch possible undefined module */
const getLogoSrc = (module) => {
  if (typeof module === "object") {
    module = module.default;
  }
  if (typeof module === "undefined") {
    const { PATH, PORT, LOGO, LOGO_FILE_TYPE } = constants.APP_URL
    return `${PATH}:${PORT}/${LOGO}.${LOGO_FILE_TYPE}`
  }
  return module;
}

export {
  urlGetter,
  getFormattedPrice,
  getConditionAndSells,
  getFormattedCents,
  getLogoSrc
}
