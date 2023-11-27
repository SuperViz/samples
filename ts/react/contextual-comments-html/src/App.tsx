import './index.css'
import CommentsInstance from './components/CommentsInstance'
import { useState } from 'react'

function App() {
  const [showZeus, setShowZeus] = useState(true)

  const toggle = () => {
    setShowZeus(!showZeus)
  }

  const props = {
    name: showZeus ? 'Zeus' : 'Hera',
    position: showZeus ? 'right' : 'left',
  } as { name: string; position: 'left' | 'right'}

  return <CommentsInstance {...props} toggle={toggle} key={String(showZeus)}/>
}

export default App
