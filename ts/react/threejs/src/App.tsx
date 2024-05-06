import { SuperVizRoomProvider } from "@superviz/react-sdk";

import ThreeJSImplementation from "./components/ThreeJSImplementation";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-react-js-presence-threejs";
const groupName = "Sample Room for Presence ThreeJs (React/JS)";
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
      <ThreeJSImplementation />
    </SuperVizRoomProvider>
  );
}

export default App;
