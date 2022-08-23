import NewButtonView from '../view/new-button-view.js';
import CreateSortView from '../view/sort-view.js';
//import {render} from '../render.js';
import CreatePointLiView from '../view/trip-point-view.js';
import CreateTripListView from '../view/trip-list-view.js';
import CreateEditFormView from '../view/trip-point-edit-view.js';
import CreatePointView from '../view/1new-point-view.js';
import TripListEmptyView from '../view/trip-list-empty-view.js';
import {render, replace, remove} from '../framework/render.js';
import PointsModel from '../model/point-model.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../util.js';

export default class BoardPresenter {
  #pointsModel = null;
  #boarContainer = null;
  #boardPoints = null;
  #sortComponent = new CreateSortView();
  #boardTripListComponent = new CreateTripListView();
  #boardEmpty = new TripListEmptyView();
#pointPresenter = new Map();

  constructor(boardContainer, pointsModel, offerModel) {
    this.#boarContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.offersModel = offerModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];

    if (this.#pointsModel.points.length === 0) {
      this.#renderBoardEmpty();
    } else {

      this.#renderSort();
      this.#renderBoardTripListComponent();
      this.offersModel.init().then(() => {
        this.offersItem = [...this.offersModel.offersAll];
         this.#boardPoints.forEach((point) => this.addPoint(point, this.offersItem));
      })
    }
  }

  #renderBoardEmpty = () => {
    render(this.#boardEmpty, this.#boarContainer);
  };
  #renderSort = () => {
    render(this.#sortComponent, this.#boarContainer);
  };

  #renderBoardTripListComponent = () => {
    render(this.#boardTripListComponent, this.#boarContainer);
  };

  addPoint = (point, offersItem) => {
    const pointPresenter = new PointPresenter(this.#boardTripListComponent.element, this.#handlePointChange, this.#handleModeChange );
    pointPresenter.init(point, offersItem);
    this.#pointPresenter.set(point.id, pointPresenter);
    console.log(this.#pointPresenter)
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #handlePointChange = (updatedPoint, offersItem) => {
    console.log( this.#boardTripListComponent)
    console.log(updatedPoint);
    this.#boardTripListComponent = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, offersItem);
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView())
  }
}

