export type Review = {
  id: number;
  name: string;
  source: string;
  text: string;
  image: string;
  lineOne: string;
  lineTwo: string;
};

export const reviews: Review[] = [
  {
    id: 1,
    name: "Aline Uwase",
    source: "Facebook",
    text: "Trekking to see the mountain gorillas in Volcanoes National Park was the highlight of our year. Our guide knew every trail and made the whole day feel safe and unhurried.",
    image: "/images/gorillas.jpg",
    lineOne: "Trek Through",
    lineTwo: "Volcanoes",
  },
  {
    id: 2,
    name: "Jean Claude Habimana",
    source: "Google",
    text: "We booked a three-day trip around Lake Kivu and everything ran on time, from the pickup in Kigali to the boat ride at sunset. Great value for the price.",
    image: "/images/lake-kivu.jpg",
    lineOne: "Relax By",
    lineTwo: "Lake Kivu",
  },
  {
    id: 3,
    name: "Claudine Mukamana",
    source: "Facebook",
    text: "Akagera at sunrise, with lions, giraffes and hippos in one morning. The team handled every detail, so we could just enjoy it.",
    image: "/images/akagera.jpg",
    lineOne: "Sunrise In",
    lineTwo: "Akagera",
  },
  {
    id: 4,
    name: "Eric Niyonzima",
    source: "TripAdvisor",
    text: "Nyungwe's canopy walk was unforgettable. Friendly staff, clear communication before the trip, and no hidden costs at the end.",
    image: "/images/nyungwe.jpg",
    lineOne: "Walk The",
    lineTwo: "Canopy",
  },
];