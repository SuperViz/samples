import SuperVizRoom from "@superviz/sdk";
import { Comments, CanvasPin } from "@superviz/sdk/lib/components";
import { useEffect, useRef, useState } from "react";

const roomId = "349105d6-3a67-41a9-9b74-59127fd115d9";
const groupId = "sv-sample-room-react-ts-contextual-comments-html";
const groupName = "Sample Room for Contextual Comments for HTML (React/TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

export default function CommentsInstance({ name, toggle }) {
  const participantId = name.toLowerCase();
  const loaded = useRef(false);
  const [room, setRoom] = useState();

  const initSuperVizWithComments = async (room) => {
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
    });

    const pinAdapter = new CanvasPin(`${participantId}-participant`);
    const comments = new Comments(pinAdapter, { position: "left", buttonLocation: "top-left" });

    room.addComponent(comments);

    setRoom(room);
  };

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    (async () => {
      await initSuperVizWithComments(room);
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
      <h1>View from "{name}" participant</h1>
      <canvas id={`${participantId}-participant`} className={participantId}></canvas>
    </>
  );
}
