//import {createElement} from '../render';
import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const NoPointTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createEmptyStr = (filterType) => {
  return (`   <p class="trip-events__msg">${NoPointTextType[filterType]}</p>`);
};


export default class TripListEmptyView extends AbstractView {
  #filterType = null
  constructor(filterType) {
    super();
    this.#filterType =filterType
  }
  get template() {
    return createEmptyStr(this.#filterType);
  }
}


/*
export default class TripListEmptyView {
  #element = null
  get template() {
    return createEmptyStr()
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
