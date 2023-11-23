import SuperVizRoom from "@superviz/sdk";
import { WhoIsOnline } from "@superviz/sdk/lib/components";

const groupId = "sv-sample-room-react-ts-who-is-online";
const groupName = "Sample Room for Who-is-Online (React/TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

const initWhoIsOnline = async (roomId: string, userId: string, name: string, containerId: string) => {
  const room = await SuperVizRoom(DEVELOPER_KEY, {
    roomId: roomId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: userId,
      name: name,
    },
    environment: "dev" as any,
  });

  const whoIsOnline = new WhoIsOnline(containerId);
  room.addComponent(whoIsOnline);
};

export default function WhoIsOnlineContainer({ name, roomId }: { name: string; roomId: string }) {
  const containerId = name + "-container";
  const userId = name.toLowerCase();

  return (
    <section>
      <button onClick={() => initWhoIsOnline(roomId, userId, name, containerId)}>
        Enter Who-is-Online as "{name}"
      </button>
      <div id={containerId} />
    </section>
  );
}
