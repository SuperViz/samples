import { VideoConference } from "@superviz/react-sdk";

function Room() {
  const collabMode = {
    enabled: false,
  };

  return (
    <VideoConference
      participantType="host"
      collaborationMode={collabMode}
    ></VideoConference>
  );
}

export default Room;