import { SuperVizRoomProvider } from "@superviz/react-sdk";
import Room from "./components/Room";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-react-js-who-is-online";
const groupName = "Sample Room for Who-is-Online (React/JS)";

function App() {
  const roomId = 'samples-who-is-online-room';
  const user = Math.floor(Math.random() * 100);

  // We are initializing multiple rooms for demo purposes.
  return (
    <main>
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
    </main>
  );
}

export default App;
