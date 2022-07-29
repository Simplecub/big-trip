import NewButtonView from "./view/new-button.js";
import {render} from "./render.js";
import BoardPresenter from './presenter/board-presenter'
import CreateFilterView from './view/filter.js';
import CreateNewPointView from './view/new-point.js';
import CreatePointNotDestView from './view/new-point-without-destination.js';
import CreatePointNotOffersView from './view/new-point-without-offers.js';
import CreateEditFormView from './view/edit-form.js';
import CreatePointLiView from './view/trip-point.js';
import PointsModel, {OfferModel} from './model/point-model.js';
const siteHeaderEl = document.querySelector('.trip-controls__filters')
const sitePageBodyEl = document.querySelector('.trip-events')

const pointsModel = new PointsModel()
const offerModel = new OfferModel()
render(new CreateFilterView(), siteHeaderEl)

const boardPresenter = new BoardPresenter()

//boardPresenter.init(sitePageBodyEl)
boardPresenter.init(sitePageBodyEl, pointsModel, offerModel)

//render(new CreateNewPointView(), sitePageBodyEl)
//render(new CreatePointNotDestView(), sitePageBodyEl)
//render(new CreatePointNotOffersView(), sitePageBodyEl)
//render(new CreateEditFormView(), sitePageBodyEl)
//render(new CreatePointLiView(), sitePageBodyEl)

console.log('fgfg+jnkjnjk')
