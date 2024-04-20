import { SuperVizRoomProvider, VideoConference } from "@superviz/react-sdk";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-react-js-presence-threejs";
const groupName = "Sample Room for Presence Video Conference (React/JS)";
const user = Math.floor(Math.random() * 100);

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
        id: user.toString(),
        name: "John " + user,
      }}
      roomId={groupId}
    >
      <VideoConference participantType="host" collaborationMode={collabMode}></VideoConference>
    </SuperVizRoomProvider>
  );
}

export default App;
