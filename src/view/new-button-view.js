import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';

const createNewTempBtn = () => ('<button class="trip-main__event-add-btn btn btn--big btn--yellow">New event</button>');


export default class NewButtonView extends AbstractView {

  get template() {
    return createNewTempBtn();
  }

  setClickHandler = (callback) => {
    this._callback.setClick = callback;
    console.log(this.element);
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.setClick();

  };
}
/*
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


 */
