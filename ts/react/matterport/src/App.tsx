import MatterportInstance from "./components/MatterportInstance";
import { v4 as uuidv4 } from "uuid";

function App() {
  const roomId = uuidv4();
  // We are initializing multiple rooms for demo purposes.
  return (
    <main>
      <MatterportInstance name="Zeus" roomId={roomId} />
      <MatterportInstance name="Hera" roomId={roomId} />
    </main>
  );
}

export default App;
