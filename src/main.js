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
import {generateFilter} from './mock/filter.js';
import DestinationModel from './model/destination-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const siteHeaderEl = document.querySelector('.trip-controls__filters')
const sitePageBodyEl = document.querySelector('.trip-events')


//render(new CreateFilterView(filters, 'everything'), siteHeaderEl)
const filterModel = new FilterModel()
const pointsModel = new PointsModel()
const offerModel = new OfferModel()
const destinationModel = new DestinationModel()

const filterPresenter = new FilterPresenter(siteHeaderEl,filterModel,pointsModel)

const boardPresenter = new BoardPresenter(sitePageBodyEl, pointsModel, offerModel, destinationModel, filterModel)

//boardPresenter.init(sitePageBodyEl)
filterPresenter.init()
boardPresenter.init()

//render(new CreateNewPointView(), sitePageBodyEl)
//render(new CreatePointNotDestView(), sitePageBodyEl)
//render(new CreatePointNotOffersView(), sitePageBodyEl)
//render(new CreateEditFormView(), sitePageBodyEl)
//render(new CreatePointLiView(), sitePageBodyEl)

console.log(offerModel)
