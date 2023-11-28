import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ThreeJSContainer from "./components/ThreejsInstance";

function App() {
  const roomId = uuidv4();
  const [showZeus, setShowZeus] = useState(true);

  const toggle = () => {
    setShowZeus(!showZeus);
  };

  // We are initializing multiple rooms for demo purposes.
  return (
    <main>
      {showZeus && <ThreeJSContainer name="Zeus" toggle={toggle} roomId={roomId} />}
      {!showZeus && <ThreeJSContainer name="Hera" toggle={toggle} roomId={roomId} />}
    </main>
  );
}

export default App;
