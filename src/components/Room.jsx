import { Comments, useAutodeskPin } from "@superviz/react-sdk";
import { useEffect, useRef } from "react";

function Room() {
  const viewer = useRef()
  const loaded = useRef(false);

  const { pin } = useAutodeskPin({
    autodeskInstance: viewer.current,
  });

  function InitParticipantAutodesk() {
    const modelURN =
      "urn:adsk.objects:os.object:e8d17563-1a4e-4471-bd72-a0a7e8d719bc/fileifc.ifc";
    const modelID = btoa(modelURN);
    const FORGE_CLIENT = import.meta.env.VITE_CLIENT_ID;
    const FORGE_SECRET = import.meta.env.VITE_CLIENT_SECRET;
    const AUTH_URL =
      "https://developer.api.autodesk.com/authentication/v2/token";
    const documentId = `urn:${modelID}`;
    const token = btoa(`${FORGE_CLIENT}:${FORGE_SECRET}`);

    let data = {
      grant_type: "client_credentials",
      scope: "data:read bucket:read",
    };

    const contentSection = document.getElementById("viewer");

    fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${token}`,
      },
      body: new URLSearchParams(data).toString(),
    })
      .then((res) => {
        return res.json();
      })
      .then((dataToken) => {
        const options = {
          env: "AutodeskProduction2",
          api: "streamingV2",
          accessToken: dataToken.access_token,
        };

        window.Autodesk.Viewing.Initializer(options, async () => {
          viewer.current = new window.Autodesk.Viewing.GuiViewer3D(contentSection);
          await viewer.current.start();

          viewer.current.setTheme("dark-theme");
          viewer.current.setQualityLevel(false, false);
          viewer.current.setGhosting(false);
          viewer.current.setGroundShadow(false);
          viewer.current.setGroundReflection(false);
          viewer.current.setOptimizeNavigation(true);
          viewer.current.setProgressiveRendering(true);
          window.Autodesk.Viewing.Document.load(
            documentId,
            onDocumentLoadSuccess,
            onDocumentLoadFailure
          );
        });
      });

    function onDocumentLoadSuccess(doc) {
      const viewable = doc.getRoot().getDefaultGeometry();
      if (viewable) {
        viewer.current
          .loadDocumentNode(doc, viewable, {
            applyScaling: "meters",
          })
          .then((result) => {
            console.log(result);
            // initSuperVizRoomWithAutodesk(viewer, contentSection);
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      }
    }
    function onDocumentLoadFailure(error, message) {
      console.error(`Error loading forge model: ${error} - ${message}`);
    }
  }
  
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    InitParticipantAutodesk();
  }, []);

  return (
    <>
      <Comments pin={pin} buttonLocation="top-right" position="left">
        <div id="viewer" className="forge-viewer"></div>
      </Comments>
    </>
  );
}

export default Room;