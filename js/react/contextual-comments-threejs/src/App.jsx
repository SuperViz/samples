import { useRef, useState } from "react";
import ThreeJSInstance from "./components/ThreejsInstance";
import { v4 as uuidv4 } from "uuid";

function App() {
  const roomId = useRef(uuidv4()).current;
  const [showZeus, setShowZeus] = useState(true)

  const toggle = () => {
    setShowZeus(!showZeus)
  }

  // We are initializing multiple rooms for demo purposes.
  return (
    <main>
      { showZeus && <ThreeJSInstance name="Zeus" position="left" roomId={roomId} toggle={toggle}/> }
      { !showZeus && <ThreeJSInstance name="Hera" position="right" roomId={roomId} toggle={toggle}/> }
    </main>
  );
}

export default App;
