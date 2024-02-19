import { useSuperVizRoom, VideoConference } from "@superviz/react-sdk";
import { useEffect } from "react";

function Room() {
  const { startRoom, stopRoom, hasJoinedRoom } = useSuperVizRoom();

  const collabMode = {
    enabled: "false",
  };

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
    <VideoConference
      participantType="host"
      collaborationMode={collabMode}
    ></VideoConference>
  );
}

export default Room;