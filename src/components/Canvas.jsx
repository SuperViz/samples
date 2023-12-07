import SuperVizRoom from "@superviz/sdk";
import { MousePointers } from "@superviz/sdk/lib/components";

import { useRef } from "react";
import { useEffect } from "react";

const groupId = "sv-sample-room-react-mouse-pointers";
const groupName = "Sample Room for Mouse Pointers (React + TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

export default function Canvas({ name, roomId }) {
  const canvasId = name + "-canvas";
  const participantId = canvasId.toLowerCase();
  const loaded = useRef(false);

  async function IntitializeSuperViz() {
    const room = await SuperVizRoom(DEVELOPER_KEY, {
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

    const mousePointer = new MousePointers(canvasId);
    room.addComponent(mousePointer);
  }

  useEffect(() => {
    if (loaded.current) return;

    IntitializeSuperViz();

    return () => {
      loaded.current = true;
    };
  }, [canvasId, name, roomId, participantId]);

  return (
    <section>
      <h1>View from "{name}" participant</h1>
      <canvas id={canvasId} />
    </section>
  );
}
