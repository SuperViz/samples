import { Comments, useMatterportPin } from "@superviz/react-sdk";
import { useEffect, useState } from "react";

function Room() {
  const [mpSdkInstance, setMpSdkInstance] = useState(null);
  const modelId = '7ffnfBNamei';

  const { pin } = useMatterportPin({
    matterportInstance: mpSdkInstance!,
    showcaseWindow: document.getElementById("showcase") as HTMLIFrameElement,
  });

  const matterportKey = import.meta.env.VITE_MATTERPORT_KEY;

  useEffect(() => {
    const showcase = document.getElementById("showcase") as HTMLIFrameElement;
    const showcaseWindow = showcase!.contentWindow;
    showcase!.src=`/mp-bundle/showcase.html?&brand=0&mls=2&mt=0&search=0&kb=0&play=1&qs=1&applicationKey=${matterportKey}&m=${modelId}`

    if (!showcaseWindow) return;

    showcase!.addEventListener("load", async () => {
      const matterportSDK = await (showcaseWindow as any).MP_SDK.connect(showcaseWindow);
      setMpSdkInstance(matterportSDK);
    });
  }, []);

  return (
    <Comments pin={pin} />
  );
}

export default Room;