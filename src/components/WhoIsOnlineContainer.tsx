import SuperVizRoom from "@superviz/sdk";
import { WhoIsOnline } from "@superviz/sdk/lib/components";

const groupId = "sv-sample-room-react-ts-who-is-online";
const groupName = "Sample Room for Who-is-Online (React/TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

export default function WhoIsOnlineContainer({ name, roomId }: { name: string; roomId: string }) {
  const participantId = name.toLowerCase();
  const containerId = participantId + "-container";

  const initSuperVizWithWhoIsOnline = async () => {
    const room = await SuperVizRoom(DEVELOPER_KEY, {
      roomId: roomId,
      group: {
        id: groupId,
        name: groupName,
      },
      participant: {
        id: participantId,
        name: name,
      },
      environment: "dev" as any,
    });

    const whoIsOnline = new WhoIsOnline(containerId);
    room.addComponent(whoIsOnline);
  };

  return (
    <section>
      <button onClick={() => initSuperVizWithWhoIsOnline()}>Enter Who-is-Online as "{name}"</button>
      <div id={containerId} />
    </section>
  );
}
