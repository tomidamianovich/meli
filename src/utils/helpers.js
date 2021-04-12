import { constants } from '../utils/constants'

// Function that returns an endpoint URI based in the params that it recieves.
const urlGetter = (baseUrl, path,  param) => `${baseUrl}${path}${param}`

const getFormattedPrice = (price) => {
  if (!('amount' in price)) return "$ 00"
  const amountFormatted = price.amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  return  `$ ${amountFormatted}`
}

const getConditionAndSells = (condition, soldQuantity) => {
  const itemCondition = condition === 'new' ? 'Nuevo' : 'Usado'
  return `${itemCondition} - ${soldQuantity} vendidos`
}

const getFormattedCents = (price) => {
  if ('amount' in price  && price.amount.toString().length > 6) return ""
  if (!('decimals' in price)) return "00"
  return price.decimals === 0 ? '00' : price.decimals.toString().substring(2, 4)
}

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
