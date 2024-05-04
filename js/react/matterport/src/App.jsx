import { MatterportIframe, SuperVizRoomProvider } from "@superviz/react-sdk";

const modelId = "7ffnfBNamei";
const MATTERPORT_KEY = import.meta.env.VITE_MATTERPORT_KEY;
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-react-js-presence-matterport";
const groupName = "Sample Room for Presence Matterport (React/JS)";
const user = Math.floor(Math.random() * 100);

function App() {
  return (
    <SuperVizRoomProvider
      developerKey={DEVELOPER_KEY}
      group={{
        id: groupId,
        name: groupName,
      }}
      participant={{
        id: user.toString(),
        name: "John " + user,
      }}
      roomId={groupId}
    >
      <section>
        <MatterportIframe
          width={window.innerWidth}
          height={window.innerHeight}
          bundleUrl={`/mp-bundle/showcase.html?&brand=0&mls=2&mt=0&search=0&kb=0&play=1&qs=1&applicationKey=${MATTERPORT_KEY}&m=${modelId}`}
          MATTERPORT_KEY={MATTERPORT_KEY}
        />
      </section>
    </SuperVizRoomProvider>
  );
}

export default App;
