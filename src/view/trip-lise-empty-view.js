import {createElement} from '../render';

const createEmptyStr = () => {


  return (`   <p class="trip-events__msg">Click New Event to create your first point</p>`)
}

export default class TripLisTEmptyView {
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
