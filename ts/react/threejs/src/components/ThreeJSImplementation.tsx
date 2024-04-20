import { ThreeJsPresence } from "@superviz/react-sdk";
import { useEffect, useRef, useState } from "react";

import {
  Color,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  WebGLRenderer,
  type Camera,
  type Object3D,
  type Object3DEventMap,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const containerId = "threejs-canvas";
export default function ThreeJSImplementation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scene, setScene] = useState<Scene>();
  const [camera, setCamera] = useState<Camera>();
  const [player, setPlayer] = useState<Object3D<Object3DEventMap>>();

  useEffect(() => {
    if (!canvasRef.current) return;
    InitParticipantThreeJS();
  }, [canvasRef]);

  function InitParticipantThreeJS() {
    const container = document.getElementById(containerId) as HTMLCanvasElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new WebGLRenderer({ canvas: container, antialias: true });
    renderer.setSize(width, height);

    const pmremGenerator = new PMREMGenerator(renderer);
    const scene = new Scene();
    scene.background = new Color(0xb6b7b8);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    const camera = new PerspectiveCamera(60, width / height, 0.1, 300);
    camera.position.set(2, 0, 2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;

    const loader = new GLTFLoader();
    loader.load(
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GlamVelvetSofa/glTF-Binary/GlamVelvetSofa.glb",
      (gltf) => {
        scene.add(gltf.scene);
        animate();
      },
      undefined,
      (e) => console.error(e)
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      renderer.render(scene, camera);
    };

    animate();
    setScene(scene);
    setCamera(camera);
    setPlayer(camera);
  }

  return (
    <section>
      <ThreeJsPresence scene={scene!} camera={camera!} player={player!}>
        <canvas ref={canvasRef} id={containerId} />
      </ThreeJsPresence>
    </section>
  );
}
