import { PropertyStore } from "@/types/type";
import { create } from "zustand";
import { mockProperties } from "@/mock/mockProperties";
import {
  searchPropertiesByCityId,
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
      set({ properties: filtered });
    } catch (error) {
      console.error("Failed to fetch LoopNet properties", error);
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
