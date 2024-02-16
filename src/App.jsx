import Room from "./components/Room";
import { SuperVizRoomProvider } from "@superviz/react-sdk";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-react-mouse-pointers";
const groupName = "Sample Room for Mouse Pointers (React + TS)";

function App() {
  const roomId = "samples-mouse-pointers-room";
  const user = Math.floor(Math.random() * 100);

  return (
    <SuperVizRoomProvider
      developerKey={DEVELOPER_KEY}
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
