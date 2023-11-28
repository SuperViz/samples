import { Presence3D } from "@superviz/autodesk-viewer-plugin";
import { useEffect, useRef } from "react";
import forge from "../utils/forge";
import initSuperVizRoomWithAutodesk from "../utils/initSupeVizRoom";

interface Props {
  name: string;
  roomId: string
  avatar: string
}

export default function AutodeskInstance({ name, roomId, avatar }: Props) {
  const participantId = `${name.toLowerCase()}-participant`;
  
  const loaded = useRef(false);
  const GuiViewer3D = window.Autodesk.Viewing.GuiViewer3D;

  const viewerData = useRef<{ viewerDiv?: HTMLElement, viewer?: typeof GuiViewer3D, success: boolean }>({ success: false });

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    ( async ()=> {
      await forge({ participantId, viewerData });

      if (!viewerData.current?.success) return;
      
      const autodeskPresence = new Presence3D(viewerData.current.viewer, {
        isAvatarsEnabled: true,
        isLaserEnabled: false,
        isNameEnabled: true,
        avatarConfig: {
          height: 0,
          scale: 10,
          laserOrigin: { x: 0, y: 0, z: 0 },
        },
      });

       await initSuperVizRoomWithAutodesk({ autodeskPresence, participant: name, participantId, roomId, avatar })
    })();

  }, [loaded])

  return (
    <section>
      <h1>View from "{name}" participant</h1>
      <div id={`${name.toLowerCase()}-participant`}></div>
    </section>
  );
}
