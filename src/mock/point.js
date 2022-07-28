import {getDestination} from './destination.js';
import {getRandomPositiveInteger} from '../util.js';
import {offersByType} from './offer.js';
import dayjs from 'dayjs';

export const generatePoint = () =>(
  {
    basePrice: getRandomPositiveInteger(100, 10000),
    dateFrom: generateData(),
    dateTo: generateData(),
    destination: getDestination(),
    id: "0",
    isFavorite: getRandomPositiveInteger(),
    offers:  offersByType("bus")['offers'],
    type: "bus"
  }
)

const generateData = () => {
  const DayGap = 5
  const daysGap = getRandomPositiveInteger(DayGap-5, DayGap+5)
//  const
  return dayjs().add(daysGap,'hours').toDate()
}
