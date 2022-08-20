import {generatePoint} from '../mock/point.js';

export default class PointsModel {
  #points = Array.from({length: 0}, generatePoint);

  // getPoints = () => this.#points
  get points() {
    return this.#points;
  }
}

