import { create } from "zustand";

import PocketBase from "pocketbase";

const pocketBaseUrl = import.meta.env.VITE_POCKETBASE_URL;
if (!pocketBaseUrl) {
  throw new Error("VITE_POCKET_BASE_URL is not set");
}

export const pb = new PocketBase(pocketBaseUrl);

export const useConfiguratorStore = create((set) => ({
  categories: [],
  currentCategory: null,
  assets: [],
  customization: {},
  download: () => {},
  setDownload: (download) => set({ download }), // replace with new download function
  updateColor: (color) => {
    set((state) => ({
      customization: {
        ...state.customization,
        [state.currentCategory.name]: {
          ...state.customization[state.currentCategory.name],
          color,
        },
      },
    }));
  },
  fetchCategories: async () => {
    const categories = await pb.collection("CustomizationGroups").getFullList({
      sort: "+position",
      expand: "colorPalette",
    });

    const assets = await pb.collection("CustomizationAssets").getFullList({
      sort: "-created",
    });

    const customization = {};
    categories.forEach((category) => {
      category.assets = assets.filter((asset) => asset.group === category.id);
      customization[category.name] = {
        color: category.expand?.colorPalette?.colors?.[0] || "",
      };

      if (category.startingAsset) {
        customization[category.name].asset = category.assets.find(
          (asset) => asset.id === category.startingAsset
        );
      }
    });

    set({ categories, currentCategory: categories[0], assets, customization });
  },
  setCurrentCategory: (category) => set({ currentCategory: category }),
  changeAsset: (category, asset) =>
    set((state) => ({
      customization: {
        ...state.customization,
        [category]: {
          ...state.customization[category],
          asset: asset,
        },
      },
    })),
}));
