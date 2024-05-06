import { SuperVizRoomProvider, VideoConference } from "@superviz/react-sdk";
import { sampleInfo } from "./projectInfo";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = sampleInfo.id;
const groupName = sampleInfo.name;
const particpant = Math.floor(Math.random() * 100);

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
        id: particpant.toString(),
        name: "John " + particpant,
      }}
      roomId={groupId}
    >
      <VideoConference participantType="host" collaborationMode={collabMode}></VideoConference>
    </SuperVizRoomProvider>
  );
}

export default App;
