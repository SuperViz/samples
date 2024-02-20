import { MousePointers, useSuperVizRoom } from "@superviz/react-sdk";
import { useEffect } from "react";

function Room() {
  const { startRoom, stopRoom, hasJoinedRoom } = useSuperVizRoom();

  // This effect will start the room when the component is mounted
  // and stop the room when the component is unmounted
  useEffect(() => {
    if (!startRoom || hasJoinedRoom) return;

    startRoom();

    return () => {
      if (!stopRoom || !hasJoinedRoom) return;

      stopRoom();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MousePointers elementId="element-id">
      <canvas id="element-id"></canvas>
    </MousePointers>
  );
}

export default Room;
