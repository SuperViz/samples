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

NOTE: inside the `js/` directory you can find the `vanilla/` directory, this contains samples using our SDK with CDN, meaning that the SuperViz package is downloaded from `<script type="module" src="https://unpkg.com/@superviz/sdk@latest"></script>` and not using it as a package.

## Samples with JavaScript

| Component                           | CDN                                             | Vanilla | React                                             | Vue                               |
| ----------------------------------- | ----------------------------------------------- | ------- | ------------------------------------------------- | --------------------------------- |
| Mouse Pointer                       | [Link](/js/cdn/mouse-pointers/)                 | 🔄️     | [🔗](/js/react/mouse-pointers/)                   | [Link](/js/vue/mouse-pointers/)   |
| Real-time Data Engine               | [Link](/js/cdn/real-time-data-engine/)          | 🔄️     | [Link](/js/react/real-time-data-engine/)          | 🔄️                               |
| Presence3D for AutoDesk             | [Link](/js/cdn/autodesk/)                       | 🔄️     | [Link](/js/react/autodesk/)                       | 🔄️                               |
| Presence3D for Matteport            | [Link](/js/cdn/matterport/)                     | 🔄️     | [Link](/js/react/matterport/)                     | 🔄️                               |
| Presence3D for ThreeJS              | [Link](/js/cdn/threejs/)                        | 🔄️     | [Link](/js/react/threejs/)                        | 🔄️                               |
| Contextual Comments with Canvas Pin | [Link](/js/cdn/contextual-comments-html/)       | 🔄️     | [Link](/js/react/contextual-comments-html/)       | 🔄️                               |
| Contextual Comments with HTML Pin   | 🔄️                                             | 🔄️     | 🔄️                                               | 🔄️                               |
| Contextual Comments with AutoDesk   | [Link](/js/cdn/contextual-comments-autodesk/)   | 🔄️     | [Link](/js/react/contextual-comments-autodesk/)   | 🔄️                               |
| Contextual Comments with Matteport  | [Link](/js/cdn/contextual-comments-matterport/) | 🔄️     | [Link](/js/react/contextual-comments-matterport/) | 🔄️                               |
| Contextual Comments with ThreeJS    | [Link](/js/cdn/contextual-comments-threejs/)    | 🔄️     | [Link](/js/react/contextual-comments-threejs/)    | 🔄️                               |
| Video Conference                    | [Link](/js/cdn/video-conference/)               | 🔄️     | [Link](/js/react/video-conference/)               | [Link](/js/vue/video-conference/) |
| Who-is-Online                       | [Link](/js/cdn/who-is-online/)                  | 🔄️     | [Link](/js/react/who-is-online/)                  | [Link](/js/vue/who-is-online/)    |

## Samples with TypeScript

| Component                           | Vanilla                             | React                                           | Vue                               |
| ----------------------------------- | ----------------------------------- | ----------------------------------------------- | --------------------------------- |
| Mouse Pointer                       | [🔗](/ts/vanilla/mouse-pointers/)   | [🔗](/ts/react/mouse-pointers/)                 | [Link](/ts/vue/mouse-pointers/)   |
| Real-time Data Engine               | 🔄️                                 | [🔗](/ts/react/real-time-data-engine/)          | 🔄️                               |
| Presence for AutoDesk               | 🔄️                                 | [🔗](/ts/react/autodesk/)                       | 🔄️                               |
| Presence for Matteport              | 🔄️                                 | [🔗](/ts/react/matterport/)                     | 🔄️                               |
| Presence for ThreeJS                | 🔄️                                 | [🔗](/ts/react/threejs/)                        | 🔄️                               |
| Contextual Comments with Canvas Pin | 🔄️                                 | [🔗](/ts/react/contextual-comments-html/)       | 🔄️                               |
| Contextual Comments with HTML Pin   | 🔄️                                 | 🔄️                                             | 🔄️                               |
| Contextual Comments with AutoDesk   | 🔄️                                 | [🔗](/ts/react/contextual-comments-autodesk/)   | 🔄️                               |
| Contextual Comments with Matteport  | 🔄️                                 | [🔗](/ts/react/contextual-comments-matterport/) | 🔄️                               |
| Contextual Comments with ThreeJS    | 🔄️                                 | [🔗](/ts/react/contextual-comments-threejs/)    | 🔄️                               |
| Video Conference                    | [🔗](/ts/vanilla/video-conference/) | [🔗](/ts/react/video-conference/)               | [Link](/js/vue/video-conference/) |
| Who-is-Online                       | [🔗](/ts/vanilla/who-is-online/)    | [🔗](/ts/react/who-is-online/)                  | [Link](/ts/vue/who-is-online/)    |

## Project roadmap

These are the key features we are working on right now:

- Samples with Vanilla for both JavaScript and TypeScript - _planned_
- Samples with Vue for both JavaScript and TypeScript - _planned_

After that, we will be working on bringing the samples to more libraries and frameworks, such as Svelte and Angular.

Besides samples, we want this project to:

- GitOps to update the SuperViz SDK version before (in a separate branch) and after a new version is released - _in progress_
- User Interface Automatic Tests - _planned_
