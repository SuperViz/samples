import { SuperVizRoomProvider } from "@superviz/react-sdk";

import Room from "./components/Room";
import { useState } from "react";
import Cards from "./components/Cards";

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
      <Room />
      <Cards loaded={loaded}/>
    </SuperVizRoomProvider>
  );
}

export default App;