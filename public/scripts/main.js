import { DEVELOPER_KEY, MATTERPORT_KEY } from "../env.js";

const roomId = "55ec6752-98e8-48c6-b1b6-74bf736c6b14";
const groupId = "sv-sample-room-cdn-js-contextual-comments-matterport";
const groupName = "Sample Room for Contextual Comments with Matterport (CDN/JS)";
const modelId = "LmRnZAsWoxy";

let room;
let participantName = "Zeus";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("participant-name").innerHTML = "View from " + participantName + " participant";
  InitParticipantMatterport(participantName);
});

document.getElementById("change-participant").addEventListener("click", changeParticipant);

function changeParticipant() {
  participantName = participantName == "Zeus" ? "Hera" : "Zeus";
  document.getElementById("participant-name").innerHTML = "View from " + participantName + " participant";

  room.destroy();

  InitParticipantMatterport(participantName);
}

function InitParticipantMatterport(participantName) {
  const showcase = document.getElementById("participant-showcase");
  if (!showcase) return;

  const showcaseWindow = showcase.contentWindow;
  showcase.src = `./mp-bundle/showcase.html?&brand=0&mls=2&mt=0&search=0&kb=0&play=1&qs=0&applicationKey=${MATTERPORT_KEY}&m=${modelId}`;

  showcase.addEventListener("load", async () => {
    if (!showcaseWindow) return;
    const mpSDK = await showcaseWindow.MP_SDK.connect(showcaseWindow, MATTERPORT_KEY);

    InitSuperVizRoomWithMatterport(mpSDK, showcase, participantName);
  });
}

async function InitSuperVizRoomWithMatterport(mpSDK, showcase, participant) {
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

  const pinAdapter = new window.MatterportPin(mpSDK, showcase);
  const comments = new window.SuperVizRoom.Comments(pinAdapter, {
    position: "left",
    buttonLocation: `top-left`,
  });

  room.addComponent(comments);
}
