import {
  MatterportIframe,
  useSuperVizRoom,
} from "@superviz/react-sdk";
import { useEffect } from "react";

function Room() {
  const { startRoom, stopRoom, hasJoinedRoom } = useSuperVizRoom();
  const modelId = "LmRnZAsWoxy";
  const matterportKey = import.meta.env.VITE_MATTERPORT_KEY;

  // This effect will start the room when the component is mounted
  // and stop the room when the component is unmounted
  useEffect(() => {
    if (!startRoom || hasJoinedRoom) return;

    startRoom();

    return () => {
      if (!stopRoom || !hasJoinedRoom) return;

      stopRoom();
    };
  }, [startRoom, stopRoom]);

  return (
    <section>
      <MatterportIframe
        width={window.innerWidth}
        height={window.innerHeight}
        bundleUrl={`/mp-bundle/showcase.html?&brand=0&mls=2&mt=0&search=0&kb=0&play=1&qs=1&applicationKey=${matterportKey}&m=${modelId}`}
        matterportKey={matterportKey}
      />
    </section>
  );
}

export default Room;


