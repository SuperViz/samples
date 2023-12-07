import { useState } from "react";
import SuperVizRoom from "@superviz/sdk";
import { Presence3D } from "@superviz/autodesk-viewer-plugin";

export default function AutodeskInstance({ name, roomId }) {
  const participantId = `${name.toLowerCase()}-participant`;
  const [disableButton, setDisableButton] = useState(false);

  function InitParticipantAutodesk() {
    const modelURN = "urn:adsk.objects:os.object:e8d17563-1a4e-4471-bd72-a0a7e8d719bc/fileifc.ifc";
    const modelID = btoa(modelURN);
    const FORGE_CLIENT = import.meta.env.VITE_CLIENT_ID;
    const FORGE_SECRET = import.meta.env.VITE_CLIENT_SECRET;
    const AUTH_URL = "https://developer.api.autodesk.com/authentication/v1/authenticate";
    const documentId = `urn:${modelID}`;

    let data = {
      client_id: FORGE_CLIENT,
      client_secret: FORGE_SECRET,
      grant_type: "client_credentials",
      scope: "data:read bucket:read",
    };

    const contentSection = document.getElementById(participantId);
    let viewer = null;

    fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
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

    function onDocumentLoadSuccess(doc) {
      const viewable = doc.getRoot().getDefaultGeometry();
      if (viewable) {
        viewer
          .loadDocumentNode(doc, viewable, {
            applyScaling: "meters",
          })
          .then((result) => {
            initSuperVizRoomWithAutodesk(viewer);
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      }
    }
    function onDocumentLoadFailure(error, message) {
      console.error(`Error loading forge model: ${error} - ${message}`);
    }
  }

  async function initSuperVizRoomWithAutodesk(viewer) {
    const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
    const groupId = "sv-sample-room-cdn-js-presence3d-autodesk-viewer";
    const groupName = "Sample Room for Presence3D for Autodesk viewer (CDN/JS)";

    // This line is only for demonstration purpose. You can use any avatar you want.
    const avatarImageForParticipant = name == "Hera" ? "2" : "5";

    const room = await SuperVizRoom(DEVELOPER_KEY, {
      roomId: roomId,
      group: {
        id: groupId,
        name: groupName,
      },
      participant: {
        id: participantId,
        name: name,
        avatar: {
          imageUrl: `https://production.cdn.superviz.com/static/default-avatars/${avatarImageForParticipant}.png`,
          model3DUrl: `https://production.storage.superviz.com/readyplayerme/${avatarImageForParticipant}.glb`,
        },
      },
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

    room.addComponent(autodeskPresence);

    setDisableButton(true);
  }

  return (
    <section>
      <button onClick={InitParticipantAutodesk} disabled={disableButton}>
        Join Autodesk room as "{name}"
      </button>
      <div className="canvas" id={name.toLowerCase() + `-participant`}></div>
    </section>
  );
}
