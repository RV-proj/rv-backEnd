// NOTE test data

const reviews = [
  {
    id: 1,
    review:
      "Picked 'Large' for our Derby weekend and got a spotless XL with bunk room. Setup was flawless and support answered at 11pm when we had a power question.",
    userName: "Danielle R.",
  },
  {
    id: 2,
    review:
      "Corporate tailgate. Flex+ found a perfect match in 2 hours. Price was under what we budgeted and the team handled every detail.",
    userName: "Michael S.",
  },
  {
    id: 3,
    review:
      "Insurance rental during home repairs. Delivery every month, extensions were easy. Truly grateful for the comfort and service.",
    userName: "The Nguyen Family",
  },
];

// get
function getAllReviews() {
  return reviews;
}

export default { getAllReviews };
