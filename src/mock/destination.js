import {CITY, DESCRIPTION} from './const.js';
import {getShuffleArray, getRandomPositiveInteger} from '../util.js';
let id = 0
export const getDestination = () => {
  id += 1
  return {
    id,
    description: `${getShuffleArray(DESCRIPTION.split('. '), getRandomPositiveInteger(1, DESCRIPTION.split('. ').length))}`,
    name: `${getShuffleArray(CITY, 1)}`,
    pictures: [
      {
       src: `http://picsum.photos/248/152?r=${getRandomPositiveInteger(1, 1000)}`,
      //  src: `https://loremflickr.com/320/240?lock=${getRandomPositiveInteger(1, 1000)}`,
          description: `Chamonix parliament building`
      }
    ]
  }
}

