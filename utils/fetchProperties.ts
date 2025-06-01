import axios from "axios";
import Constants from "expo-constants";

const loopnetApiKey = Constants.expoConfig?.extra?.loopnetApiKey;

// export const fetchLoopNetProperties = async (locationId: string = "41096") => {
//   const options = {
//     method: "POST",
//     url: "https://loopnet-api.p.rapidapi.com/loopnet/sale/advanceSearch",
//     headers: {
//       "x-rapidapi-key": loopnetApiKey,
//       "x-rapidapi-host": "loopnet-api.p.rapidapi.com",
//       "Content-Type": "application/json",
//     },
//     data: {
//       locationId,
//       locationType: "city",
//       page: 1,
//       size: 20,
//       auctions: false,
//     },
//   };

//   async function fetchData() {
//     try {
//       const response = await axios.request(options);
//       //Doesn't reach here.
//       console.log("Data: ", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("axio.request(options) not working: ", error);
//     }
//   }

//   fetchData();
//   // const response = await axios.request(options);
// };

const HEADERS = {
  "x-rapidapi-key": loopnetApiKey,
  "x-rapidapi-host": "loopnet-api.p.rapidapi.com",
  "Content-Type": "application/json",
};

// 1. Search listings by city (returns listing IDs)
export const searchPropertiesByCityId = async (cityId: string, page = 1) => {
  try {
    const response = await axios.post(
      "https://loopnet-api.p.rapidapi.com/loopnet/sale/searchByCity",
      { cityId, page },
      { headers: HEADERS },
    );

    const listings = response.data?.data || [];
    const listingIds = listings
      .map((listing: any) => listing.listingId)
      .slice(0, 10);
    //save coordinates too

    return listingIds;
  } catch (error) {
    console.error("Error fetching city listings:", error);
    return [];
  }
};

// 2. Get extended property details
export const getExtendedPropertyDetails = async (listingId: number) => {
  try {
    const response = await axios.post(
      "https://loopnet-api.p.rapidapi.com/loopnet/property/ExtendedDetails",
      { listingId },
      { headers: HEADERS },
    );
    return response.data?.data || response.data;
  } catch (error) {
    console.error(`Error fetching details for ID ${listingId}:`, error);
    return null;
  }
};

// 3. Search listings by coordinates
export const searchPropertiesByCoordinates = async (
  latitude: number,
  longitude: number,
  distance = 5,
  page = 1,
) => {
  try {
    const response = await axios.post(
      "https://loopnet-api.p.rapidapi.com/loopnet/sale/searchByCoordination",
      {
        coordination: [longitude, latitude],
        distance,
        page,
      },
      { headers: HEADERS },
    );

    const listings = response.data?.data || [];
    const listingsWithCoordinates = listings
      .map((listing: any) => ({
        listingId: listing.listingId,
        coordinates: {
          lng: listing.coordinations?.[0] ?? null,
          lat: listing.coordinations?.[1] ?? null,
        },
      }))
      .slice(0, 10);

    return listingsWithCoordinates;
  } catch (error) {
    console.error("Error fetching listings by coordinates:", error);
    return [];
  }
};
