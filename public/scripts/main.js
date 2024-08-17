import { DEVELOPER_KEY } from "../env.js";
import { sampleInfo } from "../projectInfo.js";

const participant = Math.floor(Math.random() * 100).toString().padStart(3, "0");
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
      id: participant,
      name: "John " + participant,
    },
  });

  const formElements = new window.SuperVizRoom.FormElements({
    fields: ['name', 'email', 'dog', 'cat', 'fish'],
  })

  room.addComponent(formElements)

  return room;
}

initializeSuperVizRoom();
