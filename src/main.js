import NewButtonView from './view/new-button-view.js';
//import {render} from "./render.js";
import {render} from './framework/render.js';
import BoardPresenter from './presenter/board-presenter';
import CreateFilterView from './view/filter-view.js';

import CreateEditFormView from './view/trip-point-edit-view.js';
import CreatePointLiView from './view/trip-point-view.js';
import PointsModel from './model/points-model.js';
import OfferModel from './model/offer-model.js';
import {generateFilter} from './mock/filter.js';
import DestinationModel from './model/destination-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic er883jdzbdw';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';
const siteHeaderEl = document.querySelector('.trip-controls__filters');
const sitePageBodyEl = document.querySelector('.trip-events');
const sitePageBodyMainEl = document.querySelector('.trip-main');


//render(new CreateFilterView(filters, 'everything'), siteHeaderEl)
const filterModel = new FilterModel();
//const pointsModel = new PointsModel();
const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
//const offerModel = [] //new OfferModel();
//const destinationModel = new DestinationModel();
const newPointButtonComponent = new NewButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};
const handleNewPointButtonClick = () => {
  boardPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

const filterPresenter = new FilterPresenter(siteHeaderEl, filterModel, pointsModel);
const boardPresenter = new BoardPresenter(sitePageBodyEl, pointsModel, filterModel);

filterPresenter.init();
boardPresenter.init();

pointsModel.init().finally(() => {
  render(newPointButtonComponent, sitePageBodyMainEl);
  newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
})

