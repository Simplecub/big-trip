



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
export {SortType, UpdateType, UserAction, FilterType};
