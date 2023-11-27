declare module '*';

declare global {
    interface Window { Autodesk: any; }
}

window.Autodesk = window.Autodesk || {};

export{}