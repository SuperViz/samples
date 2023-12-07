import { DEVELOPER_KEY } from "../env.js";

const roomId = "efd689fe-03b0-442e-ba4e-fb0bbd39dfe7";
const groupId = "sv-sample-room-cdn-js-contextual-comments-html";
const groupName = "Sample Room for Contextual Comments for HTML (CDN/JS)";

let room;
let participantName = "Zeus";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("participant-name").innerHTML = "View from " + participantName + " participant";
  InitSuperVizRoomWithComments(participantName);
});

document.getElementById("change-participant").addEventListener("click", changeParticipant);

function changeParticipant() {
  participantName = participantName == "Zeus" ? "Hera" : "Zeus";
  document.getElementById("participant-name").innerHTML = "View from " + participantName + " participant";

  room.destroy();
  InitSuperVizRoomWithComments(participantName);
}

async function InitSuperVizRoomWithComments(participant) {
  room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
    roomId: roomId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: participant.toLowerCase(),
      name: participant,
    },
  });

  const pinAdapter = new window.SuperVizRoom.CanvasPin(`participant-canvas`);
  const comments = new window.SuperVizRoom.Comments(pinAdapter, {
    position: "left",
    buttonLocation: `top-left`,
  });

  room.addComponent(comments);
}
