//import {createElement} from '../render';
import AbstractView from '../framework/view/abstract-view.js';
const createEmptyStr = () => {


  return (`   <p class="trip-events__msg">Click New Event to create your first point</p>`)
}

export default class TripListEmptyView extends AbstractView {
  get template() {
    return createEmptyStr()
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
