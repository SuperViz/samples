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

| Component                            | CDN                                             | Vanilla | React                             | Vue | Angular |
| ------------------------------------ | ----------------------------------------------- | ------- | --------------------------------- | --- | ------- |
| Mouse Pointer                        | [Link](/js/cdn/mouse-pointers/)                 | 🔄️     | [Link](/js/react/mouse-pointers/) | 🔄️ | 🔄️     |
| Real-time Data Engine                | 🔄️                                             | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Presence3D for AutoDesk              | 🔄️                                             | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Presence3D for Matteport             | [Link](/js/cdn/matterport/)                     | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Presence3D for ThreeJS               | 🔄️                                             | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Contextual Comments with HTML Canvas | [Link](/js/cdn/contextual-comments-html/)       | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Contextual Comments with AutoDesk    | 🔄️                                             | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Contextual Comments with Matteport   | [Link](/js/cdn/contextual-comments-matterport/) | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Contextual Comments with ThreeJS     | 🔄️                                             | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Video Conference                     | 🔄️                                             | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Who-is-Online                        | 🔄️                                             | 🔄️     | [Link](/js/react/who-is-online/)  | 🔄️ | 🔄️     |

## Samples with TypeScript

| Component                            | CDN | Vanilla | React                             | Vue | Angular |
| ------------------------------------ | --- | ------- | --------------------------------- | --- | ------- |
| Mouse Pointer                        | 🔄️ | 🔄️     | [Link](/ts/react/mouse-pointers/) | 🔄️ | 🔄️     |
| Real-time Data Engine                | 🔄️ | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Presence for AutoDesk                | 🔄️ | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Presence for Matteport               | 🔄️ | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Presence for ThreeJS                 | 🔄️ | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Contextual Comments with HTML Canvas | 🔄️ | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Contextual Comments with AutoDesk    | 🔄️ | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Contextual Comments with Matteport   | 🔄️ | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Contextual Comments with ThreeJS     | 🔄️ | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Video Conference                     | 🔄️ | 🔄️     | 🔄️                               | 🔄️ | 🔄️     |
| Who-is-Online                        | 🔄️ | 🔄️     | [Link](/ts/react/who-is-online/)  | 🔄️ | 🔄️     |
