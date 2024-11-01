import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }
get offers () {
  return this._load({url: 'offers'})
    .then(ApiService.parseResponse);
}

get destinations () {
  return this._load({url: 'destinations'})
    .then(ApiService.parseResponse);
}
  updatePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)), //прогоняем через this.#adaptToServer(point) чтобы адаптировать под формат сервера
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const parsedResonse = await ApiService.parseResponse(response);
    return parsedResonse;
  };

  addPoint = async (point) => {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };
  deletePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE
    });
    return response;
  };
  #adaptToServer = (point) => {
    const adaptedPoint = {
      ...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null, //проверяет дату и если она есть то возвражает строку на сервер
      'date_to': point.dateTo instanceof Date ? point.dateFrom.toISOString() : null,
      'destination': point.destination,
      'id': point.id,
      'is_favorite': point.isFavorite,
      'offers': point.offers,
      'type': point.type
    };
    //удаляем дубли старые
    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    //  delete adaptedPoint.destination;
    //  delete adaptedPoint.id;
    delete adaptedPoint.isFavorite;
    // delete adaptedPoint.offers;
    //  delete adaptedPoint.type;


    return adaptedPoint;
  };

}
