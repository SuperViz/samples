import { useRef, useState } from "react";
import ThreejsInstance from "./components/AutodeskInstance";
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
      {showZeus && <ThreejsInstance name="Zeus" toggle={toggle} roomId={roomId} />}
      {!showZeus && <ThreejsInstance name="Hera" toggle={toggle} roomId={roomId} />}
    </main>
  );
}

export default App;
