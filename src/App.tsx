import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SuperVizRoom from "@superviz/sdk";
import { VideoConference } from "@superviz/sdk/lib/components";

const roomId = uuidv4();
const groupId = "sv-sample-room-react-ts-video-conference";
const groupName = "Sample Room for Video Conference (React/TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

function App() {
  const [isRunning, setIsRunning] = useState(false);

  const initSuperVizRoom = async () => {
    setIsRunning(true);
    const room = await SuperVizRoom(DEVELOPER_KEY, {
      roomId: roomId,
      group: {
        id: groupId,
        name: groupName,
      },
      participant: {
        id: "zeus",
        name: "Zeus",
      },
    });

    const video = new VideoConference({
      participantType: "host",
    });

    room.addComponent(video);
  };

  return (
    <button disabled={isRunning} onClick={() => initSuperVizRoom()}>
      Join Video Conference
    </button>
  );
}

export default App;
