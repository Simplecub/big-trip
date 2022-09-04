import {createElement} from '../render.js';
import {humanizeTaskDueDate, dateDiff} from '../util.js';
import AbstractView from '../framework/view/abstract-view.js';
import he from 'he'

const createPointLi = (point, pointTypeOffers, destinationsLi) => {
  const {basePrice, type, isFavorite, destinationId, dateFrom, dateTo, offers} = point;
  //if (dateTo < dateFrom) { [dateTo, dateFrom] = [dateFrom, dateTo] }
  console.log(offers);
  const favorite = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';
//нужно связать - в point достать ключи из offers и по ним найти данные в offersLi

  console.log(point);

  const selectedOffers = (pointTypeOffers) ? offers.map((v) => {
    for (const offerOne of pointTypeOffers) {
      if (offerOne.id === v) {
        return (`<li className="event__offer">
      <span className="event__offer-title">${offerOne.title}</span>
      &plus;&euro;&nbsp;
      <span className="event__offer-price">${offerOne.price}</span>
    </li>`);
      }
    }
  }).join('') : '';

  const destination = destinationsLi.find((item) => item.id === point.destination)
  return (
    `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${humanizeTaskDueDate(dateFrom, 'YYYY-MM-DD')}">${humanizeTaskDueDate(dateFrom, 'MMM DD')}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination?.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${humanizeTaskDueDate(dateFrom, 'YYYY-MM-DDThh:mm')}">${humanizeTaskDueDate(dateFrom, 'HH:mm')}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${humanizeTaskDueDate(dateTo, 'YYYY-MM-DDThh:mm')}">${humanizeTaskDueDate(dateTo, 'HH:mm')}</time>
                  </p>
                  <p class="event__duration">${dateDiff(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${selectedOffers}

                </ul>
                <button class="${favorite}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
 `
  );
};

export default class CreatePointLiView extends AbstractView {
  #point = null
  #offers = null
  #destinations = null
  constructor(point, offers, destinations) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
  }
  get template() {
    return createPointLi(this.#point, this.#offers, this.#destinations);
  }

  setClickHandle = (callback) => {
    this._callback.click = callback
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler)
  }
  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click()
    console.log('ffer')
  }
  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteHandler)
  }
  #favoriteHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick()
    console.log('ffer2')
  }

}

/*
export default class CreatePointLiView {
  #element = null
  constructor(point, offers) {
    this.point = point;
    this.offers = offers;
  }

  get template() {
    return createPointLi(this.point, this.offers);
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

 */
