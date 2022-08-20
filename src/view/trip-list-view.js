import {createElement} from "../render.js";
import AbstractView from '../framework/view/abstract-view.js';

const createTripList = () => `<ul class="trip-events__list"></ul>`



export default class CreateTripListView extends AbstractView {
  get template() {
    return createTripList()
  }
}
/*
export default class CreateTripListView {
  #element = null
  get template() {
    return createTripList()
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template)
    }
    return this.#element
  }

  removeElement() {
    this.#element = null
  }
}
 */


