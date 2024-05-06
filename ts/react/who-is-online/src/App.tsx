import { SuperVizRoomProvider, WhoIsOnline } from "@superviz/react-sdk";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-react-ts-who-is-online";
const groupName = "Sample Room for Who-is-Online (React/TS)";
const participant = Math.floor(Math.random() * 100);

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
          id: participant.toString(),
          name: "John " + participant,
        }}
        roomId={groupId}
      >
        <WhoIsOnline position="container" />
        <div id="container" />
      </SuperVizRoomProvider>
    </main>
  );
}

export default App;
