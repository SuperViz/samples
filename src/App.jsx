import './index.css'
import CommentsInstance from './components/CommentsInstance'
import { useRef, useState } from 'react'

function App() {
  const [showZeus, setShowZeus] = useState(true)
  const room1 = useRef()
  const room2 = useRef()

  const toggle = () => {
    setShowZeus(!showZeus)
  }

  const props = {
    name: showZeus ? 'Zeus' : 'Hera',
    position: showZeus ? 'right' : 'left',
    room: showZeus ? room1 : room2,
  };

  return <CommentsInstance {...props} toggle={toggle} key={String(showZeus)}/>
}

export default App
