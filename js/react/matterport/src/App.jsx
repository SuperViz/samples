import { MatterportIframe, SuperVizRoomProvider } from "@superviz/react-sdk";
import { sampleInfo } from "./projectInfo";

const modelId = "7ffnfBNamei";
const MATTERPORT_KEY = import.meta.env.VITE_MATTERPORT_KEY;
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = sampleInfo.id;
const groupName = sampleInfo.name;
const participant = Math.floor(Math.random() * 100);

function App() {
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
      <section>
        <MatterportIframe
          width={window.innerWidth}
          height={window.innerHeight}
          bundleUrl={`/mp-bundle/showcase.html?&brand=0&mls=2&mt=0&search=0&kb=0&play=1&qs=1&applicationKey=${MATTERPORT_KEY}&m=${modelId}`}
          matterportKey={MATTERPORT_KEY}
        />
      </section>
    </SuperVizRoomProvider>
  );
}

export default App;
