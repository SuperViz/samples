import { MatterportIframe } from "@superviz/react-sdk";

function Room() {
  const modelId = "7ffnfBNamei";

  const matterportKey = import.meta.env.VITE_MATTERPORT_KEY;

  return (
    <section>
      <MatterportIframe
        width={window.innerWidth}
        height={window.innerHeight}
        bundleUrl={`/mp-bundle/showcase.html?&brand=0&mls=2&mt=0&search=0&kb=0&play=1&qs=1&applicationKey=${matterportKey}&m=${modelId}`}
        matterportKey={matterportKey}
      />
    </section>
  );
}

export default Room;


