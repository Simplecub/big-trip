import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';
import {toUpperFirst} from '../util';


const getSortTemplate = (currentSortType) => {
  return Object.keys(SortType).map((value) => {
    const isChecked = (currentSortType === value.toLowerCase()) ? 'checked' : '';
    const isDisabled = SortType[value][1] === 'disabled' ? 'disabled' : '';
    return (` <div class="trip-sort__item  trip-sort__item--${value.toLowerCase()}" >
              <input id="sort-${SortType[value]}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType[value]}" data-sort-type="${SortType[value]}" ${isChecked} ${isDisabled}>
              <label class="trip-sort__btn" for="sort-${SortType[value]}">${value}</label>
            </div>`);
  }).join(' ');
};

const createSort = (currentSortType) => {
  console.log(currentSortType);
  return (` <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
                ${getSortTemplate(currentSortType)}
            </form>`);
};

export default class CreateSortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSort(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };
  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    console.log(evt.target.dataset.sortType);
    /*
    this.element.querySelectorAll('input').forEach((item) => {
      item.removeAttribute('checked');
      if (evt.target.dataset.sortType === item.getAttribute('data-sort-type')) {
        item.setAttribute('checked', 'checked')
      }
    })
     */
  };

};
/*
export default class CreateSortView {
  #element = null
  get template(){
    return createSort()
  }
  get  element(){
    if(!this.#element) {
      this.#element = createElement(this.template)
    }
    return this.#element
  }
  removeElement() {
    this.#element = null
  }
}


 */
