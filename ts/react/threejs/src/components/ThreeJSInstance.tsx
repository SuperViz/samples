import SuperVizRoom from "@superviz/sdk";
import { Presence3D } from "@superviz/threejs-plugin";

import * as THREE from "three";
import { RoomEnvironment } from "../../vendor/threejs/examples/jsm/environments/RoomEnvironment.js";
import { OrbitControls } from "../../vendor/threejs/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "../../vendor/threejs/examples/jsm/loaders/GLTFLoader.js";
import { useEffect, useRef } from "react";
import { BaseComponent } from "@superviz/sdk/lib/components/base/index.js";
import { EnvironmentTypes } from "@superviz/sdk/lib/common/types/sdk-options.types.js";

const groupId = "sv-sample-room-react-ts-presence3d-three-js";
const groupName = "Sample Room for Presence3D for ThreeJS (React/TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

function InitParticipantThreeJS(participantName: string, roomId: string) {
  const participantId = participantName.toLowerCase();

  const container = document.getElementById(participantId + "-participant") as HTMLElement;
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
    (gltf: { scene: THREE.Object3D }) => {
      scene.add(gltf.scene);
      InitSuperVizRoomWithThreeJS(scene, camera, participantName, roomId);
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
  participant: string,
  roomId: string
) {
  // This line is only for demonstration purpose. You can use any avatar you want.
  const avatarImageForParticipant = participant == "Hera" ? "2" : "5";

  const room = await SuperVizRoom(DEVELOPER_KEY, {
    roomId: roomId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: participant.toLowerCase(),
      name: participant,
      avatar: {
        imageUrl: `https://production.cdn.superviz.com/static/default-avatars/${avatarImageForParticipant}.png`,
        model3DUrl: `https://production.storage.superviz.com/readyplayerme/${avatarImageForParticipant}.glb`,
      },
    },
    environment: "dev" as EnvironmentTypes,
  });

  const threeJSPresence = new Presence3D(scene, camera, camera, {
    isAvatarsEnabled: true,
    isLaserEnabled: true,
    isNameEnabled: false,
    isMouseEnabled: true,
    renderLocalAvatar: false,
    avatarConfig: {
      height: 0,
      scale: 1,
      laserOrigin: { x: 0, y: 0, z: 0 },
    },
  }) as unknown as BaseComponent;

  room.addComponent(threeJSPresence);
}

export default function ThreeJSInstance({ name, roomId }: { name: string; roomId: string }) {
  const userId = name.toLowerCase();
  const containerId = userId + "-participant";
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!ref) return;
    InitParticipantThreeJS(name, roomId);
  }, [ref]);

  return (
    <section>
      <h1>View from "{name}" participant</h1>
      <canvas id={containerId} ref={ref} />
    </section>
  );
}
