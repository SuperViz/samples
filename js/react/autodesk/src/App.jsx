import { useRef } from "react";
import ThreejsInstance from "./components/ThreeJSInstance";
import { v4 as uuidv4 } from "uuid";

function App() {
  const roomId = useRef(uuidv4()).current;

  // We are initializing multiple rooms for demo purposes.
  return (
      <>
        <ThreejsInstance name="Zeus" roomId={roomId} />
        <ThreejsInstance name="Hera" roomId={roomId} />
      </>
  );
}

export default App;