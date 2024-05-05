import "./style.css";
import SuperVizRoom, { CanvasPin, Comments } from "@superviz/sdk";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const user = Math.floor(Math.random() * 100);
const groupId = "sv-sample-room-vanilla-mouse-pointers";
const groupName = "Sample Room for Mouse Pointers (Vanilla + TS)";

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

  const pinAdapter = new CanvasPin("element-id");
  const comments = new Comments(pinAdapter);
  room.addComponent(comments);

  return room;
}

document.querySelector<HTMLDivElement>("#root")!.innerHTML = `<canvas id="element-id"></canvas>`;

initializeSuperVizRoom();
