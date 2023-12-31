import { useEffect, useRef, useState } from "react";

import SuperVizRoom from "@superviz/sdk";
import { AutodeskPin } from "@superviz/autodesk-viewer-plugin";
import { Comments } from "@superviz/sdk/lib/components";

export default function AutodeskInstance({ name, roomId, toggle }) {
  const participantId = name.toLowerCase();

  const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
  const groupId = "sv-sample-room-react-ts-contextual-comments-autodesk";
  const groupName = "Sample Room with Contextual Comments for Autodesk  (React/TS)";

  const loaded = useRef(false);
  const [room, setRoom] = useState();

  async function initSuperVizRoomWithAutodesk(viewer, viewerDiv) {
    const room = await SuperVizRoom(DEVELOPER_KEY, {
      roomId: roomId,
      group: {
        id: groupId,
        name: groupName,
      },
      participant: {
        id: participantId,
        name: name,
      },
    });

    const pinAdapter = new AutodeskPin(viewer, viewerDiv);

    const comments = new Comments(pinAdapter, {
      position: "left",
      buttonLocation: "top-left",
    });

    room.addComponent(comments);

    setRoom(room);
  }

  function InitParticipantAutodesk() {
    const modelURN = "urn:adsk.objects:os.object:e8d17563-1a4e-4471-bd72-a0a7e8d719bc/fileifc.ifc";
    const modelID = btoa(modelURN);
    const FORGE_CLIENT = import.meta.env.VITE_CLIENT_ID;
    const FORGE_SECRET = import.meta.env.VITE_CLIENT_SECRET;
    const AUTH_URL = "https://developer.api.autodesk.com/authentication/v2/token";
    const documentId = `urn:${modelID}`;
    const token = btoa(`${FORGE_CLIENT}:${FORGE_SECRET}`);

    let data = {
      grant_type: "client_credentials",
      scope: "data:read bucket:read",
    };

    const contentSection = document.getElementById(participantId);
    let viewer = null;

    fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Basic ${token}` },
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
            initSuperVizRoomWithAutodesk(viewer, contentSection);
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

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    InitParticipantAutodesk();
  }, [loaded]);

  const changeParticipant = () => {
    if (!room) return;

    room.destroy();
    toggle();
  };

  return (
    <>
      <button onClick={changeParticipant}>Change participant</button>
      <h1>View from "{name}" participant</h1>
      <div id={participantId} className="forge-viewer"></div>
    </>
  );
}
