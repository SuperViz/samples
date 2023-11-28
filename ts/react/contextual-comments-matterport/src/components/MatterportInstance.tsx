import SuperVizRoom, { LauncherFacade } from "@superviz/sdk";
import { Comments } from "@superviz/sdk/lib/components";
import { MatterportPin } from "@superviz/matterport-plugin";
import { useRef, useState } from "react";

const modelId = "LmRnZAsWoxy";
const groupId = "sv-sample-room-react-ts-contextual-comments-matterport";
const groupName = "Sample Room with Contextual Comments for Matterport (React/TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const MATTERPORT_KEY = import.meta.env.VITE_MATTERPORT_KEY;

interface Props {
  name: string;
  toggle: () => void;
  roomId: string;
}

export default function MatterportInstance({ name, roomId, toggle }: Props) {
  const participantId = name.toLowerCase();
  const ref = useRef<any>(null);
  const [room, setRoom] = useState<LauncherFacade>();
  const [loaded, setLoaded] = useState(false);

  const initSuperVizWithMatterport = async (mpSdk: any, showcase: any) => {
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
        src={`/mp-bundle/showcase.html?&play=1&qs=1&applicationKey=${MATTERPORT_KEY}&m=${modelId}`}
      />
    </>
  );
}
