import React, { useEffect } from "react";
import { pb, useConfiguratorStore } from "../store";

const AssetBox = () => {
  const {
    categories,
    currentCategory,
    setCurrentCategory,
    fetchCategories,
    customization,
    changeAsset,
  } = useConfiguratorStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="rounded-t-lg bg-gradient-to-br from-black/30 to indigo-900/20 backdrop-blur-sm drop-shadow-md p-6 gap-6 flex flex-col">
      <div className="flex items-center gap-8 pointer-events-auto overflow-x-auto noscrollbar px-6 pb-2">
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => setCurrentCategory(category)}
            className={`transition-colors duration-200 font-medium flex-shrink-0 border-b ${
              currentCategory.name === category.name
                ? "text-white shadow-purple-199 border-b-white"
                : "text-gray-400 hover:text-gray-500 border-b-transparent"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {currentCategory?.assets?.map((asset) => (
          <button
            key={asset.thumbnail}
            onClick={() => changeAsset(currentCategory.name, asset)}
            className={`w-20 h-20 rounded-md overflow-hidden bg-gray-200
            pointer-events-auto hover:opacity-100 transition-all duration-500
            border-2 
            ${
              customization[currentCategory.name]?.asset?.id === asset.id
                ? "border-indigo-600 opacity-100"
                : "opacity-70 border-transparent"
            }`}
          >
            <img src={pb.files.getUrl(asset, asset.thumbnail)} />
          </button>
        ))}
      </div>
    </div>
  );
};
const DownloadButton = () => {
  const download = useConfiguratorStore((state) => state.download);

  return (
    <button
      className="rounded-lg bg-indigo-500 hover:bg-indigo-600 trnasition-colors duration-300
    text-white font-medium px-4 py-3 pointer-events-auto
    "
      onClick={download}
    >
      Download
    </button>
  );
};

const UI = () => {
  return (
    <main className="pointer-events-none fixed z-10 inset-0 select-none">
      <div className="mx-auto h-full max-w-screen-xl w-full flex flex-col justify-between">
        <div className="flex justify-between items-center p-10">
          <img className="w-20" src="/images/Creator.png" />
          <DownloadButton />
        </div>
        <div className="px-10 flex flex-col ">
          <AssetBox />
        </div>
      </div>
    </main>
  );
};

export default UI;
