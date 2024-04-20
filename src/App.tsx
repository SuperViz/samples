import { Realtime, SuperVizRoomProvider } from "@superviz/react-sdk";

import EventForm from "./components/EventForm";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const user = Math.floor(Math.random() * 10);
const groupId = "sv-sample-room-react-ts-real-time-data-engine";
const groupName = "Sample Room for Real-time Data Engine (React/TS)";

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
        roomId={groupId}
      >
        <Realtime />
        <EventForm participantId={user.toString()} />
      </SuperVizRoomProvider>
    </main>
  );
}

export default App;
