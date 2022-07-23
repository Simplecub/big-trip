import NewButtonView from "./view/new-button.js";
import {render} from "./render.js";
import BoardPresenter from './presenter/board-presenter'
const siteMainEl = document.querySelector('.page-main')

render(new NewButtonView(), siteMainEl)


const boardPresenter = new BoardPresenter()
boardPresenter.init(siteMainEl)

console.log('fgfg+jnkjnjk')
