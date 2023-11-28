const options = { applyScaling: 'meters' };

interface Doc {
    getRoot: () => {
        getDefaultGeometry: () => any;
    };
}

interface Parameters {
    viewerData: React.MutableRefObject<{ viewerDiv?: HTMLElement | undefined; viewer?: any; success: boolean; }>
}

export function onDocumentLoadSuccess({ viewerData }: Parameters) {
  return async (doc: Doc)=> {
    const viewable = doc.getRoot().getDefaultGeometry();
    if (!viewable) return;
        
    await viewerData.current.viewer.loadDocumentNode(doc, viewable, options)
  }
}

export async function onDocumentLoadFailure(error: number, message: string) {
    console.error(`Error loading forge model: ${error} - ${message}`);
}
