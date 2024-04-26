import { SuperVizRoomProvider } from "@superviz/react-sdk";

import ContextualCommentsThreeJSImplementation from "./components/ContextualCommentsThreeJSImplementation";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-react-js-threejs-contextual-comments";
const groupName = "Sample Room for ThreeJs Contextual Comments (React/JS)";
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
            <ContextualCommentsThreeJSImplementation />
        </SuperVizRoomProvider>
    );
}

export default App;
