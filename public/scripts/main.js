import { DEVELOPER_KEY } from "../env.js";
import { sampleInfo } from "../projectInfo.js";
import * as THREE from "three";
import { RoomEnvironment } from "/vendor/threejs/examples/jsm/environments/RoomEnvironment.js";
import { OrbitControls } from "/vendor/threejs/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "/vendor/threejs/examples/jsm/loaders/GLTFLoader.js";

const participant = Math.floor(Math.random() * 100).toString().padStart(3, "0");
const groupId = sampleInfo.id;
const groupName = sampleInfo.name;

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
      InitSuperVizRoomWithThreeJS(scene, camera);
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

async function InitSuperVizRoomWithThreeJS(scene, camera) {
  const room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
    roomId: groupId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: participant,
      name: "John " + participant,
      avatar: {
        imageUrl: `https://production.cdn.superviz.com/static/default-avatars/2.png`,
        model3DUrl: `https://production.storage.superviz.com/readyplayerme/2.glb`,
      },
    },
  });

  const presence = new window.Presence3D(scene, camera, camera);
  room.addComponent(presence);
}

InitParticipantThreeJS();
