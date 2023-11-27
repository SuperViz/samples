import { useEffect, useRef, useState } from "react";
import forge from "../utils/forge";
import initSuperVizRoomWithAutodesk from "../utils/initSupeVizRoom";
import { AutodeskPin } from "@superviz/autodesk-viewer-plugin";

export default function AutodeskInstance({ name, roomId, position, toggle, avatar }) {
  const participantId = `${name.toLowerCase()}-participant`;
  
  const loaded = useRef(false);
  const [room, setRoom] = useState();
  
  const viewerData = useRef({ success: false });

  useEffect(()=> {
    if (loaded.current) return;
    loaded.current = true;
    ( async ()=> {
      await forge({ participantId, viewerData });

      if (!viewerData.current?.success) return;
      const pinAdapter = new AutodeskPin(viewerData.current.viewer, viewerData.current.viewerDiv);

      const room = await initSuperVizRoomWithAutodesk({ pinAdapter, participant: name, participantId, roomId, avatar, position })
      setRoom(room);
    })();

  }, [loaded])

  const changeParticipant = ()=> {
    if (!room) return;

    room.destroy();
    toggle();
  }

  return (
    <>
      <div className="infos">
        <h1>View from "{name}" participant</h1>
        <button onClick={changeParticipant}>Change participant</button>
      </div>
      <div className="forge-container">
        <div id={`${name.toLowerCase()}-participant`} className="forge-viewer"></div>
      </div>
    </>
  );
}
