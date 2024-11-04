import "./style.css";
import SuperVizRoom, { CanvasPin, Comments } from "@superviz/sdk";
import { sampleInfo } from "./projectInfo";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const participant = Math.floor(Math.random() * 100).toString().padStart(3, "0");
const groupId = sampleInfo.id;
const groupName = sampleInfo.name;

async function initializeSuperVizRoom() {
  const room = await SuperVizRoom(DEVELOPER_KEY, {
    roomId: groupId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: participant,
      name: "John " + participant,
    },
  });

  const pinAdapter = new CanvasPin("element-id");
  const comments = new Comments(pinAdapter);
  room.addComponent(comments);

  return room;
}

document.querySelector("#root").innerHTML = `<canvas id="element-id"></canvas>`;

initializeSuperVizRoom();