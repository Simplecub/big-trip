import NewButtonView from '../view/new-button.js'
import {render} from "../render.js";

export default class BoardPresenter {
  boardComponent = new NewButtonView();
  //taskListComponent = new TaskListView();

  init = (boardContainer) => {
    this.boarContainer = boardContainer;

   render(this.boardComponent, this.boarContainer)
  //  render(new SortView(), this.boardComponent.getElement())
 //   render(this.taskListComponent, this.boardComponent.getElement());
 //   render(new TaskEditView(), this.taskListComponent.getElement());

    for (let i = 0; i <3; i++){
    //  render(new TaskView(), this.taskListComponent.getElement());
    }

  //  render(new LoadMoreButtonView(), this.boardComponent.getElement())
  }
}
