import { WhoIsOnline } from "@superviz/react-sdk";

export default function Room() {
  return (
    <section>
      <div id='container' />
      <WhoIsOnline position='container'  />
    </section>
  );
}
