import { useEffect, useRef, useState } from "react";

import SuperVizRoom, { LauncherFacade } from "@superviz/sdk";
import { ThreeJsPin } from "@superviz/threejs-plugin";
import { Comments } from "@superviz/sdk/lib/components/index.js";
import { EnvironmentTypes } from "@superviz/sdk/lib/common/types/sdk-options.types";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

interface Props {
  name: string;
  roomId: string;
  toggle: () => void;
}

export default function ThreeJSContainer({ name, roomId, toggle }: Props) {
  const participantId = name.toLowerCase();
  const containerId = participantId + "-participant";
  const groupId = "sv-sample-room-react-ts-contextual-comments-threejs";
  const groupName = "Sample Room with Contextual Comments for ThreeJS (React/TS)";

  console.log("AutodeskInstance", name, roomId);
  const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

  const ref = useRef<any>(null);
  const [room, setRoom] = useState<LauncherFacade>();
  const loaded = useRef(false);

  function InitParticipantThreeJS() {
    const container = document.getElementById(containerId) as HTMLElement;
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
      (gltf: { scene: THREE.Object3D }) => {
        scene.add(gltf.scene);
        InitSuperVizRoomWithThreeJS(scene, camera, renderer);
        animate();
      },
      undefined,
      (e: any) => console.error(e)
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      renderer.render(scene, camera);
    };

    animate();
  }

  async function InitSuperVizRoomWithThreeJS(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) {
    // This line is only for demonstration purpose. You can use any avatar you want.
    const avatarImageForParticipant = name == "Hera" ? "2" : "5";

    const room = await SuperVizRoom(DEVELOPER_KEY, {
      roomId: roomId,
      group: {
        id: groupId,
        name: groupName,
      },
      participant: {
        id: participantId,
        name: name,
        avatar: {
          imageUrl: `https://production.cdn.superviz.com/static/default-avatars/${avatarImageForParticipant}.png`,
          model3DUrl: `https://production.storage.superviz.com/readyplayerme/${avatarImageForParticipant}.glb`,
        },
      },
      environment: "dev" as EnvironmentTypes,
    });

    const pinAdapter = new ThreeJsPin(scene, renderer, camera);
    const comments = new Comments(pinAdapter, {
      buttonLocation: `top-left`,
      position: "left",
    });

    room.addComponent(comments);
    setRoom(room);
  }

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    InitParticipantThreeJS();
  }, [loaded]);

  const changeParticipant = () => {
    if (room) {
      room.destroy();
      toggle();
    }
  };
  return (
    <>
      <button onClick={changeParticipant}>Change participant</button>
      <h1>View from "{name}" participant</h1>
      <canvas id={containerId} ref={ref} />
    </>
  );
}
