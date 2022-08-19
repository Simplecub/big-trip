import {createElement} from "../render.js";

const createTripList = () => `<ul class="trip-events__list"></ul>`



export default class CreateTripListView {
  #element = null
  getTemplate() {
    return createTripList()
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate())
    }
    return this.#element
  }

  removeElement() {
    this.#element = null
  }
}



