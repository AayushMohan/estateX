export interface MockAgent {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface MockReview {
  $id: string;
  name: string;
  avatar: string;
  review: string;
  rating: number;
  $createdAt: string;
}

export interface MockGalleryItem {
  $id: string;
  image: string;
}

export interface MockProperty {
  $id: string;
  name: string;
  description: string;
  address: string;
  geolocation: string;
  image: string;
  price: number;
  rating: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  facilities: string[];
  gallery: MockGalleryItem[];
  reviews: MockReview[];
  agent: MockAgent;
  $createdAt: string;
}

export interface MockUser {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

const galleryImages = [
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585153490-76fb20a32601?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551241090-67de81d3541c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521783593447-5702bf07fa13?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591170715506-755228d87ebb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=800&auto=format&fit=crop",
];

const agentProfiles: MockAgent[] = [
  {
    $id: "agent-01",
    name: "Amelia Clarke",
    email: "amelia.clarke@estatex.com",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400&auto=format&fit=crop",
  },
  {
    $id: "agent-02",
    name: "Jordan Miles",
    email: "jordan.miles@estatex.com",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=400&auto=format&fit=crop",
  },
  {
    $id: "agent-03",
    name: "Sophia Keller",
    email: "sophia.keller@estatex.com",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
  },
];

const reviewPool = [
  {
    $id: "review-01",
    name: "Liam Torres",
    avatar:
      "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?q=80&w=400&auto=format&fit=crop",
    review:
      "The space is bright, airy, and perfectly located for anyone who wants quick access to the city center.",
    rating: 5,
  },
  {
    $id: "review-02",
    name: "Nora Patel",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
    review:
      "Loved the open floor plan and the tailored amenities. The building feels brand new.",
    rating: 4,
  },
  {
    $id: "review-03",
    name: "Evan Brooks",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=400&auto=format&fit=crop",
    review:
      "Peaceful neighborhood with stunning skyline views. The concierge team is incredibly helpful.",
    rating: 5,
  },
  {
    $id: "review-04",
    name: "Maya Flores",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    review:
      "Great natural light, cozy bedrooms, and a kitchen that makes you want to cook every day.",
    rating: 4,
  },
  {
    $id: "review-05",
    name: "Harper Lee",
    avatar:
      "https://images.unsplash.com/photo-1521579971123-1192931a1452?q=80&w=400&auto=format&fit=crop",
    review:
      "The rooftop terrace sold us on this place. Perfect for evening gatherings.",
    rating: 5,
  },
];

const takeCyclic = <T>(source: T[], start: number, count: number): T[] =>
  Array.from(
    { length: count },
    (_, index) => source[(start + index) % source.length]
  );

const createGallery = (seed: number, count = 5): MockGalleryItem[] =>
  takeCyclic(galleryImages, seed, count).map((image, index) => ({
    $id: `gallery-${seed}-${index}`,
    image,
  }));

const createReviews = (seed: number, count = 3): MockReview[] =>
  takeCyclic(reviewPool, seed, count).map((review, index) => ({
    ...review,
    $id: `${review.$id}-${seed}-${index}`,
    $createdAt: new Date(
      Date.now() - (seed * 6 + index) * 60 * 60 * 1000
    ).toISOString(),
  }));

const propertySeed: Array<
  Omit<MockProperty, "gallery" | "reviews" | "agent" | "$createdAt">
> = [
  {
    $id: "property-01",
    name: "Skyline Retreat",
    description:
      "Flooded with daylight, this open-plan home pairs oak finishes with smart climate control for year-round comfort.",
    address: "18 Hudson Ave, New York",
    geolocation: "40.7128,-74.0060",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop",
    price: 4200,
    rating: 4.9,
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: 2100,
    facilities: ["Laundry", "Car Parking", "Wifi", "Gym"],
  },
  {
    $id: "property-02",
    name: "Harborview Loft",
    description:
      "Industrial textures meet boutique lighting in this waterfront condo with wraparound glazing.",
    address: "22 Embarcadero, San Francisco",
    geolocation: "37.7955,-122.3937",
    image:
      "https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?q=80&w=1200&auto=format&fit=crop",
    price: 3650,
    rating: 4.7,
    type: "Apartments",
    bedrooms: 2,
    bathrooms: 2,
    area: 1350,
    facilities: ["Laundry", "Wifi", "Swimming pool", "Pet Center"],
  },
  {
    $id: "property-03",
    name: "Crescent Villa",
    description:
      "A Mediterranean-inspired villa with vaulted ceilings, private spa, and lush outdoor dining zones.",
    address: "9 Palm Grove, Miami",
    geolocation: "25.7617,-80.1918",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
    price: 5100,
    rating: 4.8,
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 3200,
    facilities: ["Swimming pool", "Gym", "Car Parking", "Cutlery"],
  },
  {
    $id: "property-04",
    name: "Summit Heights",
    description:
      "Mountain-facing townhome with radiant heating, double-height living room, and cedar detailing.",
    address: "44 Pinecrest Rd, Denver",
    geolocation: "39.7392,-104.9903",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
    price: 2950,
    rating: 4.5,
    type: "Townhomes",
    bedrooms: 3,
    bathrooms: 3,
    area: 1850,
    facilities: ["Car Parking", "Wifi", "Pet Center", "Laundry"],
  },
  {
    $id: "property-05",
    name: "Willow Creek Residence",
    description:
      "A duplex wrapped in glass with a private courtyard garden and bespoke chef's kitchen.",
    address: "203 Lakeside Dr, Seattle",
    geolocation: "47.6062,-122.3321",
    image:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1200&auto=format&fit=crop",
    price: 3325,
    rating: 4.6,
    type: "Duplexes",
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    facilities: ["Laundry", "Sports Center", "Wifi", "Cutlery"],
  },
  {
    $id: "property-06",
    name: "Aurora Studios",
    description:
      "Nordic-inspired micro studios featuring modular storage, acoustic panels, and a shared rooftop cinema.",
    address: "77 King St, Toronto",
    geolocation: "43.6532,-79.3832",
    image:
      "https://images.unsplash.com/photo-1630694098156-434cbbdfeaf1?q=80&w=1200&auto=format&fit=crop",
    price: 2400,
    rating: 4.3,
    type: "Studios",
    bedrooms: 1,
    bathrooms: 1,
    area: 720,
    facilities: ["Wifi", "Gym", "Laundry", "Cutlery"],
  },
];

export const mockProperties: MockProperty[] = propertySeed.map(
  (property, index) => ({
    ...property,
    $createdAt: new Date(
      Date.now() - index * 24 * 60 * 60 * 1000
    ).toISOString(),
    agent: agentProfiles[index % agentProfiles.length],
    gallery: createGallery(index),
    reviews: createReviews(index),
  })
);

export const mockUser: MockUser = {
  $id: "user-01",
  name: "Alex Rivers",
  email: "alex.rivers@estatex.com",
  avatar:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
};
