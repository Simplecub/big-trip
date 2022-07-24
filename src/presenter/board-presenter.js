import NewButtonView from '../view/new-button.js'
import CreateSortView from '../view/sort.js';
import {render} from "../render.js";

export default class BoardPresenter {
  boardComponent = new NewButtonView();
  sortComponent = new CreateSortView();

  init = (boardContainer) => {
    this.boarContainer = boardContainer;

   render(this.sortComponent, this.boarContainer)

// render(this.sortComponent, this.boardComponent.getElement());
 //   render(new TaskEditView(), this.taskListComponent.getElement());

    for (let i = 0; i <3; i++){
    //  render(new TaskView(), this.taskListComponent.getElement());
    }

  //  render(new LoadMoreButtonView(), this.boardComponent.getElement())
  }
}
