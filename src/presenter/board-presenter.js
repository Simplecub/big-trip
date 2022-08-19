import NewButtonView from '../view/new-button-view.js';
import CreateSortView from '../view/sort-view.js';
import {render} from '../render.js';
import CreatePointLiView from '../view/trip-point-view.js';
import CreateTripListView from '../view/trip-list-view.js';
import CreateEditFormView from '../view/trip-point-edit-view.js';
import CreatePointView from '../view/1new-point-view.js';


export default class BoardPresenter {
  sortComponent = new CreateSortView();
  boardTripListComponent = new CreateTripListView();

  init = (boardContainer, pointsModel, offerModel) => {
    this.boarContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.points]

    this.offersModel = offerModel;
    //   this.offersItem = [...this.offersModel.getOffers()]
    console.log(this.offersItem)
    console.log(this.boardPoints)

    render(this.sortComponent, this.boarContainer);
    render(this.boardTripListComponent, this.boarContainer);
    //   render(new CreateEditFormView(this.boardPoints[0],this.offersItem ), this.boardTripListComponent.getElement())

//for (let i = 0; i < this.boardPoints.length; i++) {
    // render(new CreatePointLiView(this.boardPoints[i],this.offersItem ), this.boardTripListComponent.getElement())
//}
    offerModel.init().then(() => {
      this.offersItem = [...this.offersModel.getOffers()]

      this.boardPoints.forEach((point) => this.addPoint(point))
    })
  };
  addPoint = (point) => {
    this.allOffersOfThisType = this.offersItem.find((offerList) => offerList.type === point.type)?.offers || [];
    render(new CreatePointLiView(point,this.allOffersOfThisType ), this.boardTripListComponent.getElement());
    render(new CreateEditFormView(point,this.offersItem ), this.boardTripListComponent.getElement());
  }
}
