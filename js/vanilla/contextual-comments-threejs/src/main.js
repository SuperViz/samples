import { ThreeJsPin } from "@superviz/threejs-plugin";
import "./style.css";
import SuperVizRoom, { Comments } from "@superviz/sdk";
import * as THREE from "three";

import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const user = Math.floor(Math.random() * 100);
const groupId = "sv-sample-room-vanilla-ts-contextual-comments-threejs";
const groupName = "Sample Room with Contextual Comments for ThreeJS (Vanilla/TS)";

function InitParticipantThreeJS() {
  const container = document.getElementById("participant-canvas");
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
    function (gltf) {
      scene.add(gltf.scene);
      InitSuperVizRoomWithThreeJS(scene, renderer, camera);
      animate();
    },
    undefined,
    function (e) {
      console.error(e);
    }
  );

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();

    renderer.render(scene, camera);
  };

  animate();
}

async function InitSuperVizRoomWithThreeJS(
  scene,
  renderer,
  camera
) {
  const room = await SuperVizRoom(DEVELOPER_KEY, {
    roomId: groupId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: user.toString(),
      name: "John " + user,
      avatar: {
        imageUrl: `https://production.cdn.superviz.com/static/default-avatars/2.png`,
        model3DUrl: `https://production.storage.superviz.com/readyplayerme/2.glb`,
      },
    },
  });

  const pinAdapter = new ThreeJsPin(scene, renderer, camera);
  const comments = new Comments(pinAdapter);

  room.addComponent(comments);
}

InitParticipantThreeJS();
