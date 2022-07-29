
import {generatePoint} from '../mock/point.js';
import {offersByType} from '../mock/offer.js';

export default class PointsModel {
  points = Array.from({length:4}, generatePoint)
  getPoints = () => this.points
}

export  class OfferModel {
  offers =Array.from({length:8}, offersByType)
  getOffers = () => this.offers
}
