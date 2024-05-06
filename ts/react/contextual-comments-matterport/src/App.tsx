import { SuperVizRoomProvider } from "@superviz/react-sdk";

import MatterportCommentsImplementation from "./components/MatterportCommentsImplementation";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-react-ts-autodesk-contextual-comments";
const groupName = "Sample Room for Matterport Contextual Comments (React/TS)";
const participant = Math.floor(Math.random() * 100);

function App() {
  return (
    <SuperVizRoomProvider
      developerKey={DEVELOPER_KEY}
      group={{
        id: groupId,
        name: groupName,
      }}
      participant={{
        id: participant.toString(),
        name: "John " + participant,
      }}
      roomId={groupId}
    >
      <MatterportCommentsImplementation />
    </SuperVizRoomProvider>
  );
}

export default App;
