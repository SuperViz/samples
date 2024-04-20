import "./style.css";
import SuperVizRoom, { MousePointers } from "@superviz/sdk";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const user = Math.floor(Math.random() * 100);
const groupId = "sv-sample-room-vanilla-mouse-pointers";
const groupName = "Sample Room for Mouse Pointers (Vanilla + TS)";

async function initializeSuperVizRoom() {
  const room = await SuperVizRoom(DEVELOPER_KEY, {
    roomId: "<ROOM-ID>",
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: user.toString(),
      name: "John " + user,
    },
  });

  const mousePointers = new MousePointers("element-id");
  room.addComponent(mousePointers as any);

  return room;
}

document.querySelector<HTMLDivElement>("#root")!.innerHTML = `<canvas id="element-id"></canvas>`;

initializeSuperVizRoom();
