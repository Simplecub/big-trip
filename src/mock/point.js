import {POINT_TYPE} from './const.js';
import {getDestination} from './destination.js';
import {getRandomPositiveInteger, getShuffleArray} from '../util.js';
import {offersByType} from './offer.js';
import dayjs from 'dayjs';


const generateData = (from, to) => {
  const daysGap = getRandomPositiveInteger(from, to)
//  const
  return dayjs().add(daysGap,'hours').toDate()
}

let  id = 0
let i =0
export const generatePoint = () => {

  return {
    basePrice: getRandomPositiveInteger(100, 10000),
    dateFrom: generateData(0, 5),
    dateTo: generateData(5, 10),
    destination: getDestination(),
    id: id++,
    isFavorite: getRandomPositiveInteger(),
    offers:  Array.from({length:getRandomPositiveInteger(1, 4)}, () => i++),
   // offers:  offersByType(type)['offers'],
    type: `${getShuffleArray(POINT_TYPE, 1)}`
}
}
