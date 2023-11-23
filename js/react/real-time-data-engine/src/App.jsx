import { useRef } from "react";
import RealtimeParticipant from "./components/RealtimeParticipant";
import { v4 as uuidv4 } from "uuid";

function App() {
  const roomId = useRef(uuidv4()).current;

  // We are initializing multiple rooms for demo purposes.
  return (
    <main>
      <RealtimeParticipant name="Zeus" roomId={roomId} />
      <RealtimeParticipant name="Hera" roomId={roomId} />
    </main>
  );
}

export default App;
