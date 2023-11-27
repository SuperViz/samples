import SuperVizRoom, { LauncherFacade } from "@superviz/sdk";
import { Comments, CanvasPin } from "@superviz/sdk/lib/components";
import { useEffect, useRef, useState } from "react";

const roomId = "349105d6-3a67-41a9-9b74-59127fd115d9";
const groupId = "sv-sample-room-react-ts-contextual-comments-html";
const groupName = "Sample Room for Contextual Comments for HTML (React/TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

interface Props {
  name: string;
  position: "left" | "right";
  toggle: () => void;
}

export default function CommentsInstance({ name, position, toggle }: Props) {
  const participantId = name.toLowerCase();
  const loaded = useRef<boolean>(false);
  const [room, setRoom] = useState<LauncherFacade>();

  const initSuperVizWithComments = async (room: LauncherFacade | undefined, position: "left" | "right") => {
    room = await SuperVizRoom(DEVELOPER_KEY, {
      roomId: roomId,
      group: {
        id: groupId,
        name: groupName,
      },
      participant: {
        id: participantId,
        name: name,
      },
      environment: "dev" as any,
    });

    const pinAdapter = new CanvasPin(`${participantId}-participant`);
    const comments = new Comments(pinAdapter, { position, buttonLocation: `top-${position}` });

    room.addComponent(comments);

    setRoom(room as LauncherFacade);
  };

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    (async () => {
      await initSuperVizWithComments(room, position);
    })();
  }, []);

  const destroy = () => {
    if (room) {
      room.destroy();
      toggle();
    }
  };

  return (
    <>
      <button onClick={destroy}>Change participant</button>
      <section>
        <h1>View from "{name}" participant</h1>
        <canvas id={`${participantId}-participant`} className={participantId}></canvas>
      </section>
    </>
  );
}