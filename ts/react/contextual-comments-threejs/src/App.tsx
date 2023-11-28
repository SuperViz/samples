import { useState } from "react";
import ThreeJSContainer from "./components/ThreejsInstance";

function App() {
  const roomId = "b2a6b164-91a6-4b18-a78a-05c0ba41d7ab";
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
