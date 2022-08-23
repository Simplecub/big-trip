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

export default class BoardPresenter {
  #pointsModel = null;
  #boarContainer = null;
  #boardPoints = null;
  #sortComponent = new CreateSortView();
  #boardTripListComponent = new CreateTripListView();
  #boardEmpty = new TripListEmptyView();

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
        // this.#boardPoints.forEach((point) => this.addPoint(point));
        this.#boardPoints.forEach((point) => {
          const pointPresenter = new PointPresenter(this.#boardTripListComponent.element);
          pointPresenter.init(point, this.offersItem);
        });
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

}
