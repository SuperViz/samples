import { SuperVizRoomProvider } from "@superviz/react-sdk";
import { sampleInfo } from "./projectInfo";

import ContextualCommentsHtmlImplementation from "./components/ContextualCommentsHtmlImplementation.jsx";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const participant = Math.floor(Math.random() * 10);

const groupId = sampleInfo.id;
const groupName = sampleInfo.name;

function App() {
  console.log(packageJsonProjectName);
  return (
    <SuperVizRoomProvider
      developerKey={DEVELOPER_KEY}
      group={{
        id: groupId,
        name: groupName,
      }}
      participant={{
        id: participant.toString(),
        name: "John " + participant,
      }}
      roomId={groupId}
    >
      <ContextualCommentsHtmlImplementation />
    </SuperVizRoomProvider>
  );
}

export default App;
