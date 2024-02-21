import { Comments, useMatterportPin } from "@superviz/react-sdk";
import { useEffect, useRef, useState } from "react";

function Room() {
  const [mpSdkInstance, setMpSdkInstance] = useState(null);
  const iframe = useRef(null);
  const modelId = '7ffnfBNamei';

  const { pin } = useMatterportPin({
    matterportInstance: mpSdkInstance,
    showcaseWindow: iframe.current,
  });

  const matterportKey = import.meta.env.VITE_MATTERPORT_KEY;

  useEffect(() => {
    const showcase = document.getElementById("showcase");
    const showcaseWindow = showcase.contentWindow;
    showcase.src=`/mp-bundle/showcase.html?&brand=0&mls=2&mt=0&search=0&kb=0&play=1&qs=1&applicationKey=${matterportKey}&m=${modelId}`

    if (showcaseWindow) return;

    showcase.addEventListener("load", async () => {
      const matterportSDK = await showcaseWindow.MP_SDK.connect(showcaseWindow);
      console.log('hahaha')
      setMpSdkInstance(matterportSDK);
    });
  }, []);

  return (
    <Comments pin={pin} >
      <iframe
        width="100%"
        height="100%"
        allow="xr-spatial-tracking"
        id="showcase"
        ref={iframe}
      ></iframe>
    </Comments>
  );
}

export default Room;