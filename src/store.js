import { create } from "zustand";

import PocketBase from "pocketbase";

const pocketBaseUrl = import.meta.env.VITE_POCKET_BASE_URL;
if (!pocketBaseUrl) {
  throw new Error("VITE_POCKET_BASE_URL is not set");
}

const pb = new PocketBase(pocketBaseUrl);

export const useCongfiguratorStore = create((set) => ({
  categories: [],
  currentCategory: null,
  assets: [],
  fetchCategories: async () => {
    const categories = await pb.collection("CustomizationGroups").getFullList({
      sort: "+position",
    });

    const assets = await pb.collection("CustomizationAssets").getFullList({
      sort: "-created",
    });

    set({ categories, currentCategory: categories[0], assets });
  },
  setCurrentCategory: (category) => set({ currentCategory: category }),
}));
