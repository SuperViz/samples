import { DEVELOPER_KEY } from "../env.js";
import { sampleInfo } from "./../projectInfo.js";

const participant = Math.floor(Math.random() * 100);
const groupId = sampleInfo.id;
const groupName = sampleInfo.name;

async function initializeSuperVizRoom() {
  const room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
    roomId: groupId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: participant.toString(),
      name: "John " + participant,
    },
  });

  const pinAdapter = new window.SuperVizRoom.HTMLPin("my-div");
  const comments = new window.SuperVizRoom.Comments(pinAdapter);
  room.addComponent(comments);

  return room;
}

initializeSuperVizRoom();
