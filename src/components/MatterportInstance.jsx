import SuperVizRoom from "@superviz/sdk";
import { Comments } from "@superviz/sdk/lib/components";
import { MatterportPin } from "@superviz/matterport-plugin";
import { useRef, useState } from "react";

const groupId = "sv-sample-room-react-js-contextual-comments-matterport";
const groupName = "Sample Room for Matterport with Contextual Comments (React/JS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const MATTERPORT_KEY = import.meta.env.VITE_MATTERPORT_KEY;
const modelId = "LmRnZAsWoxy";

export default function MatterportInstance({ name, roomId, avatar, position, toggle }) {
  const containerId = name + "-container";
  const userId = name.toLowerCase();
  const ref = useRef(null);
  const [room, setRoom] = useState();
  const [loaded, setLoaded] = useState(false);

  const initMatterport = async (roomId, userId, name, avatar, pinAdapter, position) => {
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
        },
      },
      environment: "dev",
    });

    const oppositeSide = position === "left" ? "right" : "left";

    const comments = new Comments(pinAdapter, {
      position,
      buttonLocation: `top-${oppositeSide}`,
    });

    room.addComponent(comments);
    setRoom(room);
  };

  const enter = async () => {
    const showcase = ref.current;
    const showcaseWindow = showcase.contentWindow;

    if (!showcaseWindow) return;
    const mpSdk = await showcaseWindow.MP_SDK.connect(showcaseWindow, MATTERPORT_KEY);

    const pinAdapter = new MatterportPin(mpSdk, showcase);
    await initMatterport(roomId, userId, name, avatar, pinAdapter, position);
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
      <section>
        <h1>View from "{name}" participant</h1>
        <iframe
          onLoad={enter}
          className={name.toLowerCase()}
          ref={ref}
          id={containerId}
          src={`/mp-bundle/showcase.html?&play=1&qs=1&applicationKey=${MATTERPORT_KEY}&m=${modelId}`}
        />
      </section>
    </>
  );
}
