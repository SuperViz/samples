import SuperVizRoom from '@superviz/sdk'
import { WhoIsOnline } from '@superviz/sdk/lib/components'

const groupId = "sv-sample-room-react-mouse-pointers";
const groupName = "Sample Room for Mouse Pointers (React + TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY

const initWhoIsOnline = async (roomId: string, userId: string, name: string, containerId: string)=> {
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
  });

  const whoIsOnline = new WhoIsOnline(containerId)
  room.addComponent(whoIsOnline);
}

export default function WhoIsOnlineContainer({ name, roomId }: { name: string, roomId: string }) {
    const containerId = name + '-canvas'
    const userId = name.toLowerCase()

    return (
      <section>
          <button onClick={()=>initWhoIsOnline(roomId, userId, name, containerId)}>Enter Who Is Online as "{name}"</button>
          <div id={containerId}/>
      </section>
    )
}