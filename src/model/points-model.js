import {generatePoint} from '../mock/point.js';
import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class PointsModel extends Observable {
 //  #points = Array.from({length: 4}, generatePoint);
  #pointsAPIService = null;
  #points = [];

  constructor(pointsAPIService) {
    super();
    this.#pointsAPIService = pointsAPIService;
//обращаемя к геттеру points, он возвращает промис

  }

  // getPoints = () => this.#points
  get points() {
    return this.#points;
  }

  init = async () => {
    try {
      const points = await this.#pointsAPIService.points;  //обращаемя к геттеру points, он возвращает промис - получает точки  from server обращаясь к геттеру .points
      this.#points = points.map(this.#adaptedToClient);
      console.log(this.#points)
    } catch (err) { //ловим ошибки
      this.#points = [];
    }

    this._notify(UpdateType.INIT)
  };

  updatePoint = async (updateType, update) => {
    //чтобы обновить задачу находим её по Id
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('cant update unexisting point');
    }
try {
  const response = await this.#pointsAPIService.updatePoint(update)
  const updatedPoint = this.#adaptedToClient(response)
  this.#points = [
    ...this.#points.slice(0, index),
    updatedPoint,
    ...this.#points.slice(index + 1),
  ];
  this._notify(updateType, updatedPoint);
} catch (err) {
      throw new Error('can\'t update point')
}
  };

/*
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
 */
  /*
    addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];
    this._notify(updateType, update);
  };

   */
  addPoint = async (updateType, update) => {
    try {
      const response = await this.#pointsAPIService.addPoint(update);
      const newPoint = this.#adaptedToClient(response)
      this.#points = [newPoint, ...this.#points,];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('can\t add point')
    }

  };

  /*
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
   */
  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('cant deleting unexisting point');
    }
      try {
        //ичего не возвращает поскольку нечего возвращать так как удалено
        await this.#pointsAPIService.deletePoint(update)
        this.#points = [
          ...this.#points.slice(0, index),
          ...this.#points.slice(index + 1),
        ];
        this._notify(updateType);
      } catch (err) {
      throw new Error('can/t delete')
      }
    }


  #adaptedToClient = (point) => {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : '', //проверяет дату и если она есть то возвражает строку на сервер
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : '',
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

