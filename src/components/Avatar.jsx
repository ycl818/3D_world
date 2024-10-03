import { useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { pb, useCongfiguratorStore } from "../store";
import Asset from "./Asset";

const Avatar = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/models/Armature.glb");
  const customization = useCongfiguratorStore((state) => state.customization);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          {Object.keys(customization).map(
            (key) =>
              customization[key]?.asset?.url && (
                <Suspense key={customization[key].asset.id}>
                  <Asset
                    url={pb.files.getUrl(
                      customization[key].asset,
                      customization[key].asset.url
                    )}
                    skeleton={nodes.Plane.skeleton}
                  />
                </Suspense>
              )
          )}
        </group>
      </group>
    </group>
  );
};

export default Avatar;
