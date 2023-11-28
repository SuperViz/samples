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

NOTE: inside the `js/` directory you can find the `vanilla/` directory, this contains samples using our SDK with CDN, meaning that SuperViz package is downloaded from `<script type="module" src="https://unpkg.com/@superviz/sdk@latest"></script>` and not using it as a package.

## Samples with JavaScript

| Component                            | CDN                                             | Vanilla | React                                             | Vue |
| ------------------------------------ | ----------------------------------------------- | ------- | ------------------------------------------------- | --- |
| Mouse Pointer                        | [Link](/js/cdn/mouse-pointers/)                 | 🔄️     | [Link](/js/react/mouse-pointers/)                 | 🔄️ |
| Real-time Data Engine                | 🔄️                                             | 🔄️     | [Link](/js/react/real-time-data-engine/)          | 🔄️ |
| Presence3D for AutoDesk              | [Link](/js/cdn/autodesk/)                       | 🔄️     | [Link](/js/react/autodesk/)                       | 🔄️ |
| Presence3D for Matteport             | [Link](/js/cdn/matterport/)                     | 🔄️     | [Link](/js/react/matterport/)                     | 🔄️ |
| Presence3D for ThreeJS               | [Link](/js/cdn/threejs/)                        | 🔄️     | [Link](/js/react/threejs/)                        | 🔄️ |
| Contextual Comments with HTML Canvas | [Link](/js/cdn/contextual-comments-html/)       | 🔄️     | [Link](/js/react/contextual-comments-html/)       | 🔄️ |
| Contextual Comments with AutoDesk    | 🔄️                                             | 🔄️     | [Link](/js/react/contextual-comments-autodesk/)   | 🔄️ |
| Contextual Comments with Matteport   | [Link](/js/cdn/contextual-comments-matterport/) | 🔄️     | [Link](/js/react/contextual-comments-matterport/) | 🔄️ |
| Contextual Comments with ThreeJS     | [Link](/js/cdn/contextual-comments-threejs/)    | 🔄️     | [Link](/js/react/contextual-comments-threejs/)    | 🔄️ |
| Video Conference                     | 🔄️                                             | 🔄️     | [Link](/js/react/video-conference/)               | 🔄️ |
| Who-is-Online                        | [Link](/js/cdn/who-is-online/)                  | 🔄️     | [Link](/js/react/who-is-online/)                  | 🔄️ |

## Samples with TypeScript

| Component                            | CDN | Vanilla | React                                             | Vue |
| ------------------------------------ | --- | ------- | ------------------------------------------------- | --- |
| Mouse Pointer                        | 🔄️ | 🔄️     | [Link](/ts/react/mouse-pointers/)                 | 🔄️ |
| Real-time Data Engine                | 🔄️ | 🔄️     | [Link](/ts/react/real-time-data-engine/)          | 🔄️ |
| Presence for AutoDesk                | 🔄️ | 🔄️     | [Link](/ts/react/autodesk/)                       | 🔄️ |
| Presence for Matteport               | 🔄️ | 🔄️     | [Link](/ts/react/matterport/)                     | 🔄️ |
| Presence for ThreeJS                 | 🔄️ | 🔄️     | [Link](/ts/react/threejs/)                        | 🔄️ |
| Contextual Comments with HTML Canvas | 🔄️ | 🔄️     | [Link](/ts/react/contextual-comments-html/)       | 🔄️ |
| Contextual Comments with AutoDesk    | 🔄️ | 🔄️     | [Link](/ts/react/contextual-comments-autodesk/)   | 🔄️ |
| Contextual Comments with Matteport   | 🔄️ | 🔄️     | [Link](/ts/react/contextual-comments-matterport/) | 🔄️ |
| Contextual Comments with ThreeJS     | 🔄️ | 🔄️     | [Link](/ts/react/contextual-comments-threejs/)    | 🔄️ |
| Video Conference                     | 🔄️ | 🔄️     | [Link](/ts/react/video-conference/)               | 🔄️ |
| Who-is-Online                        | 🔄️ | 🔄️     | [Link](/ts/react/who-is-online/)                  | 🔄️ |

## Project roadmap

This are the key features we are working on right now:

- Samples with JavaScript CDN - _in progress_
- Samples with React for both JavaScript and TypeScript - _in progress_
- Samples with Vanilla for both JavaScript and TypeScript - _planned_
- Samples with Vue for both JavaScript and TypeScript - _planned_

After that, we will be working on bringing the samples to more libraries and frameworks, such as Svelte and Angular.

Besides samples, we want this project to:

- GitOps to deploy each sample isolated to a different branch - _planned_
- Deploys to CodeSandbox - _planned_
- GitOps to update SuperViz SDK version before (in a separate branch) and after a new version is released - _planned_
- User Interface Automatic Tests - _planned_
