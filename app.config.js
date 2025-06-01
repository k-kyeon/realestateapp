// app.config.js
import "dotenv/config";

export default {
  expo: {
    name: "Real Estate",
    slug: "real-estate-app",
    version: "1.0.0",
    extra: {
      loopnetApiKey: process.env.RAPID_API_KEY,
      googleApiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
    },
  },
};
