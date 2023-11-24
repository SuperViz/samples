import { useRef } from "react";
import MatterportInstance from "./components/MatterportInstance";
import { v4 as uuidv4 } from "uuid";

function App() {
  const roomId = useRef(uuidv4()).current;

  // We are initializing multiple rooms for demo purposes.
  return (
    <main>
      <MatterportInstance name="Zeus" roomId={roomId} avatar="5" />
      <MatterportInstance name="Hera" roomId={roomId} avatar="2" />
    </main>
  );
}

export default App;
