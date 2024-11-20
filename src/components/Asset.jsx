// each asset could compose of multiple meshes
// 3D asset doesn't know that its parent will be an Armature with bones
// we doesn't know how many meshes each asset has
// we need to map the scene to know the number of meshes in an asset

import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { useConfiguratorStore } from "../store";

const Asset = ({ url, skeleton, categoryName }) => {
  const { scene } = useGLTF(url);

  const customization = useConfiguratorStore((state) => state.customization);

  const assetColor = customization[categoryName].color;

  const skin = useConfiguratorStore((state) => state.skin);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.material?.name.includes("Color_")) {
          child.material.color.set(assetColor);
        }
      }
    });
  }, [scene, assetColor]);

  const attachedItems = useMemo(() => {
    const items = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        items.push({
          geometry: child.geometry,
          material: child.material.name.includes("Skin_")
            ? skin
            : child.material,
        });
      }
    });
    return items;
  }, [scene]);

  return attachedItems.map((item, index) => (
    <skinnedMesh
      key={index}
      geometry={item.geometry}
      material={item.material}
      skeleton={skeleton}
      castShadow // for better look
      receiveShadow
    />
  ));
};

export default Asset;
