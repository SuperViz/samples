import { AutodeskViewer, SuperVizRoomProvider } from "@superviz/react-sdk";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const FORGE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const FORGE_CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const user = Math.floor(Math.random() * 10);
const groupId = "sv-sample-room-react-ts-presence-autodesk";
const groupName = "Sample Room for Presence Autodesk (React/TS)";

function App() {
  return (
    <main>
      <SuperVizRoomProvider
        developerKey={DEVELOPER_KEY}
        group={{
          id: groupId,
          name: groupName,
        }}
        participant={{
          id: user.toString(),
          name: "John" + user,
        }}
        roomId={groupName}
      >
        <section>
          <AutodeskViewer
            onViewerInitialized={({ viewer }) => {
              viewer.setTheme("dark-theme");
              viewer.setQualityLevel(false, false);
              viewer.setGhosting(false);
              viewer.setGroundShadow(false);
              viewer.setGroundReflection(false);
              viewer.setOptimizeNavigation(true);
              viewer.setProgressiveRendering(true);
            }}
            isAvatarsEnabled={true}
            isLaserEnabled={true}
            className="canvas"
            modelUrn="urn:adsk.objects:os.object:e8d17563-1a4e-4471-bd72-a0a7e8d719bc/fileifc.ifc"
            clientId={FORGE_CLIENT_ID}
            clientSecret={FORGE_CLIENT_SECRET}
          ></AutodeskViewer>
        </section>
      </SuperVizRoomProvider>
    </main>
  );
}

export default App;
