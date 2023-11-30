import { useRef } from "react";
import AutodeskInstance from "./components/AutodeskInstance";
import { v4 as uuidv4 } from "uuid";

function App() {
  const roomId = useRef(uuidv4()).current;

  // We are initializing multiple rooms for demo purposes.
  return (
    <main>
      <AutodeskInstance name="Zeus" roomId={roomId} />
      <AutodeskInstance name="Hera" roomId={roomId} />
    </main>
  );
}

export default App;
