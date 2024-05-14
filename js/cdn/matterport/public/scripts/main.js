import { DEVELOPER_KEY, MATTERPORT_KEY } from "../env.js";
import { sampleInfo } from "../projectInfo.js";

const participant = Math.floor(Math.random() * 100);
const groupId = sampleInfo.id;
const groupName = sampleInfo.name;
const modelId = "7ffnfBNamei";

function InitMatterport() {
  const showcase = document.getElementById("participant");
  if (!showcase) return;

  const showcaseWindow = showcase.contentWindow;
  showcase.src = `./mp-bundle/showcase.html?&brand=0&mls=2&mt=0&search=0&kb=0&play=1&qs=1&applicationKey=${MATTERPORT_KEY}&m=${modelId}`;

  showcase.addEventListener("load", async () => {
    if (!showcaseWindow) return;
    const mpSDK = await showcaseWindow.MP_SDK.connect(showcaseWindow, MATTERPORT_KEY);

    InitSuperVizRoomWithMatterport(mpSDK);
  });
}

async function InitSuperVizRoomWithMatterport(mpSDK) {
  const room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
    roomId: groupId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: participant.toString(),
      name: "John " + participant,
      avatar: {
        imageUrl: `https://production.cdn.superviz.com/static/default-avatars/2.png`,
        model3DUrl: `https://production.storage.superviz.com/readyplayerme/2.glb`,
      },
    },
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

InitMatterport();
