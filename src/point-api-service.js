import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
}

export default class PointApiService extends ApiService {
  get points {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse)
  }

  updatePoint = async (point) => {
    const response = await this._load({
      url: `point/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'})
    })

    const parsedResonse = await ApiService.parseResponse(response)
    return parsedResonse
  }
}
