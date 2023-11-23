import { DEVELOPER_KEY } from "../env.js";

const roomId = "efd689fe-03b0-442e-ba4e-fb0bbd39dfe7";
const groupId = "sv-sample-room-cdn-js-contextual-comments-html";
const groupName = "Sample Room for Contextual Comments for HTML (CDN/JS)";

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
