import {createElement} from "../render.js";

const createNewTempBtn = () => '<button class="trip-main__event-add-btn btn btn--yellow"> kiki</button>'


export default class NewButtonView {
  #element = null
  getTemplate() {
    return createNewTempBtn()
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
