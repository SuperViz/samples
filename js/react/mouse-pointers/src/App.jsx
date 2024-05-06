import { SuperVizRoomProvider } from "@superviz/react-sdk";
import { MousePointers } from "@superviz/react-sdk";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-react-js-mouse-pointers";
const groupName = "Sample Room for Mouse Pointers (React/JS)";
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
      <MousePointers elementId="element-id" />
      <canvas id="element-id" />
    </SuperVizRoomProvider>
  );
}

export default App;
