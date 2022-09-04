import {render, replace, remove, RenderPosition} from '../framework/render.js';
import CreateEditFormView from '../view/trip-point-edit-view.js';
import {BLANK_POINT, FilterType, SortType, UpdateType, UserAction} from '../const.js';
import {nanoid} from 'nanoid';

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #editPointComponent = null;
  #destroyCallback = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = (callback, offersItem, destinations) => {
    this.#destroyCallback = callback;
    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new CreateEditFormView(BLANK_POINT, offersItem, destinations);
    console.log(this.#editPointComponent.element)
    console.log(this.#pointListContainer)
    this.#editPointComponent.setSubmitHandler(this.#handleFormSubmit);
    this.#editPointComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#editPointComponent.setCloseHandler(this.#handleDeleteClick)

    render(this.#editPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeyDown)
    console.log(this.#pointListContainer)
  };

  destroy = () => {
    if (this.#editPointComponent === null) {
      return
    }
    this.#destroyCallback?.()

    remove(this.#editPointComponent);
    this.#editPointComponent = null
    document.removeEventListener('keydown', this.#onEscKeyDown)
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
    //  {id: nanoid(), ...point}
      {...point, id: nanoid()});

    console.log({ ...point, id: nanoid(),})
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
