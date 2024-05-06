import { SuperVizRoomProvider } from "@superviz/react-sdk";
import CanvasCommentsImplementation from "./components/CanvasCommentsImplementation";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const participant = Math.floor(Math.random() * 10);
const groupId = "sv-sample-room-react-ts-comments-canvas";
const groupName = "Sample Room for Contextual Comments Canvas (React/TS)";

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
      <CanvasCommentsImplementation />
    </SuperVizRoomProvider>
  );
}

export default App;
