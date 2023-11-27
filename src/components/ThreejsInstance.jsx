import SuperVizRoom from "@superviz/sdk";
import { ThreeJsPin } from "@superviz/threejs-plugin";
import { Comments } from "@superviz/sdk/lib/components/index.js";

import * as THREE from "three";
import { RoomEnvironment } from "../../vendor/threejs/examples/jsm/environments/RoomEnvironment.js";
import { OrbitControls } from "../../vendor/threejs/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "../../vendor/threejs/examples/jsm/loaders/GLTFLoader.js";
import { useEffect, useRef, useState } from "react";

const groupId = "sv-sample-room-react-js-threejs-contextual-comments";
const groupName = "Sample Room for ThreeJS with Contextual Comments (React/JS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

export default function ThreeJSInstance({ name, roomId, toggle, position }) {
  const userId = name.toLowerCase();
  const containerId = userId + "-participant";
  const ref = useRef(null);
  const [room, setRoom] = useState();
  const loaded = useRef(false);

  function InitParticipantThreeJS() {
    const participantId = name.toLowerCase();

    const container = document.getElementById(participantId + "-participant");
    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas: container, antialias: true });
    // renderer.outputEncoding = THREE.sRGBEncoding;
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
        InitSuperVizRoomWithThreeJS(scene, camera, renderer);
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
  }

  async function InitSuperVizRoomWithThreeJS(scene, camera, renderer) {
    // This line is only for demonstration purpose. You can use any avatar you want.
    const avatarImageForParticipant = name == "Hera" ? "2" : "5";

    const room = await SuperVizRoom(DEVELOPER_KEY, {
      roomId: roomId,
      group: {
        id: groupId,
        name: groupName,
      },
      participant: {
        id: name.toLowerCase(),
        name: name,
        avatar: {
          imageUrl: `https://production.cdn.superviz.com/static/default-avatars/${avatarImageForParticipant}.png`,
          model3DUrl: `https://production.storage.superviz.com/readyplayerme/${avatarImageForParticipant}.glb`,
        },
      },
      environment: "dev",
    });

    const oppositeSide = position == "left" ? "right" : "left";

    const pinAdapter = new ThreeJsPin(scene, renderer, camera);
    const comments = new Comments(pinAdapter, {
      buttonLocation: `top-${position}`,
      position: oppositeSide,
    });

    room.addComponent(comments);
    setRoom(room);
  }

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    InitParticipantThreeJS();
  }, []);

  const destroy = () => {
    if (room) {
      room.destroy();
      toggle();
    }
  };
  return (
    <>
      <button onClick={destroy}>Change participant</button>
      <section>
        <h1>View from "{name}" participant</h1>
        <span className={position}>
          <canvas id={containerId} ref={ref} />
        </span>
      </section>
    </>
  );
}
