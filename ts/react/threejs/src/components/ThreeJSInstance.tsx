import { useState } from "react";

import SuperVizRoom from "@superviz/sdk";
import { Presence3D } from "@superviz/threejs-plugin";
import { BaseComponent } from "@superviz/sdk/lib/components/base/index.js";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export default function ThreeJSInstance({ name, roomId }: { name: string; roomId: string }) {
  const [disableButton, setDisableButton] = useState(false);

  const groupId = "sv-sample-room-react-ts-presence3d-three-js";
  const groupName = "Sample Room for Presence3D for ThreeJS (React/TS)";
  const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
  const participantId = name.toLowerCase();
  const containerId = participantId + "-participant";

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
        InitSuperVizRoomWithThreeJS(scene, camera);
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

  async function InitSuperVizRoomWithThreeJS(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
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

    setDisableButton(true);
  }

  return (
    <section>
      <button onClick={InitParticipantThreeJS} disabled={disableButton}>
        Join ThreeJS room as "{name}"
      </button>
      <canvas id={containerId} />
    </section>
  );
}
