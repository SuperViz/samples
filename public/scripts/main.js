import { DEVELOPER_KEY } from "../env.js";

const roomId = generateUUID();
const groupId = "sv-sample-room-cdn-mouse-pointers";
const groupName = "Sample Room for Mouse Pointers (CDN JS)";

document.addEventListener("DOMContentLoaded", function () {
  InitSuperVizMousePointers();
});

function InitSuperVizMousePointers() {
  // We are initializing two rooms for demo purposes.
  InitFirstRoom();
  InitSecondRoom();
}

async function InitFirstRoom() {
  const room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
    roomId: roomId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: "zeus",
      name: "Zeus",
    },
  });

  const mousePointers = new window.SuperVizRoom.MousePointers("mouse-pointer-1");
  room.addComponent(mousePointers);

  return room;
}

async function InitSecondRoom() {
  const room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
    roomId: roomId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: "hera",
      name: "Hera",
    },
  });

  const mousePointers = new window.SuperVizRoom.MousePointers("mouse-pointer-2");
  room.addComponent(mousePointers);

  return room;
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
