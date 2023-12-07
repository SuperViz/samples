import { useRef } from "react";
import MousePointer from "./components/MousePointer";
import { v4 as uuidv4 } from "uuid";

function App() {
  const roomId = useRef(uuidv4()).current;

  // We are initializing two rooms for demo purposes.
  return (
    <>
      <MousePointer name="Zeus" roomId={roomId} />
      <MousePointer name="Hera" roomId={roomId} />
    </>
  );
}

export default App;
