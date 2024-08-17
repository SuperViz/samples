import { SuperVizRoomProvider } from "@superviz/react-sdk";
import { sampleInfo } from "./projectInfo";

import MatterportCommentsImplementation from "./components/MatterportCommentsImplementation";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = sampleInfo.id;
const groupName = sampleInfo.name;
const participant = Math.floor(Math.random() * 100).toString().padStart(3, "0");

function App() {
  return (
    <SuperVizRoomProvider
      developerKey={DEVELOPER_KEY}
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
      <MatterportCommentsImplementation />
    </SuperVizRoomProvider>
  );
}

export default App;
