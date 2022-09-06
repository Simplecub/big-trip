import {generatePoint} from '../mock/point.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = Array.from({length: 4}, generatePoint);
  #pointsAPIService = null;

  constructor(pointsAPIService) {
    super();
    this.#pointsAPIService = pointsAPIService;
//обращаемя к геттеру points, он возвращает промис
    this.#pointsAPIService.points.then((points) => {
      console.log(points.map(this.#adaptedToClient));
      console.log(points)
    });
  }

  // getPoints = () => this.#points
  get points() {
    return this.#points;
  }

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('cant update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];
    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('cant deleting unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType);
  };

  #adaptedToClient = (point) => {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : '', //проверяет дату и если она есть то возвражает строку на сервер
      dateTo: point['date_to'] !== null ? new Date(point['date_from']) : '',
      destination: point['destination'],
      id: point['id'],
      isFavorite: point['is_favorite'],
      offers: point['offers'],
      type: point['type'],
    };
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };
}

