import CreatePointLiView from '../view/trip-point-view.js';
import CreateEditFormView from '../view/trip-point-edit-view.js';
import {remove, render, replace} from '../framework/render.js';


export default class PointPresenter {
  #boardTripListComponent = null;
  #point = null;
  #pointComponent = null;
  #editPointComponent = null;
  #allOffersOfThisType = null;

  constructor(boardTripListComponent) {
    this.#boardTripListComponent = boardTripListComponent;
  }

  init = (point, offersItem) => {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const predEditPointComponent = this.#editPointComponent;

    this.#allOffersOfThisType = offersItem.find((offerList) => offerList.type === point.type)?.offers || [];
    this.#pointComponent = new CreatePointLiView(point, this.#allOffersOfThisType);
    this.#editPointComponent = new CreateEditFormView(point, offersItem);

    this.#pointComponent.setClickHandle(this.#replacePointToEdit);
    this.#editPointComponent.setSubmitHandler(this.#replaceEditToPoint);
    this.#editPointComponent.setCloseHandler(this.#replaceEditToPoint);

//рендер и проверка на наличие элемента в доме
    if (prevPointComponent === null || predEditPointComponent === null) {
      render(this.#pointComponent, this.#boardTripListComponent);
      return;
    }
    if (this.#boardTripListComponent.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if (this.#boardTripListComponent.contains(predEditPointComponent.element)) {
      replace(this.#pointComponent, predEditPointComponent);
    }
    remove(prevPointComponent);
    remove(predEditPointComponent);
  };

  destroy = ()   => {
    remove(this.#pointComponent)
    remove(this.#editPointComponent)
  }

  #replacePointToEdit = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };
  #replaceEditToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditToPoint();
    }
  };

}
