import SuperVizRoom from "@superviz/sdk";
import { Presence3D } from "@superviz/matterport-plugin";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function MatterportInstance({ name }: { name: string }) {
  const avatarNumber = name === "Zeus" ? "5" : "2";
  const participantId = name.toLowerCase();
  const roomId = uuidv4();
  const modelId = "LmRnZAsWoxy";
  const groupId = "sv-sample-room-react-ts-presence3d-matterport";
  const groupName = "Sample Room for Presence3D for Matterport (React/TS)";
  const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
  const MATTERPORT_KEY = import.meta.env.VITE_MATTERPORT_KEY;

  const ref = useRef<any>(null);
  const [disableButton, setDisableButton] = useState(false);

  const initSuperVizWithMatterport = async (mpSdk: any) => {
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
          imageUrl: `https://production.cdn.superviz.com/static/default-avatars/${avatarNumber}.png`,
          model3DUrl: `https://production.storage.superviz.com/readyplayerme/${avatarNumber}.glb`,
        },
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

    room.addComponent(matterportPresence as any);
  };

  const enter = async () => {
    const showcaseWindow = ref.current.contentWindow;

    if (!showcaseWindow) return;
    const mpSdk = await showcaseWindow.MP_SDK.connect(showcaseWindow, MATTERPORT_KEY);

    initSuperVizWithMatterport(mpSdk);
    setDisableButton(true);
  };

  return (
    <>
      <section>
        <button onClick={enter} disabled={disableButton}>
          Join Matterport room as "{name}"
        </button>
        <iframe
          ref={ref}
          id={name + `-container`}
          src={`/mp-bundle/showcase.html?&play=1&qs=1&applicationKey=${MATTERPORT_KEY}&m=${modelId}`}
        />
      </section>
    </>
  );
}
