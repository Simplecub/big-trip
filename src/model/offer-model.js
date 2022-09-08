import {offersByType} from '../mock/offer.js';
/*
export default class OfferModel {
  offers =Array.from({length:8}, offersByType)
  getOffers = () => this.offers
}



 */

export default class OfferModel {
  #offers = [];
  init = () => fetch('https://18.ecmascript.pages.academy/big-trip/offers', {
    headers: {'Authorization': 'Basic er883jdzbdw'}
  })
    .then(async (res) => {
      this.#offers = await res.json();
    });

  get offersAll() {

    return this.#offers;
  }
}

