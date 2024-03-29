import { SuperVizRoomProvider } from "@superviz/react-sdk";

import Room from "./components/Room";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const user = Math.floor(Math.random() * 10);
const groupId = "sv-sample-room-react-ts-presence-autodesk";
const groupName = "Sample Room for Presence Autodesk (React/TS)";
const roomId = 'samples-presence-autodesk-room';

function App() {
  return (
    <main>
      <SuperVizRoomProvider
        developerKey={DEVELOPER_KEY}
        group={{
          id: groupId,
          name: groupName,
        }}
        participant={{
          id: user.toString(),
          name: "John" + user,
        }}
        roomId={roomId}
      >
        <Room />
      </SuperVizRoomProvider>
    </main>
  );
}

export default App;