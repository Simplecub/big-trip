import dayjs from 'dayjs';

const getRandomPositiveInteger = (a= 0, b = 1) =>{
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const humanizeTaskDueDate  = (dueDate, format) => {dayjs(dueDate).format(format)}


export {getRandomPositiveInteger, humanizeTaskDueDate}
