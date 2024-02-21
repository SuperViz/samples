import { SuperVizRoomProvider } from "@superviz/react-sdk";

import Room from "./components/Room";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-react-ts-autodesk-contextual-comments";
const groupName = "Sample Room for Matterport Contextual Comments (React/TS)";
const roomId = 'samples-autodesk-contextual-comments-room';
const user = Math.floor(Math.random() * 100);

function App() {
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
      roomId={roomId}
    >
      <Room />
    </SuperVizRoomProvider>
  );
}

export default App;