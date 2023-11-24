import SuperVizRoom from "@superviz/sdk";
import { Presence3D } from "@superviz/matterport-plugin";
import { useRef } from "react";

const groupId = "sv-sample-room-react-ts-who-is-online";
const groupName = "Sample Room for Who-is-Online (React/TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const MATTERPORT_KEY = import.meta.env.VITE_MATTERPORT_KEY;
const modelId = "LmRnZAsWoxy";

const initMatterport = async (roomId: string, userId: string, name: string, avatar: string, mpSdk: any) => {
  const room = await SuperVizRoom(DEVELOPER_KEY, {
    roomId: roomId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: userId,
      name: name,
      avatar: {
        imageUrl: `https://production.cdn.superviz.com/static/default-avatars/${avatar}.png`,
        model3DUrl: `https://production.storage.superviz.com/readyplayerme/${avatar}.glb`,
      }
    },
    environment: "dev" as any,
  });

  const matterportPresence = new Presence3D(mpSdk, {
    isAvatarsEnabled: true,
    isLaserEnabled: true,
    isNameEnabled: true,
    avatarConfig: {
      height: 0,
      scale: 1,
      laserOrigin: { x: 0, y: 0, z: 0 },
    },
  });

  room.addComponent(matterportPresence as any)

};

export default function MatterportInstance({ name, roomId, avatar }: { name: string; roomId: string, avatar: string }) {
  const containerId = name + "-container";
  const userId = name.toLowerCase();
  const ref = useRef<any>(null)
  
  const onLoad = async ()=> {
    const showcaseWindow = ref.current.contentWindow;

    if(!showcaseWindow) return;
  
    const mpSdk = await showcaseWindow.MP_SDK.connect(showcaseWindow);
    initMatterport(roomId, userId, name, mpSdk, roomId);
  }
  
  return (
    <section>
      <iframe ref={ref} id={containerId} onLoad={onLoad} src={`/mp-bundle/showcase.html?&play=1&qs=1&applicationKey=${MATTERPORT_KEY}&m=${modelId}`}/>
    </section>
  );
}
