import SuperVizRoom from "@superviz/sdk";
import { Presence3D } from "@superviz/autodesk-viewer-plugin";  
import { useEffect, useRef } from "react";
import { EnvironmentTypes } from "@superviz/sdk/lib/common/types/sdk-options.types.js";

const groupId = "sv-sample-room-react-ts-who-is-online";
const groupName = "Sample Room for Who-is-Online (React/TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

async function InitSuperVizRoomWithThreeJS(participant: string, roomId: string, containerId: string) {
  // This line is only for demonstration purpose. You can use any avatar you want.
  const avatarImageForParticipant = participant == "Hera" ? "2" : "5";

  const room = await SuperVizRoom(DEVELOPER_KEY, {
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
    environment: "dev" as EnvironmentTypes,
  });

  const AUTH_URL = "https://developer.api.autodesk.com/authentication/v1/authenticate";
  const AutodeskData = {
    client_id: "0VSvZ2OGGof8y4N6EtbAwzlfObdnhEAV",
    client_secret: "CGH0AGZDdM4vI0IB",
    grant_type: "client_credentials",
    scope: "data:read bucket:read",
  };

  const dataToken = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(AutodeskData).toString(),
  })
    .then((res) => {
      return res.json();
    })

  const options = {
    env: "AutodeskProduction2",
    api: "streamingV2",
    accessToken: dataToken.access_token,
  };

  const modelID = btoa("teste");
  const documentId = `urn:${modelID}`;

  (window as any).Autodesk.Viewing.Initializer(options, async ()=> {
    const viewerDiv = document.getElementById(containerId);
    const viewer = new (window as any).Autodesk.Viewing.GuiViewer3D(viewerDiv, {});

    await viewer.start();
    (window as any).Autodesk.Viewing.Document.load(
      documentId,
      function loaded(doc: any) { },
      console.log("Error loading document")
    );

    const autodeskPresence = new Presence3D(viewer, {
      isAvatarsEnabled: true,
      isLaserEnabled: true,
      isNameEnabled: true,
      avatarConfig: {
        height: 0,
        scale: 1,
        laserOrigin: { x: 0, y: 0, z: 0 },
      },
    });
    
    room.addComponent(autodeskPresence as any);
  })

  // await viewer.start();

  // room.addComponent(autodeskPresence);
}
export default function WhoIsOnlineContainer({ name, roomId }: { name: string; roomId: string }) {
  const userId = name.toLowerCase();
  const containerId = userId + "-participant";
  const ref = useRef<any>(null);

  useEffect(()=> {
    if (!ref) return;
    InitSuperVizRoomWithThreeJS(name, roomId, containerId)
    
  }, [ref])

  return (
    <section>
      <h1>View from "{name}" participant</h1>
      <canvas id={containerId} ref={ref} />
    </section>
  );
}
