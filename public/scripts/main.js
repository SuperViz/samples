import { DEVELOPER_KEY, CLIENT_ID, CLIENT_SECRET } from "../env.js";
import { sampleInfo } from "../projectInfo";

const roomId = "4be67c09-0e3b-4fe8-9eb6-20c098463968";
const groupId = sampleInfo.id;
const groupName = sampleInfo.name;

const AUTH_URL = "https://developer.api.autodesk.com/authentication/v2/token";
const modelURN = "urn:adsk.objects:os.object:e8d17563-1a4e-4471-bd72-a0a7e8d719bc/fileifc.ifc";
const AutodeskData = {
  grant_type: "client_credentials",
  scope: "data:read bucket:read",
};
const token = btoa(`${FORGE_CLIENT}:${FORGE_SECRET}`);

let room;
let participantName = "Zeus";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("participant-name").innerHTML = "View from " + participantName + " participant";
  InitParticipantAutodesk(participantName);
});

document.getElementById("change-participant").addEventListener("click", changeParticipant);

function changeParticipant() {
  participantName = participantName == "Zeus" ? "Hera" : "Zeus";
  document.getElementById("participant-name").innerHTML = "View from " + participantName + " participant";

  room.destroy();

  InitParticipantAutodesk(participantName);
}

function InitParticipantAutodesk(participantName) {
  const participantId = participantName.toLowerCase();
  const contentSection = document.getElementById("participant-canvas");
  let viewer = null;

  fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Basic ${token}` },
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
          InitSuperVizRoomWithAutodesk(viewer, contentSection, participantName, participantId);
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

async function InitSuperVizRoomWithAutodesk(viewer, viewerElement, participant, participantId) {
  // This line is only for demonstration purpose. You can use any avatar you want.
  const avatarImageForParticipant = participant == "Hera" ? "2" : "5";

  room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
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
  });

  const pinAdapter = new window.AutodeskPin(viewer, viewerElement);

  const comments = new window.SuperVizRoom.Comments(pinAdapter);

  room.addComponent(comments);
}
