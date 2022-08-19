import {createElement} from "../render.js";

const createNewTempBtn = () => '<button class="trip-main__event-add-btn btn btn--yellow"> kiki</button>'


export default class NewButtonView {
  #element = null
  get template() {
    return createNewTempBtn()
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
