import SuperVizRoom from "@superviz/sdk";
import { Presence3D } from "@superviz/autodesk-viewer-plugin";  
import { useEffect, useRef } from "react";
import { EnvironmentTypes } from "@superviz/sdk/lib/common/types/sdk-options.types.js";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-cdn-js-presence3d-autodesk-viewer";
const groupName = "Sample Room for Presence3D for Autodesk viewer (CDN/JS)";
const AUTH_URL = "https://developer.api.autodesk.com/authentication/v1/authenticate";
const modelURN = "urn:adsk.objects:os.object:e8d17563-1a4e-4471-bd72-a0a7e8d719bc/fileifc.ifc";
const AutodeskData = {
  client_id: import.meta.env.VITE_CLIENT_ID,
  client_secret: import.meta.env.VITE_CLIENT_SECRET,
  grant_type: "client_credentials",
  scope: "data:read bucket:read",
};

function InitParticipantAutodesk(participantName: string, roomId: string) {
  const participantId = participantName.toLowerCase();
  const contentSection = document.getElementById(participantId + "-participant");

  const GuiViewer3D = window.Autodesk.Viewing.GuiViewer3D;
  let viewer: typeof GuiViewer3D = null;

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

        window.Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, (error: string)=> console.error(error));
      });
    });

  function onDocumentLoadSuccess(doc: any) {
    const viewable = doc.getRoot().getDefaultGeometry();
    if (viewable) {
      viewer
        .loadDocumentNode(doc, viewable, {
          applyScaling: "meters",
        })
        .then(() => {
          InitSuperVizRoomWithAutodesk(viewer, participantName, participantId, roomId);
        })
        .catch((error: string) => {
          console.error(`Error loading forge model: ${error}`);
        });
    }
  }
}

async function InitSuperVizRoomWithAutodesk(viewer: any, participant: string, participantId: string, roomId: string) {
  // This line is only for demonstration purpose. You can use any avatar you want.
  const avatarImageForParticipant = participant == "Hera" ? "2" : "5";

  const room = await SuperVizRoom(DEVELOPER_KEY, {
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
    environment: "dev" as EnvironmentTypes,
  });

  const autodeskPresence = new Presence3D(viewer, {
    isAvatarsEnabled: true,
    isLaserEnabled: false,
    isNameEnabled: true,
    avatarConfig: {
      height: 0,
      scale: 10,
      laserOrigin: { x: 0, y: 0, z: 0 },
    },
  });

  room.addComponent(autodeskPresence as any);
}


export default function AutodeskInstance({ name, roomId }: { name: string; roomId: string }) {
  const loaded = useRef(false);

  useEffect(()=> {
    if (loaded.current) return;
    loaded.current = true;
    InitParticipantAutodesk(name, roomId);

  }, [loaded])

  return (
    <section>
      <h1>View from "{name}" participant</h1> 
      <div id={`${name.toLowerCase()}-participant`}></div>
    </section>
  );
}
