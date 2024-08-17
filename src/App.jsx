import { SuperVizRoomProvider, VideoConference } from "@superviz/react-sdk";
import { sampleInfo } from "./projectInfo";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = sampleInfo.id;
const groupName = sampleInfo.name;
const participant = Math.floor(Math.random() * 100).toString().padStart(3, "0");

function App() {
  const collabMode = {
    enabled: false,
  };

  return (
    <SuperVizRoomProvider
      developerKey={DEVELOPER_KEY}
      debug={true}
      group={{
        id: groupId,
        name: groupName,
      }}
      participant={{
        id: participant,
        name: "John " + participant,
      }}
      roomId={groupId}
    >
      <VideoConference participantType="host" collaborationMode={collabMode}></VideoConference>
    </SuperVizRoomProvider>
  );
}

export default App;
