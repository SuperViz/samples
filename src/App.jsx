import { useRef } from "react";
import Canvas from "./components/Canvas";
import { v4 as uuidv4 } from "uuid";

function App() {
  const roomId = useRef(uuidv4()).current;

  // We are initializing two rooms for demo purposes.
  return (
    <>
      <Canvas name="Zeus" roomId={roomId} />
      <Canvas name="Hera" roomId={roomId} />
    </>
  );
}

export default App;
