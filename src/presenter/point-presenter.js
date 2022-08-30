import CreatePointLiView from '../view/trip-point-view.js';
import CreateEditFormView from '../view/trip-point-edit-view.js';
import {remove, render, replace} from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #boardTripListComponent = null;
  #point = null;
  #pointComponent = null;
  #editPointComponent = null;
  #allOffersOfThisType = null;
  #changeData = null;
  #offers = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;
  #destinations = null;

  constructor(boardTripListComponent, changeData, changeMode) {
    this.#boardTripListComponent = boardTripListComponent;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, offersItem, destinations) => {
    this.#point = point;
    this.#offers = offersItem;
    this.#destinations = destinations;
    const prevPointComponent = this.#pointComponent;
    const predEditPointComponent = this.#editPointComponent;
    console.log(prevPointComponent);
    this.#allOffersOfThisType = offersItem.find((offerList) => offerList.type === point.type)?.offers || [];
    this.#pointComponent = new CreatePointLiView(point, this.#allOffersOfThisType, destinations);
    this.#editPointComponent = new CreateEditFormView(point, offersItem, destinations);
    console.log(point);
    this.#pointComponent.setClickHandle(this.#replacePointToEdit);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editPointComponent.setSubmitHandler(this.#handleFormSubmit);
    this.#editPointComponent.setCloseHandler(this.#replaceEditToPoint);


//рендер и проверка на наличие элемента в доме
    if (prevPointComponent === null || predEditPointComponent === null) {
      render(this.#pointComponent, this.#boardTripListComponent);
      return;
    }
    //   if (this.#boardTripListComponent.contains(prevPointComponent.element)) {
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }
    //   if (this.#boardTripListComponent.contains(predEditPointComponent.element)) {
    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, predEditPointComponent);
    }
    remove(prevPointComponent);
    remove(predEditPointComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditToPoint();
    }
  };

  #replacePointToEdit = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };
  #replaceEditToPoint = () => {
    this.#editPointComponent.reset(this.#point)
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };
  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditToPoint();
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite}, this.#offers, this.#destinations);
  };
  #handleFormSubmit = () => {
    this.#changeData(this.#point, this.#offers, this.#destinations);
    this.#replaceEditToPoint();


  };

}
