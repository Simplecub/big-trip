

const offersType = ["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"]
const offersByType = () => (
  {
    type: "taxi",
    offers: offersType[2]
  }
)

export const getOffer = () => (

  {
    id: 1,
    title: "Upgrade to a business class",
    price: 120
  }
)
