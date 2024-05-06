import { Realtime, SuperVizRoomProvider } from "@superviz/react-sdk";

import EventForm from "./components/EventForm";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const participant = Math.floor(Math.random() * 10);
const groupId = "sv-sample-room-react-js-real-time-data-engine";
const groupName = "Sample Room for Real-time Data Engine (React/JS)";

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
          name: "John" + participant,
        }}
        roomId={groupId}
      >
        <Realtime />
        <EventForm participantId={participant.toString()} />
      </SuperVizRoomProvider>
    </main>
  );
}

export default App;
