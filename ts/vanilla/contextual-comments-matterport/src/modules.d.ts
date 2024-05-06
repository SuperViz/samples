declare module "*";

declare global {
  interface Window {
    MP_SDK: any;
  }
}

window.MP_SDK = window.MP_SDK || {};

export {};
