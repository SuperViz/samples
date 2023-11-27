import { useState } from "react";
import ThreeJSContainer from "./components/ThreejsInstance";

function App() {
  const [showZeus, setShowZeus] = useState(true);

  const toggle = () => {
    setShowZeus(!showZeus);
  };

  // We are initializing multiple rooms for demo purposes.
  return (
    <main>
      {showZeus && <ThreeJSContainer name="Zeus" toggle={toggle} />}
      {!showZeus && <ThreeJSContainer name="Hera" toggle={toggle} />}
    </main>
  );
}

export default App;
