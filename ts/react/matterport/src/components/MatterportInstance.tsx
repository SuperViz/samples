import SuperVizRoom from "@superviz/sdk";
import { Presence3D } from "@superviz/matterport-plugin";
import { useEffect, useState } from "react";

export default function MatterportInstance({ name, roomId }: { name: string; roomId: string }) {
  const participantId = name.toLowerCase();
  const modelId = "LmRnZAsWoxy";
  const groupId = "sv-sample-room-react-ts-presence3d-matterport";
  const groupName = "Sample Room for Presence3D for Matterport (React/TS)";
  const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
  const MATTERPORT_KEY = import.meta.env.VITE_MATTERPORT_KEY;

  const [disableButton, setDisableButton] = useState(true);
  const [matterport, setMatterport] = useState();

  const initSuperVizWithMatterport = async () => {
    setDisableButton(true);

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

    const matterportPresence = new Presence3D(matterport as any, {
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

  useEffect(() => {
    const showcase = document.getElementById(`${name}-container`) as any;

    showcase.onload = async () => {
      const showcaseWindow = showcase.contentWindow as any;

      const mpSdk = await showcaseWindow.MP_SDK.connect(showcaseWindow, MATTERPORT_KEY);
      setMatterport(mpSdk);
      setDisableButton(false);
    };
  }, []);

  return (
    <>
      <section>
        <button onClick={initSuperVizWithMatterport} disabled={disableButton}>
          Join Matterport room as "{name}"
        </button>
        <iframe
          id={`${name}-container`}
          src={`/mp-bundle/showcase.html?&brand=0&mls=2&mt=0&search=0&kb=0&play=1&qs=0&applicationKey=${MATTERPORT_KEY}&m=${modelId}`}
        />
      </section>
    </>
  );
}
