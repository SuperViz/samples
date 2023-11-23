import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import SuperVizRoom, { LauncherFacade } from '@superviz/sdk'
import { VideoConference } from '@superviz/sdk/lib/components'
import { EnvironmentTypes } from '@superviz/sdk/lib/common/types/sdk-options.types';

const groupId = "sv-sample-room-react-mouse-pointers";
const groupName = "Sample Room for Mouse Pointers (React + TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY
const roomId = uuidv4()
const name = 'Zeus'
const userId = name.toLowerCase()

const initVideoConference = (room: LauncherFacade | undefined)=> {
  const video = new VideoConference()
  room?.addComponent(video);
}

function App() {
  const [sdkLoaded, setSdkLoaded] = useState(false)
  const [room, setRoom] = useState<LauncherFacade>()

  useEffect(()=> {
    (
      async ()=> {
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
          environment: 'dev' as EnvironmentTypes,
        });
        
        setRoom(room);
        setSdkLoaded(true)
      }
    )()
  }, [])
  
  return (
    <main>
      <button disabled={!sdkLoaded} onClick={()=>initVideoConference(room)}>Join Video Conference</button>
    </main>
  )
}

export default App
