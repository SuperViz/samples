import { onDocumentLoadSuccess, onDocumentLoadFailure } from "./forgeCallbacks";

export default async function forge({ participantId, viewerData } ) {
  const modelURN = "urn:adsk.objects:os.object:e8d17563-1a4e-4471-bd72-a0a7e8d719bc/fileifc.ifc";
  const modelID = btoa(modelURN);
  const FORGE_CLIENT = import.meta.env.VITE_CLIENT_ID;
  const FORGE_SECRET = import.meta.env.VITE_CLIENT_SECRET;
  const AUTH_URL = 'https://developer.api.autodesk.com/authentication/v1/authenticate';
  const documentId = `urn:${modelID}`;

  let data = {
    client_id: FORGE_CLIENT,
    client_secret: FORGE_SECRET,
    grant_type: 'client_credentials',
    scope: 'data:read bucket:read',
  };

  const teste = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString(),
  })

  const dataToken = await teste.json()

  const options = {
    env: 'AutodeskProduction2',
    api: 'streamingV2',
    accessToken: dataToken.access_token,
  };

  await window.Autodesk.Viewing.Initializer(options, async () => {
    viewerData.current.viewerDiv = document.getElementById(participantId);
    viewerData.current.viewer = new window.Autodesk.Viewing.GuiViewer3D(viewerData.current.viewerDiv);

    await viewerData.current.viewer.start();
    viewerData.current.viewer.setTheme('dark-theme');
    viewerData.current.viewer.setQualityLevel(false, false);
    viewerData.current.viewer.setGhosting(false);
    viewerData.current.viewer.setGroundShadow(false);
    viewerData.current.viewer.setGroundReflection(false);
    viewerData.current.viewer.setOptimizeNavigation(true);
    viewerData.current.viewer.setProgressiveRendering(true);

    await window.Autodesk.Viewing.Document.load(
      documentId,
      onDocumentLoadSuccess({ viewerData }),
      onDocumentLoadFailure,
    );

    viewerData.current.success = true;
  })

  return new Promise((resolve, reject)=> {
    setTimeout(()=> {
      if (viewerData.current.success) {
        resolve(viewerData);
      } else {
        reject(viewerData);
      }
    }, 500)
  })
}