import SuperVizRoom from "@superviz/sdk";
import { Presence3D } from "@superviz/matterport-plugin";
import { useRef, useState } from "react";

const groupId = "sv-sample-room-react-js-matterport";
const groupName = "Sample Room for Matterport (React/JS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const MATTERPORT_KEY = import.meta.env.VITE_MATTERPORT_KEY;
const modelId = "LmRnZAsWoxy";

const initMatterport = async (roomId, userId, name, avatar, mpSdk) => {
  // This line is only for demonstration purpose. You can use any avatar you want.
  const avatarImageForParticipant = participant == "Hera" ? "2" : "5";

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
        imageUrl: `https://production.cdn.superviz.com/static/default-avatars/${avatarImageForParticipant}.png`,
        model3DUrl: `https://production.storage.superviz.com/readyplayerme/${avatarImageForParticipant}.glb`,
      },
    },
    environment: "dev",
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

  room.addComponent(matterportPresence);
};

export default function MatterportInstance({ name, roomId, avatar }) {
  const containerId = name + "-container";
  const userId = name.toLowerCase();
  const ref = useRef(null);
  const [disableButton, setDisableButton] = useState(false);

  const enter = async () => {
    const showcaseWindow = ref.current.contentWindow;

    if (!showcaseWindow) return;
    const mpSdk = await showcaseWindow.MP_SDK.connect(showcaseWindow, MATTERPORT_KEY);
    initMatterport(roomId, userId, name, avatar, mpSdk);
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
          id={containerId}
          src={`/mp-bundle/showcase.html?&play=1&qs=1&applicationKey=${MATTERPORT_KEY}&m=${modelId}`}
        />
      </section>
    </>
  );
}
