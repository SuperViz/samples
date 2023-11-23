import { DEVELOPER_KEY } from "../env.js";
import * as THREE from "three";
import { RoomEnvironment } from "/vendor/threejs/examples/jsm/environments/RoomEnvironment.js";
import { OrbitControls } from "/vendor/threejs/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "/vendor/threejs/examples/jsm/loaders/GLTFLoader.js";

const roomId = generateUUID();
const groupId = "sv-sample-room-cdn-js-presence3d-three-js";
const groupName = "Sample Room for Presence3D for ThreeJS (CDN/JS)";

document.addEventListener("DOMContentLoaded", function () {
  InitThreeJsIntegrationWithSuperViz();
});

function InitThreeJsIntegrationWithSuperViz() {
  // We are initializing two rooms for demo propose.
  InitParticipantThreeJS("Zeus");
  InitParticipantThreeJS("Hera");
}

function InitParticipantThreeJS(participantName) {
  const participantId = participantName.toLowerCase();

  const container = document.getElementById(participantId + "-participant");
  const width = container.clientWidth;
  const height = container.clientHeight;

  const renderer = new THREE.WebGLRenderer({ canvas: container, antialias: true });
  renderer.outputEncoding = THREE.sRGBEncoding;
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
      InitSuperVizRoomWithThreeJS(scene, camera, participantName, participantId);
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

async function InitSuperVizRoomWithThreeJS(scene, camera, participant, participantId) {
  // This line is only for demonstration purpose. You can use any avatar you want.
  const avatarImageForParticipant = participant == "Hera" ? "2" : "5";

  const room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
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
    environment: "dev",
  });

  const threeJSPresence = new window.Presence3D(scene, camera, camera, {
    isAvatarsEnabled: true,
    isLaserEnabled: true,
    isNameEnabled: true,
    isMouseEnabled: true,
    renderLocalAvatar: true,
    avatarConfig: {
      height: 0,
      scale: 1,
      laserOrigin: { x: 0, y: 0, z: 0 },
    },
  });

  room.addComponent(threeJSPresence);
}

function generateUUID() {
  var d = new Date().getTime();
  var d2 = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
