import {getDestination} from './destination.js';

export const generatePoint = () =>(
  {
    basePrice: 1100,
    dateFrom: null,
    dateTo: null,
    destination: getDestination(),
    id: "0",
    isFavorite: false,
    offers:  'yhyh', //'$Array<Offer.id>$',
    type: "bus"
  }
)
