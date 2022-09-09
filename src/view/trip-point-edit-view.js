import {createElement} from '../render.js';
import {humanizeTaskDueDate, toUpperFirst} from '../util.js';
import AbstractView from '../framework/view/abstract-view.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {BLANK_POINT} from '../const';
import he from 'he';

//let isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);

let id = 1;


const showAllOffers = (allOffers, selectedOffers, type, isDisabled) => {
  return allOffers.offers.map((value) => {
  //  console.log(selectedOffers);
  //  console.log(type);
    const checkedOffers = (selectedOffers.find((v) => value.id === v)) ?
      'checked' : '';
    const offerId = `event-offer-${type}-${value.id}-${Math.random()}`;
    return (` <div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="${offerId}" type="checkbox" name="event-offer-${type}" ${checkedOffers} value="${value.id}" ${isDisabled ? 'disabled' : ''}>
                        <label class="event__offer-label" for="${offerId}">
                          <span class="event__offer-title">${value.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${value.price}</span>
                        </label>
                      </div>`);
  }).join('');
};

let idType = 1;
const showAllEventType = (allType, selectedType, isDisabled) => {
  idType++;
  return allType.map((value, index) => {
    const checkedOffers = (value.type === selectedType) ?
      'checked' : '';
    return (`<div class="event__type-item">
    <input id="event-type-${value.type}-${idType}" class="event__type-input  visually-hidden" type="radio" name="event-type"
           value="${value.type}" ${checkedOffers} required ${isDisabled ? 'disabled' : ''}>
      <label class="event__type-label  event__type-label--${value.type}" for="event-type-${value.type}-${idType}">${toUpperFirst(value.type)}</label>
  </div>`);
  }).join('');
};

const getAllEventDestinationsTemplate = (destinationsLi) => destinationsLi.map((value) => (`<option value="${value.name}"></option>`)).join('');

const getAllEventDestinationsPicturesTemplate = (destination) => destination.pictures.map((item) => (`<img class="event__photo" src="${item.src}" alt="${item.description}">`)).join('');

const getTimeEventTemplate = (dateFrom, dateTo, isDisabled) => {
  if (dayjs(dateTo).isSameOrBefore(dateFrom)) {
    dateTo = dateFrom;
  }
  return (`
                    <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeTaskDueDate(dateFrom, 'D/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeTaskDueDate(dateTo, 'D/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
                  </div>
`);
};

let idEvent = 1;
const createEditForm = (point, offersLi, destinationsLi) => {
  idEvent++;
  const {basePrice, type, isFavorite, destination, dateFrom, dateTo, offers, isDisabled, isSaving, isDeleting} = point;
  const pointTypeOffer = offersLi.find((offer) => offer.type === point.type);
 // console.log(offers);
 // console.log(destinationsLi);
  // console.log(pointTypeOffer);
  const destinationObject = destinationsLi.find((item) => item.id === destination);
 // console.log(destinationObject);

  const photoDestinationTemplate = destinationObject && destinationObject.pictures.length ? (`
  <div class="event__photos-container">
       <div class="event__photos-tape">
            ${getAllEventDestinationsPicturesTemplate(destinationObject)}
        </div>
  </div>
  `) : '';
  return (`<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${idEvent}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${idEvent}" type="checkbox" ${isDisabled ? 'disabled' : ''}>

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${showAllEventType(offersLi, type, isDisabled)}

                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationObject?.name ? destinationObject?.name : ''}" list="destination-list-1" required ${isDisabled ? 'disabled' : ''}>
                    <datalist id="destination-list-1" >
                      ${getAllEventDestinationsTemplate(destinationsLi)}
                    </datalist>
                  </div>


${getTimeEventTemplate(dateFrom, dateTo, isDisabled)}
                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice ? basePrice : ''}" required min="0">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''} >${isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
                  <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
 ${(pointTypeOffer) ? showAllOffers(pointTypeOffer, offers, type, isDisabled) : ''}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationObject?.description ? he.encode(destinationObject?.description) : ''}</p>
${photoDestinationTemplate}
                  </section>
                </section>
              </form>
</li>`);
};

