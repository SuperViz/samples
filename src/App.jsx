import { SuperVizRoomProvider } from "@superviz/react-sdk";

import Room from "./components/Room.tsx";
import { useState } from "react";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const user = Math.floor(Math.random() * 10);
const groupId = "sv-sample-room-react-js-presence-autodesk";
const groupName = "Sample Room for Presence Autodesk (React/JS)";
const roomId = 'samples-presence-autodesk-room';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <SuperVizRoomProvider
      developerKey={DEVELOPER_KEY}
      debug={true}
      group={{
        id: groupId,
        name: groupName,
      }}
      participant={{
        id: user.toString(),
        name: "John " + user,
      }}
      roomId={roomId}
      onParticipantJoined={()=> setLoaded(true)}

    >
      <Room loaded={loaded}/>
    </SuperVizRoomProvider>
  );
}

export default App;