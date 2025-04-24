import { PropertyStore } from "@/types/type";
import { create } from "zustand";
import axios from "axios";
import { mockProperties } from "@/mock/mockProperties";

export const usePropertyStore = create<PropertyStore>((set) => ({
  properties: [],
  fetchMockProperties: () => {
    set({ properties: mockProperties });
  },
}));
