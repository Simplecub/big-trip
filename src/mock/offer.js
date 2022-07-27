

const OFFER_TYPE = ["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"]
const OFFERS_OF_TYPE = {
  "taxi": [1, 11, 111, 1111],
  "bus": [2,22,222,2222],
  "train": [3, 33, 333, 3333],

}








const offersByType = () => (
  {
    type: OFFER_TYPE[2],
    offers: Object.values(OFFER_TYPE[2])
  }
)

export const getOffer = () => (
  {
    id: 1,
    title: "Upgrade to a business class",
    price: 120
  }
)
