import { PropertyStore } from "@/types/type";
import { create } from "zustand";
import axios from "axios";
import { mockProperties } from "@/mock/mockProperties";

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  properties: [],
  fetchMockProperties: () => {
    set({ properties: mockProperties });
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
  unlikeProperty: async (listingId: string) => {
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
