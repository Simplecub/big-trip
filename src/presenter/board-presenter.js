import NewButtonView from '../view/new-button.js';
import CreateSortView from '../view/sort.js';
import {render} from '../render.js';
import CreatePointLiView from '../view/trip-point.js';
import CreateTripListView from '../view/trip-list.js';
import CreateEditFormView from '../view/edit-form.js';


export default class BoardPresenter {
  sortComponent = new CreateSortView();
  boardTripListComponent = new CreateTripListView();

  init = (boardContainer, pointsModel, offerModel) => {
    this.boarContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoints()]

    this.offersModel = offerModel;
    this.offersItem = [...this.offersModel.getOffers()]
console.log(this.offersItem)
console.log (this.boardPoints)

    render(this.sortComponent, this.boarContainer);
    render(this.boardTripListComponent, this.boarContainer);
    render(new CreateEditFormView(), this.boardTripListComponent.getElement())

// render(this.sortComponent, this.boardComponent.getElement());
    //   render(new TaskEditView(), this.taskListComponent.getElement());
for (let i = 0; i < this.boardPoints.length; i++) {
  render(new CreatePointLiView(this.boardPoints[i],this.offersItem ), this.boardTripListComponent.getElement())
}
  //  for (let i = 0; i < 3; i++) {
   //   render(new CreatePointLiView(), this.boardTripListComponent.getElement());
 //   }

    //  render(new LoadMoreButtonView(), this.boardComponent.getElement())
  };
}
