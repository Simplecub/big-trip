import NewButtonView from '../view/new-button-view.js';
import CreateSortView from '../view/sort-view.js';
//import {render} from '../render.js';
import CreatePointLiView from '../view/trip-point-view.js';
import CreateTripListView from '../view/trip-list-view.js';
import CreateEditFormView from '../view/trip-point-edit-view.js';
import CreatePointView from '../view/1new-point-view.js';
import TripListEmptyView from '../view/trip-list-empty-view.js';
import {render, replace, remove, RenderPosition} from '../framework/render.js';
import PointsModel from '../model/points-model.js';
import PointPresenter from './point-presenter.js';
import LoadingView from '../view/loading-view.js'
import {
  sortPointPriceDown,
  sortPointTimeDown,
  updateItem,
  filter,
  sortPointDate,
  getRandomPositiveInteger
} from '../util.js';
import {FilterType, SortType, UpdateType, UserAction} from '../const.js';
import PointNewPresenter from './point-new-presenter.js';

export default class BoardPresenter {
  #pointsModel = null;
  #boarContainer = null;
  #boardPoints = null;
  #sortComponent = null;
  #boardTripListComponent = new CreateTripListView();
  #loadingComponent = new LoadingView();
  #noPointComponent = null;
  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #currentSortType = SortType.DAY;
  #sourceBoardPoints = [];
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true

  constructor(boardContainer, pointsModel, offerModel, destinationModel, filterModel) {
    this.#boarContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.offersModel = offerModel;
    this.destinationModel = destinationModel;
    this.#filterModel = filterModel;
    this.#pointNewPresenter = new PointNewPresenter(this.#boardTripListComponent.element, this.#handleViewAction);
//чтобы презентер узнал об изменении модели, подписываемся на уведомления об изменениях
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

  }

  get points() {
    this.#filterType = this.#filterModel.filter; //геттер текущего фильтра
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointTimeDown);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPriceDown);
      case SortType.DAY:
        return filteredPoints.sort(sortPointDate);
    }
    return filteredPoints;
  }

  init = () => {
    // this.#boardPoints = [...this.#pointsModel.points];
    // this.#sourceBoardPoints = [...this.#pointsModel.points];
    // if (this.#pointsModel.points.length === 0) {
    /*  if (this.points.length === 0) {
        this.#renderBoardEmpty();
      } else {


     */
    //   this.#renderSort();
    this.#renderBoard();
    this.offersModel.init().then(() => {
      this.offersItem = [...this.offersModel.offersAll];
      this.destinationModel.init().then(() => {
        this.destinations = [...this.destinationModel.destinationAll];
        //временная заглушка пока не робит https://picsum.photos/300/200?r=0.6565559083233912
        this.destinations = this.destinations.map((item) => ({
          ...item,
          pictures: item.pictures.map((pic) => ({
            ...pic,
            src: `https://loremflickr.com/320/240?lock=${getRandomPositiveInteger(1, 1000)}`
          }))
        }));
        //   console.log(this.offersItem);
       // this.#renderBoard();
      });

    });


  };
  //создание новой точки
  createPoint = (callback) => {
    console.log(this.#pointNewPresenter);
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback, this.offersItem, this.destinations);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.renderPoint(point, this.offersItem, this.destinations));
  };
  #renderLoading = () => {
    render(this.#loadingComponent, this.#boardTripListComponent.element, RenderPosition.AFTERBEGIN)
    this.#loadingComponent.shake()
  }
  #renderBoardEmpty = () => {
    this.#noPointComponent = new TripListEmptyView(this.#filterType);
    render(this.#noPointComponent, this.#boardTripListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderSort = () => {
    this.#sortComponent = new CreateSortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#boardTripListComponent.element, RenderPosition.AFTERBEGIN);
  };

  renderPoint = (point, offersItem, destinations) => {
    const pointPresenter = new PointPresenter(this.#boardTripListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, offersItem, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
    console.log(this.#pointPresenter);
  };


  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;

    this.#clearBoard();
    this.#renderBoard();
  };


  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

//вызывается в _notify
  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.offersItem, this.destinations);
        break;
      case UpdateType.MINOR:
        // обновить список (изменилась одно - задача удалена) ;
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        // обновить всю доску(при перекл фильра)
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent)
      remove(this.#sortComponent)
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #clearBoard = (resetSortType = false) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderBoard = () => {
    const points = this.points;
    render(this.#boardTripListComponent, this.#boarContainer);
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (this.points.length === 0) {
      this.#renderBoardEmpty();
      return;
    }
    this.#renderSort();
    this.#renderPoints(points);
    // render(this.#renderPoints, this.#boardTripListComponent.element)
  };
}

