import { Comments, useThreeJsPin } from "@superviz/react-sdk";


import { useEffect, useRef } from "react";

import { Color, PerspectiveCamera, PMREMGenerator, Scene, WebGLRenderer, type Camera, type Object3D, type Object3DEventMap } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export default function ThreeJSInstance() {
  const sceneRef = useRef<Scene>();
  const cameraRef = useRef<Camera>();
  const playerRef = useRef<Object3D<Object3DEventMap>>();
  const rendererRef = useRef<WebGLRenderer>();
  
  const { pin } = useThreeJsPin({
    camera: cameraRef.current!,
    scene: sceneRef.current!, 
    player: playerRef.current!, 
    renderer: rendererRef.current!
  });

  useEffect(()=> {
    InitParticipantThreeJS();
  }, [])

  function InitParticipantThreeJS() {
    const container = document.getElementById('threejs-canvas') as HTMLCanvasElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new WebGLRenderer({ canvas: container, antialias: true });
    rendererRef.current = renderer;

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
    sceneRef.current = scene;
    cameraRef.current = camera;
    playerRef.current = camera;
  }

  return <Comments pin={pin} />
}
