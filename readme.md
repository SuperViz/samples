# Sample repository for SuperViz SDK

This project hosts samples for SuperViz SDK. To find out more about the SDK itself, please visit [the documentation](https://docs.superviz.com/).

## Getting started

The SDK documentation has extensive sections about [getting started](https://docs.superviz.com/getting-started/quickstart), setting up the SDK, as well as the process of acquiring the required developer key. You will need Developer Key keys to run the samples on your machines, you therefore should [follow the instructions on these pages](https://docs.superviz.com/getting-started/setting-account) before continuing.

## Build and run the samples

Every sample is a standalone project and can be built and run independently. The samples, in the `js/` directory are written in JavaScript. The samples in the `ts/` directory are written in TypeScript. Both can be built and run using the following commands:

```bash
npm install
npm start
```

or with Yarn:

```bash
yarn install
yarn start
```

Just make sure that you have the required developer keys in the `.env` file. For that copy the `.env.example` file to `.env` and fill in the values.

NOTE: inside the `js/` directory you can find the `cnd/` directory, this contains samples using our SDK with CDN, meaning that the SuperViz package is downloaded from `<script type="module" src="https://unpkg.com/@superviz/sdk@latest"></script>` and not using it as a package. It only has a package.json to run a local server, which can also be done with other tools.

## Samples with JavaScript

| Component                           | CDN                                           | Vanilla                                           | React                                           |
| ----------------------------------- | --------------------------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| Mouse Pointer                       | [🔗](/js/cdn/mouse-pointers/)                 | [🔗](/js/vanilla/mouse-pointers/)                 | [🔗](/js/react/mouse-pointers/)                 |
| Forms Editor                        | [🔗](/js/cdn/forms-editor/)                   | [🔗](/js/vanilla/forms-editor/)                   | [🔗](/js/react/forms-editor/)                   |
| Real-time Data Engine               | [🔗](/js/cdn/real-time-data-engine/)          | [🔗](/js/vanilla/realtime-data-engine/)           | [🔗](/js/react/real-time-data-engine/)          |
| Presence3D for Autodesk             | [🔗](/js/cdn/autodesk/)                       | [🔗](/js/vanilla/autodesk/)                       | [🔗](/js/react/autodesk/)                       |
| Presence3D for Matteport            | [🔗](/js/cdn/matterport/)                     | [🔗](/js/vanilla/matterport/)                     | [🔗](/js/react/matterport/)                     |
| Presence3D for ThreeJS              | [🔗](/js/cdn/threejs/)                        | [🔗](/js/vanilla/threejs/)                        | [🔗](/js/react/threejs/)                        |
| Contextual Comments with Canvas Pin | [🔗](/js/cdn/contextual-comments-canvas/)     | [🔗](/js/vanilla/contextual-comments-canvas/)     | [🔗](/js/react/contextual-comments-canvas/)     |
| Contextual Comments with HTML Pin   | [🔗](/js/cdn/contextual-comments-html/)       | [🔗](/js/vanilla/contextual-comments-html/)       | [🔗](/js/react/contextual-comments-html/)       |
| Contextual Comments with AutoDesk   | [🔗](/js/cdn/contextual-comments-autodesk/)   | [🔗](/js/vanilla/contextual-comments-autodesk/)   | [🔗](/js/react/contextual-comments-autodesk/)   |
| Contextual Comments with Matteport  | [🔗](/js/cdn/contextual-comments-matterport/) | [🔗](/js/vanilla/contextual-comments-matterport/) | [🔗](/js/react/contextual-comments-matterport/) |
| Contextual Comments with ThreeJS    | [🔗](/js/cdn/contextual-comments-threejs/)    | [🔗](/js/vanilla/contextual-comments-threejs/)    | [🔗](/js/react/contextual-comments-threejs/)    |
| Video Conference                    | [🔗](/js/cdn/video-conference/)               | [🔗](/js/vanilla/video-conference/)               | [🔗](/js/react/video-conference/)               |
| Who-is-Online                       | [🔗](/js/cdn/who-is-online/)                  | [🔗](/js/vanilla/who-is-online/)                  | [🔗](/js/react/who-is-online/)                  |

## Samples with TypeScript

| Component                           | Vanilla                                           | React                                           |
| ----------------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| Mouse Pointer                       | [🔗](/ts/vanilla/mouse-pointers/)                 | [🔗](/ts/react/mouse-pointers/)                 |
| Forms Editor                        | [🔗](/ts/vanilla/forms-editor/)                   | [🔗](/ts/react/forms-editor/)                   |
| Real-time Data Engine               | [🔗](/ts/vanilla/realtime-data-engine/)           | [🔗](/ts/react/real-time-data-engine/)          |
| Presence for Autodesk               | [🔗](/ts/vanilla/autodesk/)                       | [🔗](/ts/react/autodesk/)                       |
| Presence for Matteport              | [🔗](/ts/vanilla/matterport/)                     | [🔗](/ts/react/matterport/)                     |
| Presence for ThreeJS                | [🔗](/ts/vanilla/threejs/)                        | [🔗](/ts/react/threejs/)                        |
| Contextual Comments with Canvas Pin | [🔗](/ts/vanilla/contextual-comments-canvas/)     | [🔗](/ts/react/contextual-comments-html/)       |
| Contextual Comments with HTML Pin   | [🔗](/ts/vanilla/contextual-comments-html/)       | [🔗](/ts/react/contextual-comments-html/)       |
| Contextual Comments with AutoDesk   | [🔗](/ts/vanilla/contextual-comments-autodesk/)   | [🔗](/ts/react/contextual-comments-autodesk/)   |
| Contextual Comments with Matteport  | [🔗](/ts/vanilla/contextual-comments-matterport/) | [🔗](/ts/react/contextual-comments-matterport/) |
| Contextual Comments with ThreeJS    | [🔗](/ts/vanilla/contextual-comments-threejs/)    | [🔗](/ts/react/contextual-comments-threejs/)    |
| Video Conference                    | [🔗](/ts/vanilla/video-conference/)               | [🔗](/ts/react/video-conference/)               |
| Who-is-Online                       | [🔗](/ts/vanilla/who-is-online/)                  | [🔗](/ts/react/who-is-online/)                  |

## Project roadmap

These are the key features we are working on right now:

- Samples with Vue for both JavaScript and TypeScript - _planned_

After that, we will be working on bringing the samples to more libraries and frameworks, such as Svelte and Angular.

Besides samples, we want this project to:

- GitOps to update the SuperViz SDK version before (in a separate branch) and after a new version is released - _in progress_
- User Interface Automatic Tests - _planned_
