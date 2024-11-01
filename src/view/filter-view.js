import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';


const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  console.log(type);
  console.log(currentFilterType);
  return (`
   <div class="trip-filters__filter">
                  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}"
                  ${type === currentFilterType ? 'checked' : ''}
                  ${count === 0 ? 'disabled' : ''}>
                  <label class="trip-filters__filter-label" for="filter-${name}">${name}+${count}</label>
                </div>
  `);
};

const createFilterTemplate = (filterItem, currentFilter) => {
  const filtersItemsTemplate = filterItem
    .map((filter) => createFilterItemTemplate(filter, currentFilter))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
${filtersItemsTemplate}
  <button class="visually-hidden" type="submit">Accept filter</button>
              </form> `;
};


/*
const createFilter = () => (
  `<form class="trip-filters" action="#" method="get">
                <div class="trip-filters__filter">
                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
                </div>

                <div class="trip-filters__filter">
                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
                  <label class="trip-filters__filter-label" for="filter-future">Future</label>
                </div>

                <div class="trip-filters__filter">
                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
                  <label class="trip-filters__filter-label" for="filter-past">Past</label>
                </div>

                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`
)


 */

export default class CreateFilterView extends AbstractView {
  #filters = null;
  #currentFilter = null

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler)
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value)
  }
}
/*
export default class CreateFilterView {
  #element = null
  get template() {
    return createFilter()
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



