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
      <>
        { showZeus && <ThreejsInstance name="Zeus" position="right" avatar="2" toggle={toggle} roomId={roomId} /> }
        { !showZeus && <ThreejsInstance name="Hera" position="left" avatar="5" toggle={toggle} roomId={roomId} /> }
      </>
  );
}

export default App;
