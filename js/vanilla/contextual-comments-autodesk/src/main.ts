import SuperVizRoom, { Comments } from "@superviz/sdk";
import "./style.css";
import { AutodeskPin, Presence3D } from "@superviz/autodesk-viewer-plugin";

const user = Math.floor(Math.random() * 100);
const groupId = "sv-sample-room-vanilla-ts-presence3d-autodesk-viewer";
const groupName = "Sample Room for Presence3D for Autodesk viewer (Vanilla/TS)";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const FORGE_CLIENT = import.meta.env.VITE_CLIENT_ID;
const FORGE_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const AUTH_URL = "https://developer.api.autodesk.com/authentication/v2/token";
const modelURN = "urn:adsk.objects:os.object:e8d17563-1a4e-4471-bd72-a0a7e8d719bc/fileifc.ifc";
const AutodeskData = {
  grant_type: "client_credentials",
  scope: "data:read bucket:read",
};
const token = btoa(`${FORGE_CLIENT}:${FORGE_SECRET}`);

function InitAutodesk() {
  const contentSection = document.getElementById("zeus-participant");
  let viewer: any = null;

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

        window.Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
      });
    });

  function onDocumentLoadSuccess(doc: any) {
    const viewable = doc.getRoot().getDefaultGeometry();
    if (viewable) {
      viewer
        .loadDocumentNode(doc, viewable, {
          applyScaling: "meters",
        })
        .then(async (result: any) => {
          await InitSuperVizRoomWithAutodesk(viewer);
        })
        .catch((error: any) => {
          onDocumentLoadFailure(error);
        });
    }
  }
  function onDocumentLoadFailure(error: any) {
    console.error(`Error loading forge model: ${error}`);
  }
}

async function InitSuperVizRoomWithAutodesk(viewer: any) {
  const room = await SuperVizRoom(DEVELOPER_KEY, {
    roomId: groupId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: user.toString(),
      name: "John " + user,
      avatar: {
        imageUrl: `https://production.cdn.superviz.com/static/default-avatars/2.png`,
        model3DUrl: `https://production.storage.superviz.com/readyplayerme/2.glb`,
      },
    },
  });

  const pinAdapter = new AutodeskPin(viewer);
  console.log("pinAdapter", pinAdapter);

  const comments = new Comments(pinAdapter as any);
  room.addComponent(comments as any);
}

InitAutodesk();
