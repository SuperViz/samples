import { DEVELOPER_KEY, MATTERPORT_KEY } from "../env.js";

const roomId = generateUUID();
const groupId = "sv-sample-room-cdn-js-presence3d-matterport";
const groupName = "Sample Room for Presence3D for Matterport (CDN/JS)";
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

    InitSuperVizRoomWithMatterport(mpSDK, "Zeus");
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

    InitSuperVizRoomWithMatterport(mpSDK, "Hera");
  });
}

async function InitSuperVizRoomWithMatterport(mpSDK, participant) {
  // This line is only for demonstration purpose. You can use any avatar you want.
  const avatarImageForParticipant = participant == "Hera" ? "2" : "5";

  const room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
    roomId: roomId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: participant.toLowerCase(),
      name: participant,
      avatar: {
        imageUrl: `https://production.cdn.superviz.com/static/default-avatars/${avatarImageForParticipant}.png`,
        model3DUrl: `https://production.storage.superviz.com/readyplayerme/${avatarImageForParticipant}.glb`,
      },
    },
    environment: "dev",
  });

  const matterportPresence = new window.Presence3D(mpSDK, {
    isAvatarsEnabled: true,
    isLaserEnabled: true,
    isNameEnabled: true,
    avatarConfig: {
      height: 0,
      scale: 2,
      laserOrigin: { x: 0, y: 0, z: 0 },
    },
  });

  room.addComponent(matterportPresence);
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
