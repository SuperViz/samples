import { AutodeskViewer, useSuperVizRoom } from "@superviz/react-sdk";
import { useEffect } from "react";

export default function Room() {
  const { startRoom, stopRoom, hasJoinedRoom } = useSuperVizRoom();
  const forgeClientId = import.meta.env.VITE_CLIENT_ID;
  const forgeClientSecret = import.meta.env.VITE_CLIENT_SECRET;

    // This effect will start the room when the component is mounted
  // and stop the room when the component is unmounted
  useEffect(() => {
    if (!startRoom || hasJoinedRoom) return;

    startRoom();

    return () => {
      if (!stopRoom || !hasJoinedRoom) return;

      stopRoom();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
        clientId={forgeClientId}
        clientSecret={forgeClientSecret}
      ></AutodeskViewer>
    </section>
  );
}
