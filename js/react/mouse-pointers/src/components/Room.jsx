import { MousePointers, useSuperVizRoom } from "@superviz/react-sdk";
import { useEffect } from "react";

function Room() {
  const { startRoom, stopRoom, isJoinedRoom } = useSuperVizRoom();

  // This effect will start the room when the component is mounted
  // and stop the room when the component is unmounted
  useEffect(() => {
    if (!startRoom || isJoinedRoom) return;

    startRoom();

    return () => {
      if (!stopRoom || !isJoinedRoom) return;

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
