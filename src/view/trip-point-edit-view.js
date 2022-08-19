import {createElement} from '../render.js';
import {toUpperFirst} from '../util.js'

let idOffers = 1
const showAllOffers = (allOffers, selectedOffers, type) => {
  return allOffers.offers.map((value) => {
    idOffers++
    const checkedOffers = (selectedOffers.find((v) => value.id === v)) ?
      'checked' : '';
    return (` <div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${idOffers}" type="checkbox" name="event-offer-${type}" ${checkedOffers}>
                        <label class="event__offer-label" for="event-offer-${type}-${idOffers}">
                          <span class="event__offer-title">${value.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${value.price}</span>
                        </label>
                      </div>`);
  }).join('');
};

let idType = 1
const showAllEventType = (allType, selectedType) => {
idType++
  return allType.map((value,index) => {
    const checkedOffers = ( value.type === selectedType) ?
      'checked' : '';
    return (`<div class="event__type-item">
    <input id="event-type-${value.type}-${idType}" class="event__type-input  visually-hidden" type="radio" name="event-type"
           value="${value.type}" ${checkedOffers}>
      <label class="event__type-label  event__type-label--${value.type}" for="event-type-${value.type}-${idType}">${toUpperFirst(value.type)}</label>
  </div>`);
  }).join('');
};

let idEvent = 1
const createEditForm = (point, offersLi) => {
  idEvent++
  const {basePrice, type, isFavorite, destination, dateFrom, dateTo, offers} = point;
  const pointTypeOffer = offersLi.find((offer) => offer.type === point.type);
//  console.log(offersLi);
  //console.log(point);
  // console.log(pointTypeOffer);

  return (`<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${idEvent}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${idEvent}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${showAllEventType(offersLi, type)}

                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
 ${(pointTypeOffer) ? showAllOffers(pointTypeOffer, offers, type) : ''}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>
                  </section>
                </section>
              </form>
</li>`);
};

export default class CreateEditFormView {
  #element = null
  constructor(point, offers) {
    this.point = point;
    this.offers = offers;
  }

  get template() {
    return createEditForm(this.point, this.offers);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
