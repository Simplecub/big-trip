import dayjs from 'dayjs';
const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

const getRandomPositiveInteger = (a= 0, b = 1) =>{
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const humanizeTaskDueDate  = (dueDate, format) => dayjs(dueDate).format(format);
const dateDiff = (date1, date2) => {
  let res = ''
  let dayDiff = dayjs.duration(dayjs(date2).diff(dayjs(date1))).format(`DD`);
  let hoursDiff = dayjs.duration(dayjs(date2).diff(dayjs(date1))).format(`HH`);
  let minDiff = dayjs.duration(dayjs(date2).diff(dayjs(date1))).format(`mm`);
  if (dayDiff !== '00') {res += dayDiff + 'D'}
  if (hoursDiff !== '00') {res += hoursDiff + 'H'}
  if (minDiff !== '00') {res += minDiff + 'M'}
  return res
}
//перемешивает массив, возвращет нужное число элементов массива
const getShuffleArray = (arr, length) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor((Math.random()) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, length);
};
export {getRandomPositiveInteger, humanizeTaskDueDate, dateDiff, getShuffleArray}
