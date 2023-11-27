const options = { applyScaling: 'meters' };

export function onDocumentLoadSuccess({ viewerData }) {
  return async (doc)=> {
    const viewable = doc.getRoot().getDefaultGeometry();
    if (!viewable) return;
        
    await viewerData.current.viewer.loadDocumentNode(doc, viewable, options)
  }
}

export async function onDocumentLoadFailure(error, message) {
    console.error(`Error loading forge model: ${error} - ${message}`);
}
