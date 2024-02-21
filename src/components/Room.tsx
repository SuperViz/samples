import { AutodeskViewer } from "@superviz/react-sdk";

export default function Room() {
  const forgeClientId = import.meta.env.VITE_CLIENT_ID;
  const forgeClientSecret = import.meta.env.VITE_CLIENT_SECRET;

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
