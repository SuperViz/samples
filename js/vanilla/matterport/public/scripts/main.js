import { DEVELOPER_KEY, MATTERPORT_KEY } from "../env.js";

const roomId = generateUUID();
const groupId = "sv-sample-room-vanilla-js-presence3d-matterport";
const groupName = "Sample Room for Presence3D for Matterport (Vanilla/JS)";
const modelId = "v4LWLiLDm3s"; //"LmRnZAsWoxy";

const firstParticipantMatterportSDK = null;

document.addEventListener("DOMContentLoaded", function () {
  InitMatterportIntegrationWithSuperViz();
});

function InitMatterportIntegrationWithSuperViz() {
  // We are initializing two rooms for demo propose.
  InitFirstParticipantMatterport();
}

function InitFirstParticipantMatterport() {
  const showcase = document.getElementById("zeusparticipant");
  if (!showcase) return;

  const showcaseWindow = showcase.contentWindow;
  showcase.src = `/mp-bundle/showcase.html?&play=1&qs=1&applicationKey=${MATTERPORT_KEY}&m=${modelId}`;
  console.log("showcaseWindow", showcaseWindow);

  showcase.addEventListener("load", async () => {
    if (!showcaseWindow) return;
    firstParticipantMatterportSDK = await showcaseWindow.MP_SDK.connect(showcaseWindow, "zmr67mi1q03hk6307w86s32cb");
    console.log("firstParticipantMatterportSDK", firstParticipantMatterportSDK);
  });
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
    environment: "dev",
  });

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
    environment: "dev",
  });

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
