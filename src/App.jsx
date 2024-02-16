import { SuperVizRoomProvider } from "@superviz/react-sdk";

import Room from "./components/Room";
import { useState } from "react";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

const roomId = "123435";
const user = Math.floor(Math.random() * 10);

function App() {
  const [participantId, setParticipantId] = useState(null);

  const joinedRoom = (e) => {
    console.log("JOINED", e.id);

    setParticipantId(e.id);
  };

  return (
    <main>
      <SuperVizRoomProvider
        developerKey={DEVELOPER_KEY}
        debug={true}
        group={{
          id: "react-sdk-group",
          name: "react sdk",
        }}
        participant={{
          id: user.toString(),
          name: "John Doe",
        }}
        environment="dev"
        roomId={roomId}
        onParticipantLocalJoined={joinedRoom}
      >
        <Room participantId={participantId} />
      </SuperVizRoomProvider>
    </main>
  );
}

export default App;