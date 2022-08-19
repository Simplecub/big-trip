import NewButtonView from '../view/new-button-view.js';
import CreateSortView from '../view/sort-view.js';
import {render} from '../render.js';
import CreatePointLiView from '../view/trip-point-view.js';
import CreateTripListView from '../view/trip-list-view.js';
import CreateEditFormView from '../view/trip-point-edit-view.js';
import CreatePointView from '../view/1new-point-view.js';


export default class BoardPresenter {
  #pointsModel = null;
  #boarContainer = null;
  #boardPoints = null;
  #sortComponent = new CreateSortView();
  #boardTripListComponent = new CreateTripListView();

  init = (boardContainer, pointsModel, offerModel) => {
    this.#boarContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];

    this.offersModel = offerModel;
    //   this.offersItem = [...this.offersModel.getOffers()]
    console.log(this.offersItem);
    console.log(this.#boardPoints);

    render(this.#sortComponent, this.#boarContainer);
    render(this.#boardTripListComponent, this.#boarContainer);
    //   render(new CreateEditFormView(this.boardPoints[0],this.offersItem ), this.boardTripListComponent.getElement())

//for (let i = 0; i < this.boardPoints.length; i++) {
    // render(new CreatePointLiView(this.boardPoints[i],this.offersItem ), this.boardTripListComponent.getElement())
//}
    offerModel.init().then(() => {
      this.offersItem = [...this.offersModel.getOffers()];
      this.#boardPoints.forEach((point) => this.addPoint(point));
    });
  };
  addPoint = (point) => {
    this.allOffersOfThisType = this.offersItem.find((offerList) => offerList.type === point.type)?.offers || [];
    // render(new CreatePointLiView(point,this.allOffersOfThisType ), this.#boardTripListComponent.element);
    // render(new CreateEditFormView(point,this.offersItem ), this.#boardTripListComponent.element);
    const pointComponent = new CreatePointLiView(point, this.allOffersOfThisType);
    const editPointComponent = new CreateEditFormView(point, this.offersItem);

    const replacePointToEdit = () => {
      this.#boardTripListComponent.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceEditToPoint = () => {
      this.#boardTripListComponent.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => replacePointToEdit());
    console.log(editPointComponent);
    editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceEditToPoint();
   });
    editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditToPoint();
    });

    render(pointComponent, this.#boardTripListComponent.element);
  };
}
