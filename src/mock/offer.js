import {getRandomPositiveInteger, getShuffleArray} from '../util.js';
import {OFFER_TYPE} from './const.js';


const OFFERS_OF_TYPE = [
  ['Order Uber', 11, 111, 1111],
  [2,22,222,2222],
  [3, 33, 333, 3333]
]
let id = 0
export const getOffer =() => {
  id += 1
  return {
    id,
    title: "Upgrade to a business class",
    price: getRandomPositiveInteger(10, 150)
  }
}



export const offersByType = () => (
  {
    type: getShuffleArray(OFFER_TYPE,1),
    offers: Array.from({length:getRandomPositiveInteger(1, 5)}, getOffer)
  }
)