export default class CreateEditFormView extends AbstractStatefulView {
  #point = null;
  #pointOffers = null;
  #offers = null;
  #destinations = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #offersAll = null;

  constructor(point = BLANK_POINT, offers, destinations) {
    super();
    // this.#point = point;
    // this.#pointOffers = point.offers;

    this.#offers = offers;
    this.#destinations = destinations;
    this._state = CreateEditFormView.parsePointToState(point);
    this.#setInnerHandlers();
    this.#setFromDatepicker();
    this.#setToDatepicker();
    this.#offersAll = this._state.offers;
  }

  get template() {
   // console.log(this._state);
  //  console.log(this.#offers);
  //  console.log(this.#destinations);
    return createEditForm(this._state, this.#offers, this.#destinations);
  }

  setSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
  };

  #submitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit(CreateEditFormView.parseStateToPoint(this._state));
  };

  setCloseHandler = (callback) => {
    this._callback.close = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeHandler);


  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#pointDeleteFormHandler);
  };
  #pointDeleteFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(CreateEditFormView.parseStateToPoint(this._state));
  };

  #closeHandler = (evt) => {
    evt.preventDefault();
    this._callback.close();
  };

  #eventTypeInputHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({type: `${evt.target.value}`, offers: []});
  };
  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({basePrice: `${evt.target.value}`});
  };
  #eventDestinationInputHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({destination: this.#destinations.findIndex((item) => item.name === evt.target.value) + 1});
  };

  #eventOfferSelectHandler = (evt) => {
    evt.preventDefault();
    /*
        let indexSelected = this.#offers.find((item) => item.type === this._state.type).offers.findIndex((item) => item.id === +evt.target.value) + 1;
        let res = this._state.offers.slice();
        if (res.includes(indexSelected)) {
          res.splice(res.findIndex((item) => item === indexSelected), 1);
        } else {
          res.push(indexSelected);
        }

        this._setState({offers: res});

     */
    const id = parseInt(evt.target.value, 10);
    const offers = this._state.offers.slice();
    const currentId = offers.indexOf(id);

    if (evt.target.checked && currentId < 0) {
      offers.push(id);
    } else if (currentId > -1) {
      offers.splice(currentId, 1);
    }

    this._setState({offers});
  };

//добавить доп поля
  static parsePointToState = (point) => ({ //создание метода без экземпляра - статик
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false
  });

  static  parseStateToPoint = (state) => {
    const point = {...state};
  //  console.log(point);
    // удалить доп поля
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };

  reset = (point) => {
    this.updateElement(CreateEditFormView.parsePointToState(point));
 //   console.log(point);
  };
//внутренние обработчики
  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeInputHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventDestinationInputHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#eventOfferSelectHandler);


  };
  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setSubmitHandler(this._callback.submit);
    this.setCloseHandler(this._callback.close); //выход без сохранения
    this.#setFromDatepicker();
    this.#setToDatepicker();
    this.setDeleteClickHandler(this._callback.deleteClick);

  };


  #setFromDatepicker = (dateFrom) => {
    if (this._state.dateFrom) {
      this.#datepickerFrom = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          enableTime: true,
          weekNumbers: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateFrom,
          onChange: this.#fromDateChangeHandler,
        }
      );
    }
  };
  #fromDateChangeHandler = ([userDate]) => {

    this.updateElement({dateFrom: userDate});
  };

  #setToDatepicker = (dateTo) => {
    if (this._state.dateTo) {
      this.#datepickerTo = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          enableTime: true,
          weekNumbers: true,
          minDate: this._state.dateFrom,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateTo,
          onChange: this.#toDateChangeHandler,
        }
      );
    }
  };
  #toDateChangeHandler = ([userDate]) => {
    this.updateElement({dateTo: userDate});
  };
  removeElement = () => {
    super.removeElement();
    if (this.#datepickerFrom || this.#datepickerTo) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

};


/*
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
 */
