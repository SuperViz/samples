import SuperVizRoom from "@superviz/sdk";
import { Comments } from "@superviz/sdk/lib/components";
import { MatterportPin } from "@superviz/matterport-plugin";
import { useRef, useState } from "react";

const modelId = "LmRnZAsWoxy";
const groupId = "sv-sample-room-react-js-contextual-comments-matterport";
const groupName = "Sample Room with Contextual Comments for Matterport (React/JS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const MATTERPORT_KEY = import.meta.env.VITE_MATTERPORT_KEY;

export default function MatterportInstance({ name, roomId, toggle }) {
  const participantId = name.toLowerCase();
  const ref = useRef(null);
  const [room, setRoom] = useState();
  const [loaded, setLoaded] = useState(false);

  const initSuperVizWithMatterport = async (mpSdk, showcase) => {
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

    const pinAdapter = new MatterportPin(mpSdk, showcase);

    const comments = new Comments(pinAdapter, {
      position: "left",
      buttonLocation: `top-left`,
    });

    room.addComponent(comments);
    setRoom(room);
  };

  const InitMatterport = async () => {
    const showcase = ref.current;
    const showcaseWindow = showcase.contentWindow;

    if (!showcaseWindow) return;
    const mpSdk = await showcaseWindow.MP_SDK.connect(showcaseWindow, MATTERPORT_KEY);

    await initSuperVizWithMatterport(mpSdk, showcase);

    setLoaded(true);
  };

  const destroy = () => {
    if (room) {
      room.destroy();
      toggle();
    }
  };
  return (
    <>
      <button disabled={!loaded} onClick={destroy}>
        Change participant
      </button>
      <h1>View from "{name}" participant</h1>
      <iframe
        onLoad={InitMatterport}
        className={name.toLowerCase()}
        ref={ref}
        id={`${name}-container`}
        src={`/mp-bundle/showcase.html?&brand=0&mls=2&mt=0&search=0&kb=0&play=1&qs=0&applicationKey=${MATTERPORT_KEY}&m=${modelId}`}
      />
    </>
  );
}
