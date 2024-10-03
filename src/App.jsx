import { Canvas } from "@react-three/fiber";
import UI from "./components/UI";
import Experience from "./components/Experience";

function App() {
  return (
    <>
      <UI />
      <Canvas
        camera={{
          position: [3, 3, 3],
        }}
      >
        <color attach="background" args={["#333333"]} />

        <Experience />
      </Canvas>
    </>
  );
}

export default App;
