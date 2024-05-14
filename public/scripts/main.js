import { DEVELOPER_KEY } from "../env.js";
import { sampleInfo } from "../projectInfo.js";

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

  const whoisonline = new window.SuperVizRoom.WhoIsOnline();
  room.addComponent(whoisonline);

  return room;
}

initializeSuperVizRoom();
