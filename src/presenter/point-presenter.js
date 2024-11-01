import CreatePointLiView from '../view/trip-point-view.js';
import CreateEditFormView from '../view/trip-point-edit-view.js';
import {remove, render, replace} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';

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
    // this.#offers = offersItem;
    this.#destinations = destinations;
    const prevPointComponent = this.#pointComponent;
    const predEditPointComponent = this.#editPointComponent;
  //  console.log(prevPointComponent);
    this.#allOffersOfThisType = offersItem.find((offerList) => offerList.type === point.type)?.offers || [];
    this.#pointComponent = new CreatePointLiView(point, this.#allOffersOfThisType, destinations);
    this.#editPointComponent = new CreateEditFormView(point, offersItem, destinations);
 //   console.log(point);
    this.#pointComponent.setClickHandle(this.#replacePointToEdit);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editPointComponent.setSubmitHandler(this.#handleFormSubmit);
    this.#editPointComponent.setCloseHandler(this.#replaceEditToPoint);
    this.#editPointComponent.setDeleteClickHandler(this.#handleDeleteClick);


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
      replace(this.#pointComponent, predEditPointComponent);
      this.#mode = Mode.DEFAULT
    }
    remove(prevPointComponent);
    remove(predEditPointComponent);
  };

  setSaving = () => {       //обновляет элементь и блочит у них инпуты
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: false,
        isDeleting: true
      });
    }
  };
  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditToPoint();
    }
  };
//если отправка не удалась, вызывает shake и возвращает полям инпут возможность ввода
  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }
    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };
    this.#editPointComponent.shake(resetFormState);
  };

  #replacePointToEdit = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };
  #replaceEditToPoint = () => {
    this.#editPointComponent.reset(this.#point);
    replace(this.#pointComponent, this.#editPointComponent);


    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;

  };
  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditToPoint();
    }
  };

  #handleFavoriteClick = () => {
    // this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite}, this.#offers, this.#destinations);
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );

  };
  #handleFormSubmit = (update) => {
    //проверяем изменились ли значенияб которые поапдают под фильтрацю, если да UpdateType.MINOR и перерисовывает, если нет, то UpdateType.PATCH патч-обновление
    const isMinorUpdate =
      this.#point.basePrice !== update.basePrice
      // ||this.#point.basePrice !== update.basePrice

    this.#changeData(
      UserAction.UPDATE_POINT,
     isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update);
    // this.#replaceEditToPoint(); //8-6  убираем замену карточки
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point);

  };
  #handleCloseClick = (point) => {
    /*
        this.#changeData(
          UserAction.UPDATE_POINT,
          UpdateType.MINOR,
          point);


     */
    this.#replaceEditToPoint();
  };
}
