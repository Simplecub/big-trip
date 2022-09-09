import dayjs from 'dayjs';
import {FilterType} from './const.js';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const getRandomPositiveInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const humanizeTaskDueDate = (dueDate, format) => dayjs(dueDate).format(format);
const dateDiff = (date1, date2) => {
  let res = '';
  let dayDiff = dayjs.duration(dayjs(date2).diff(dayjs(date1))).format(`DD`);
  let hoursDiff = dayjs.duration(dayjs(date2).diff(dayjs(date1))).format(`HH`);
  let minDiff = dayjs.duration(dayjs(date2).diff(dayjs(date1))).format(`mm`);
  if (dayDiff !== '00') {
    res += dayDiff + 'D';
  }
  if (hoursDiff !== '00') {
    res += hoursDiff + 'H';
  }
  if (minDiff !== '00') {
    res += minDiff + 'M';
  }
  return res;
};
//перемешивает массив, возвращет нужное число элементов массива
const getShuffleArray = (arr, length) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor((Math.random()) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, length);
};
//делает первый символ прописным
const toUpperFirst = (str) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);

};
// находит  и обновляет элемент
const updateItem = (items, update) => {
  console.log(update);
  const index = items.findIndex((item) => item.id === update.id);
  if (index === -1) {
    return items;
  }
  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
//фенкция помещает точки без даты в конец списка
//возвращает нужный вес для колбэка
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }
  if (dateA === null) {
    return 1;
  }
  if (dateB === null) {
    return -1;
  }
  return null;
};

const sortPointTimeDown = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
//  console.log(weight);
  return weight ?? dayjs(pointA.dateFrom).diff(pointA.dateTo) - dayjs(pointB.dateFrom).diff(pointB.dateTo);
};

const sortPointPriceDown = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.basePrice, pointB.basePrice);
//  console.log(weight);
  return weight ?? pointB.basePrice - pointA.basePrice;
};

const sortPointDate = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
 console.log(dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom)));
 // return weight ?? dayjs(pointB.dateFrom).diff(pointA.dateFrom);
  return weight ?? dayjs(pointB.dateFrom)-(dayjs(pointA.dateFrom));
};

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.dateFrom) > dayjs().toDate()),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs(point.dateFrom) <= dayjs().toDate()),
};
export {
  getRandomPositiveInteger,
  humanizeTaskDueDate,
  dateDiff,
  getShuffleArray,
  toUpperFirst,
  updateItem,
  sortPointTimeDown,
  sortPointPriceDown,
  sortPointDate,
  filter
};
