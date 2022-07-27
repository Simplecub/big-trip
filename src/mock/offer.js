import {getRandomPositiveInteger} from '../util.js';


const OFFER_TYPE = ["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"]
const OFFERS_OF_TYPE = [
  ['Order Uber', 11, 111, 1111],
  [2,22,222,2222],
  [3, 33, 333, 3333]
]
let id1 = 0
export const getOffer =() => {
  id1 += 1
  return {
    id1,
    title: "Upgrade to a business class",
    price: getRandomPositiveInteger(10, 150)
  }
}



export const offersByType = (setType) => (
  {
    type: setType,
    offers: Array.from({length:3}, getOffer)
  }
)

