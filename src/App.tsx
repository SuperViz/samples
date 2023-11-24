import "./index.css";
import CommentsInstance from "./components/CommentsInstance";
import { useRef, useState } from "react";
import { LauncherFacade } from "@superviz/sdk";

function App() {
  const [showZeus, setShowZeus] = useState(true);
  const room1 = useRef<LauncherFacade>();
  const room2 = useRef<LauncherFacade>();

  const toggle = () => {
    setShowZeus(!showZeus);
  };

  const props = {
    name: showZeus ? "Zeus" : "Hera",
    position: showZeus ? "right" : "left",
    room: showZeus ? room1 : room2,
  } as { name: string; position: "left" | "right"; room: React.MutableRefObject<LauncherFacade | undefined> };

  return <CommentsInstance {...props} toggle={toggle} key={String(showZeus)} />;
}

export default App;
