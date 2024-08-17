import { SuperVizRoomProvider } from "@superviz/react-sdk";
import CanvasCommentsImplementation from "./components/CanvasCommentsImplementation";
import { sampleInfo } from "./projectInfo";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const participant = Math.floor(Math.random() * 10);
const groupId = sampleInfo.id;
const groupName = sampleInfo.name;

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
      <CanvasCommentsImplementation />
    </SuperVizRoomProvider>
  );
}

export default App;
