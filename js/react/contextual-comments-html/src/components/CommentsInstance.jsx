import SuperVizRoom from '@superviz/sdk'
import { Comments, CanvasPin } from '@superviz/sdk/lib/components'
import { useEffect, useRef, useState } from 'react';

const groupId = "sv-sample-room-react-ts-mouse-pointers";
const groupName = "Sample Room for Mouse Pointers (React/TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

export default function CommentsInstance({ name, position, toggle }) {
  const [room, setRoom] = useState()
  const [comments, setComments] = useState()
  
  const loaded = useRef(false);

  const initComments = async (room, roomId, userId, name, position) => {
    room = await SuperVizRoom(DEVELOPER_KEY, {
      roomId: roomId,
      group: {
        id: groupId,
        name: groupName,
      },
      participant: {
        id: userId,
        name: name,
      },
      environment: "dev",
    });
  
    const pinAdapter = new CanvasPin(`${name.toLowerCase()}-participant`);
    const comments = new Comments(pinAdapter, { position, buttonLocation: `top-${position}` })

    room.addComponent(comments);
    setRoom(room);
  }


  useEffect(()=> {
      if (loaded.current) return;
      loaded.current = true;
    
      ( async () => { 
          await initComments(room, "sv-sample-room-react-ts-mouse-pointers", name.toLowerCase(), name, position);
        }
      )()
    }, [])

    const destroy = () => {
      if (room) {
        room.destroy()
        toggle()
      }
    }
    return(
    <>
      <button onClick={destroy}>Change participant</button>
      <section>
          <h1>View from "{name}" participant</h1>
          <canvas id={`${name.toLocaleLowerCase()}-participant`}  className={name.toLocaleLowerCase()}> </canvas>
      </section>
    </>
    )
}