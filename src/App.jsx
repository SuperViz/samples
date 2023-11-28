import { useRef, useState } from "react";
import MatterportInstance from "./components/MatterportInstance";
import { v4 as uuidv4 } from "uuid";

function App() {
  const roomId = useRef(uuidv4()).current;

  const [showZeus, setShowZeus] = useState(true);

  const toggle = () => {
    setShowZeus(!showZeus);
  };

  // We are initializing multiple rooms for demo purposes.
  return (
    <main>
      {showZeus && <MatterportInstance name="Zeus" toggle={toggle} roomId={roomId} />}
      {!showZeus && <MatterportInstance name="Hera" toggle={toggle} roomId={roomId} />}
    </main>
  );
}

export default App;
