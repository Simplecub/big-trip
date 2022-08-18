import {getRandomPositiveInteger, getShuffleArray} from '../util.js';
import {OFFER_TYPE, OFFERS_TITLE} from './const.js';



let id = 0
export const getOffer =() => {
  return {
    id: id++,
    title: `${getShuffleArray(OFFERS_TITLE,1)}`,
    price: getRandomPositiveInteger(10, 150)
  }
}



export const offersByType = () => (
  {
    type: `${getShuffleArray(OFFER_TYPE,1)}`,
    offers: Array.from({length:getRandomPositiveInteger(1, 5)}, getOffer)
  }
)

