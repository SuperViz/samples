import { SuperVizRoomProvider } from "@superviz/react-sdk";
import CanvasCommentsImplementation from "./components/CanvasCommentsImplementation";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const user = Math.floor(Math.random() * 10);
const groupId = "sv-sample-room-react-js-comments-canvas";
const groupName = "Sample Room for Contextual Comments Canvas (React/JS)";

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
            <CanvasCommentsImplementation />
        </SuperVizRoomProvider>
    );
}

export default App;
