import {getDestination} from './destination.js';
import {getRandomPositiveInteger} from '../util.js';

export const generatePoint = () =>(
  {
    basePrice: getRandomPositiveInteger(100, 10000),
    dateFrom: null,
    dateTo: null,
    destination: getDestination(),
    id: "0",
    isFavorite: getRandomPositiveInteger(),
    offers:  'yhyh', //'$Array<Offer.id>$',
    type: "bus"
  }
)
