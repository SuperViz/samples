import { SuperVizRoomProvider } from "@superviz/react-sdk";

import ContextualCommentsHtmlImplementation from "./components/ContextualCommentsHtmlImplementation.tsx";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const participant = Math.floor(Math.random() * 10);
const groupId = "sv-sample-room-react-js-presence-autodesk";
const groupName = "Sample Room for Presence Autodesk (React/TS)";
const roomId = "samples-presence-autodesk-room";

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
      roomId={roomId}
    >
      <ContextualCommentsHtmlImplementation />
    </SuperVizRoomProvider>
  );
}

export default App;
