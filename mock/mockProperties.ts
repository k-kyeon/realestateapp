import { LoopNetProperty } from "@/types/type";

export const mockProperties: LoopNetProperty[] = [
  {
    listingId: "LN123456",
    title: "Modern Office Space Downtown",
    description: "A spacious and modern office space in the heart of the city.",
    price: 1200000,
    propertyType: "Office",
    address: {
      street: "123 Business Ave",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90015",
      country: "USA",
    },
    coordinates: {
      lat: 34.0456,
      lng: -118.2567,
    },
    images: [
      "https://example.com/images/office1.jpg",
      "https://example.com/images/office2.jpg",
    ],
    broker: {
      name: "Jane Smith",
      phone: "555-123-4567",
      email: "jane.smith@realestateco.com",
    },
    bedrooms: 2,
    bathrooms: 3,
    square_ft: 2000,
  },
  {
    listingId: "LN654321",
    title: "Retail Space in Prime Location",
    description: "High-traffic location ideal for retail business.",
    price: 800000,
    propertyType: "Apartment",
    address: {
      street: "456 Market St",
      city: "San Francisco",
      state: "CA",
      postalCode: "94103",
      country: "USA",
    },
    coordinates: {
      lat: 37.7749,
      lng: -122.4194,
    },
    images: [
      "https://example.com/images/retail1.jpg",
      "https://example.com/images/retail2.jpg",
    ],
    broker: {
      name: "John Doe",
      phone: "555-987-6543",
      email: "john.doe@commercialprop.com",
    },
    bedrooms: 1.5,
    bathrooms: 2,
    square_ft: 1000,
  },
  {
    listingId: "LN642321",
    title: "Retail Space in Super Location",
    description: "Low-traffic location ideal for quiet business.",
    price: 300000,
    propertyType: "Villa",
    address: {
      street: "252 Hope St",
      city: "Los Angeles",
      state: "CA",
      postalCode: "91111",
      country: "USA",
    },
    coordinates: {
      lat: 32.7469,
      lng: -102.4294,
    },
    images: [
      "https://example.com/images/retail1.jpg",
      "https://example.com/images/retail2.jpg",
    ],
    broker: {
      name: "James Dee",
      phone: "222-453-6577",
      email: "james.dee@commercialprop.com",
    },
    bedrooms: 2,
    bathrooms: 2,
    square_ft: 1500,
  },
];
