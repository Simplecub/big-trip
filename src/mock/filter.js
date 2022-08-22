

const FILTER =
  [ 'everything', 'future', 'past']



export const generateFilter = () =>FILTER.map((filterName) => ({
  name: filterName,
  count: 10500
  })
)
console.log(generateFilter())
