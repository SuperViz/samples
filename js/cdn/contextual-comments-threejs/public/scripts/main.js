import { DEVELOPER_KEY } from "../env.js";
import * as THREE from "three";
import { RoomEnvironment } from "/vendor/threejs/examples/jsm/environments/RoomEnvironment.js";
import { OrbitControls } from "/vendor/threejs/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "/vendor/threejs/examples/jsm/loaders/GLTFLoader.js";

const roomId = "AAd689fe-03b0-442f-ba5e-fb0bbd39d983";
const groupId = "sv-sample-room-cdn-js-contextual-comments-threejs";
const groupName = "Sample Room for Contextual Comments with ThreeJS (CDN/JS)";

let room;
let participantName = "Zeus";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("participant-name").innerHTML = "View from " + participantName + " participant";
  InitParticipantThreeJS(participantName);
});

document.getElementById("change-participant").addEventListener("click", changeParticipant);

function changeParticipant() {
  participantName = participantName == "Zeus" ? "Hera" : "Zeus";
  document.getElementById("participant-name").innerHTML = "View from " + participantName + " participant";

  room.destroy();

  InitParticipantThreeJS(participantName);
}

function InitParticipantThreeJS(participantName) {
  const participantId = participantName.toLowerCase();

  const container = document.getElementById("participant-canvas");
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
      InitSuperVizRoomWithThreeJS(scene, renderer, camera, participantName, participantId);
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

async function InitSuperVizRoomWithThreeJS(scene, renderer, camera, participant, participantId) {
  // This line is only for demonstration purpose. You can use any avatar you want.
  const avatarImageForParticipant = participant == "Hera" ? "2" : "5";

  room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
    roomId: roomId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: participantId,
      name: participant,
      avatar: {
        imageUrl: `https://production.cdn.superviz.com/static/default-avatars/${avatarImageForParticipant}.png`,
        model3DUrl: `https://production.storage.superviz.com/readyplayerme/${avatarImageForParticipant}.glb`,
      },
    },
    environment: "dev",
  });

  const pinAdapter = new window.ThreeJsPin(scene, renderer, camera);

  const comments = new window.SuperVizRoom.Comments(pinAdapter);

  room.addComponent(comments);
}
