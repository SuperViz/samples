import { useRef } from 'react'
import WhoIsOnlineContainer from './components/WhoIsOnlineContainer'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const roomId = useRef(uuidv4()).current

  // We are initializing multiple rooms for demo purposes.
  return (
    <main>
      <WhoIsOnlineContainer name="Zeus" roomId={roomId}/>
      <WhoIsOnlineContainer name="Hera" roomId={roomId}/>
      <WhoIsOnlineContainer name="Apollo" roomId={roomId}/>
      <WhoIsOnlineContainer name="Artemis" roomId={roomId}/>
      <WhoIsOnlineContainer name="Dionysus" roomId={roomId}/>
      <WhoIsOnlineContainer name="Athena" roomId={roomId}/>
    </main>
  )
}

export default App
