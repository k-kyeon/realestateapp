import axios from "axios";
import Constants from "expo-constants";

const loopnetApiKey = Constants.expoConfig?.extra?.loopnetApiKey;

export const fetchLoopNetProperties = async (locationId: string = "41096") => {
  const options = {
    method: "POST",
    url: "https://loopnet-api.p.rapidapi.com/loopnet/sale/advanceSearch",
    headers: {
      "x-rapidapi-key": loopnetApiKey,
      "x-rapidapi-host": "loopnet-api.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      locationId,
      locationType: "city",
      page: 1,
      size: 20,
      auctions: false,
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      //Doesn't reach here.
      console.log("Data: ", response.data);
      return response.data;
    } catch (error) {
      console.error("axio.request(options) not working: ", error);
    }
  }

  fetchData();
  // const response = await axios.request(options);
};
