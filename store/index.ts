import { PropertyStore } from "@/types/type";
import { create } from "zustand";
import { mockProperties } from "@/mock/mockProperties";
import {
  searchPropertiesByCityId,
  searchPropertiesByCoordinates,
  getExtendedPropertyDetails,
} from "@/utils/fetchProperties";

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  properties: [],
  fetchMockProperties: () => {
    set({ properties: mockProperties });
  },
  fetchProperties: async (cityId = "11854") => {
    try {
      const listingIds = await searchPropertiesByCityId(cityId);

      const details = await Promise.all(
        listingIds.map((id: any) => getExtendedPropertyDetails(id)),
      );

      const filtered = details.filter((item) => item !== null);
      set({ properties: filtered.flat() });
    } catch (error) {
      console.error("Failed to fetch LoopNet properties", error);
    }
  },
  fetchPropertiesByCoordinates: async (latitude: number, longitude: number) => {
    try {
      const listingsWithCoordinates = await searchPropertiesByCoordinates(
        latitude,
        longitude,
      );

      // const details = await Promise.all(
      //   listingsWithCoordinates.map((listing: any) =>
      //     getExtendedPropertyDetails(listing.listingId),
      //   ),
      // );
      const details = await Promise.all(
        listingsWithCoordinates.map(
          (listing: {
            listingId: any;
            coordinates: { latitude: number; longitude: number };
          }) =>
            getExtendedPropertyDetails(listing.listingId).then((property) => {
              if (property) {
                property.coordinates = {
                  lat: listing.coordinates.latitude,
                  lng: listing.coordinates.longitude,
                };
              }
              return property;
            }),
        ),
      );

      const filtered = details.filter((item) => item !== null);
      set({ properties: filtered.flat() });
    } catch (error) {
      console.error("Failed to fetch properties by coordinates:", error);
    }
  },
  likedProperties: [],
  likeProperty: async (property) => {
    const { likedProperties } = get();
    const alreadyLiked = likedProperties.some(
      (p) => p.listingId === property.listingId,
    );
    if (!alreadyLiked) {
      set({
        likedProperties: [...likedProperties, property],
      });
    }
    // also save to NeonDB
  },
  unlikeProperty: async (listingId: number) => {
    const { likedProperties } = get();
    set({
      likedProperties: likedProperties.filter((p) => p.listingId !== listingId),
    });
    // also delete from NeonDB
  },
  fetchLikedProperties: async (_userId: string) => {
    // In real app: fetch liked properties from NeonDB using userId
    // For now we do nothing since likedProperties are already local
  },
}));
