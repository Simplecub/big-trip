import NewButtonView from "./view/new-button-view.js";
//import {render} from "./render.js";
import {render} from './framework/render.js'
import BoardPresenter from './presenter/board-presenter'
import CreateFilterView from './view/filter-view.js';
import CreateNewPointView from './view/1new-point-view.js';
import CreatePointNotDestView from './view/1new-point-without-destination-view.js';
import CreatePointNotOffersView from './view/1new-point-without-offers-view.js';
import CreateEditFormView from './view/trip-point-edit-view.js';
import CreatePointLiView from './view/trip-point-view.js';
import PointsModel from './model/point-model.js';
import OfferModel from './model/offer-model.js'
const siteHeaderEl = document.querySelector('.trip-controls__filters')
const sitePageBodyEl = document.querySelector('.trip-events')

const pointsModel = new PointsModel()
const offerModel = new OfferModel()
render(new CreateFilterView(), siteHeaderEl)

const boardPresenter = new BoardPresenter(sitePageBodyEl, pointsModel, offerModel)

//boardPresenter.init(sitePageBodyEl)
boardPresenter.init()

//render(new CreateNewPointView(), sitePageBodyEl)
//render(new CreatePointNotDestView(), sitePageBodyEl)
//render(new CreatePointNotOffersView(), sitePageBodyEl)
//render(new CreateEditFormView(), sitePageBodyEl)
//render(new CreatePointLiView(), sitePageBodyEl)

console.log(offerModel)
