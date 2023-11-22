import { DEVELOPER_KEY, MATTERPORT_KEY } from "../env.js";

const roomId = generateUUID();
const groupId = "sv-sample-room-cdn-js-presence3d-html";
const groupName = "Sample Room for Presence3D for HTML (CDN/JS)";
const modelId = "LmRnZAsWoxy";

document.addEventListener("DOMContentLoaded", function () {
  InitSuperVizComments();
});

function InitSuperVizComments() {
  // We are initializing two rooms for demo propose.
  InitSuperVizRoomWithComments("Zeus");
  InitSuperVizRoomWithComments("Hera");
}

async function InitSuperVizRoomWithComments(participant) {
  // We are using the participant name to allocate the comments modal on their side of the screen. Only for demonstration purpose.
  const position = participant == "Zeus" ? "left" : "right";

  const room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
    roomId: roomId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: participant.toLowerCase(),
      name: participant,
    },
    environment: "dev",
  });

  const pinAdapter = new window.SuperVizRoom.CanvasPin(`${participant.toLowerCase()}-participant`);
  const comments = new window.SuperVizRoom.Comments(pinAdapter, {
    position: position,
    buttonLocation: `top-${position}`,
  });

  room.addComponent(comments);
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
