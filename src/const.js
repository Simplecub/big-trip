import dayjs from 'dayjs';
import {nanoid} from 'nanoid';


const SortType = {
  DAY: 'day',
  EVENT: ['event', 'disabled'],
  TIME: 'time',
  PRICE: 'price',
  OFFERS: ['offers' , 'disabled']
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST'
}

const BLANK_POINT = {
      basePrice: '',
      dateFrom: dayjs().toDate(),
      dateTo: dayjs().toDate(),
      destination: 0,
      id: "",
      isFavorite: 0,
      offers: [0],
      type: 'taxi',
}
export {SortType, UpdateType, UserAction, FilterType, BLANK_POINT};
