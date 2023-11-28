import { DEVELOPER_KEY, MATTERPORT_KEY } from "../env.js";

const roomId = "AAd689fe-03b0-442f-ba5e-fb0bbd39d983";
const groupId = "sv-sample-room-cdn-js-contextual-comments-matterport";
const groupName = "Sample Room for Contextual Comments with Matterport (CDN/JS)";
const modelId = "LmRnZAsWoxy";

document.addEventListener("DOMContentLoaded", function () {
  InitMatterportIntegrationWithSuperViz();
});

function InitMatterportIntegrationWithSuperViz() {
  // We are initializing two rooms for demo propose.
  InitFirstParticipantMatterport();
  InitSecondParticipantMatterport();
}

function InitFirstParticipantMatterport() {
  const showcase = document.getElementById("zeus-participant");
  if (!showcase) return;

  const showcaseWindow = showcase.contentWindow;
  showcase.src = `./mp-bundle/showcase.html?&play=1&qs=1&applicationKey=${MATTERPORT_KEY}&m=${modelId}`;

  showcase.addEventListener("load", async () => {
    if (!showcaseWindow) return;
    const mpSDK = await showcaseWindow.MP_SDK.connect(showcaseWindow, MATTERPORT_KEY);

    InitSuperVizRoomWithMatterport(mpSDK, showcase, "Zeus");
  });
}

function InitSecondParticipantMatterport() {
  const showcase = document.getElementById("hera-participant");
  if (!showcase) return;

  const showcaseWindow = showcase.contentWindow;
  showcase.src = `./mp-bundle/showcase.html?&play=1&qs=1&applicationKey=${MATTERPORT_KEY}&m=${modelId}`;

  showcase.addEventListener("load", async () => {
    if (!showcaseWindow) return;
    const mpSDK = await showcaseWindow.MP_SDK.connect(showcaseWindow, MATTERPORT_KEY);

    InitSuperVizRoomWithMatterport(mpSDK, showcase, "Hera");
  });
}

async function InitSuperVizRoomWithMatterport(mpSDK, showcase, participant) {
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

  const pinAdapter = new window.MatterportPin(mpSDK, showcase);
  const comments = new window.SuperVizRoom.Comments(pinAdapter, {
    position: position,
    buttonLocation: `top-${position}`,
  });

  room.addComponent(comments);
}
