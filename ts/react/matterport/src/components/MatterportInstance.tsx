import SuperVizRoom from "@superviz/sdk";
import { Presence3D } from "@superviz/matterport-plugin";
import { useRef, useState } from "react";

export default function MatterportInstance({ name, roomId }: { name: string; roomId: string }) {
  const participantId = name.toLowerCase();
  const modelId = "LmRnZAsWoxy";
  const groupId = "sv-sample-room-react-ts-presence3d-matterport";
  const groupName = "Sample Room for Presence3D for Matterport (React/TS)";
  const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
  const MATTERPORT_KEY = import.meta.env.VITE_MATTERPORT_KEY;

  const ref = useRef<any>(null);
  const [disableButton, setDisableButton] = useState(false);

  const initSuperVizWithMatterport = async (mpSdk: any) => {
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

  const InitMatterport = async () => {
    const showcaseWindow = ref.current.contentWindow;

    if (!showcaseWindow) return;
    const mpSdk = await showcaseWindow.MP_SDK.connect(showcaseWindow, MATTERPORT_KEY);

    initSuperVizWithMatterport(mpSdk);
    setDisableButton(true);
  };

  return (
    <>
      <section>
        <button onClick={InitMatterport} disabled={disableButton}>
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
