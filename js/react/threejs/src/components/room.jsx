import { ThreeJsPresence, useSuperVizRoom } from "@superviz/react-sdk";
import { useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const containerId = 'threejs-canvas'
export default function ThreeJSInstance() {
  const { startRoom, stopRoom, hasJoinedRoom } = useSuperVizRoom();
  const canvasRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [player, setPlayer] = useState(null);

  useEffect(()=> {
    if (!canvasRef.current) return;
    InitParticipantThreeJS();
  }, [canvasRef])

  function InitParticipantThreeJS() {
    const container = document.getElementById(containerId);
    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas: container, antialias: true });
    renderer.setSize(width, height);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xb6b7b8);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 300);
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

  useEffect(() => {
    if (!startRoom || hasJoinedRoom) return;

    startRoom();

    return () => {
      if (!stopRoom || !hasJoinedRoom) return;

      stopRoom();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <ThreeJsPresence
        scene={scene}
        camera={camera}
        player={player}
      >
        <canvas ref={canvasRef} id={containerId} />
      </ThreeJsPresence>
    </section>
  );
}
