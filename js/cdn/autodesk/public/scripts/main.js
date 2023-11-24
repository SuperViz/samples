import { DEVELOPER_KEY, CLIENT_ID, CLIENT_SECRET } from "../env.js";

const roomId = generateUUID();
const groupId = "sv-sample-room-cdn-js-presence3d-autodesk-viewer";
const groupName = "Sample Room for Presence3D for Autodesk viewer (CDN/JS)";

const AUTH_URL = "https://developer.api.autodesk.com/authentication/v1/authenticate";
const modelURN = "urn:adsk.objects:os.object:e8d17563-1a4e-4471-bd72-a0a7e8d719bc/fileifc.ifc";
const AutodeskData = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  grant_type: "client_credentials",
  scope: "data:read bucket:read",
};

document.addEventListener("DOMContentLoaded", function () {
  InitAutodesk();
});

function InitAutodesk() {
  // We are initializing two rooms for demo propose.

  InitParticipantAutodesk("Zeus");
  InitParticipantAutodesk("Hera");
}

function InitParticipantAutodesk(participantName) {
  const participantId = participantName.toLowerCase();
  const contentSection = document.getElementById(participantId + "-participant");
  let viewer = null;

  fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(AutodeskData).toString(),
  })
    .then((res) => {
      return res.json();
    })
    .then((dataToken) => {
      const options = {
        env: "AutodeskProduction2",
        api: "streamingV2",
        accessToken: dataToken.access_token,
      };

      const modelID = btoa(modelURN);
      var documentId = `urn:${modelID}`;

      window.Autodesk.Viewing.Initializer(options, async () => {
        viewer = new window.Autodesk.Viewing.GuiViewer3D(contentSection);
        await viewer.start();

        viewer.setTheme("dark-theme");
        viewer.setQualityLevel(false, false);
        viewer.setGhosting(false);
        viewer.setGroundShadow(false);
        viewer.setGroundReflection(false);
        viewer.setOptimizeNavigation(true);
        viewer.setProgressiveRendering(true);

        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
      });
    });

  function onDocumentLoadSuccess(doc) {
    const viewable = doc.getRoot().getDefaultGeometry();
    if (viewable) {
      viewer
        .loadDocumentNode(doc, viewable, {
          applyScaling: "meters",
        })
        .then((result) => {
          InitSuperVizRoomWithAutodesk(viewer, participantName, participantId);
        })
        .catch((error) => {
          this.onDocumentLoadFailure(error);
        });
    }
  }
  function onDocumentLoadFailure(error, message) {
    console.error(`Error loading forge model: ${error} - ${message}`);
  }
}

async function InitSuperVizRoomWithAutodesk(viewer, participant, participantId) {
  // This line is only for demonstration purpose. You can use any avatar you want.
  const avatarImageForParticipant = participant == "Hera" ? "2" : "5";

  const room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
    roomId: roomId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: participantId,
      name: participant,
      avatar: {
        imageUrl: `https://production.cdn.superviz.com/static/default-avatars/${avatarImageForParticipant}.png`,
        model3DUrl: `https://production.storage.superviz.com/readyplayerme/${avatarImageForParticipant}.glb`,
      },
    },
    environment: "dev",
  });

  const autodeskPresence = new window.Presence3D(viewer, {
    isAvatarsEnabled: true,
    isLaserEnabled: false,
    isNameEnabled: true,
    avatarConfig: {
      height: 0,
      scale: 10,
      laserOrigin: { x: 0, y: 0, z: 0 },
    },
  });

  room.addComponent(autodeskPresence);
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
