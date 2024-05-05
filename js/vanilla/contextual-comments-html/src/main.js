import "./style.css";
import SuperVizRoom, { Comments, HTMLPin } from "@superviz/sdk";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const user = Math.floor(Math.random() * 100);
const groupId = "sv-sample-room-vanilla-ts-contextual-comments-html";
const groupName = "Sample Room for Contextual Comments for HTML (React/TS)";

async function initializeSuperVizRoom() {
  const room = await SuperVizRoom(DEVELOPER_KEY, {
    roomId: groupId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: user.toString(),
      name: "John " + user,
    },
  });

  const pinAdapter = new HTMLPin("my-div");
  const comments = new Comments(pinAdapter);
  room.addComponent(comments);

  return room;
}

initializeSuperVizRoom();
