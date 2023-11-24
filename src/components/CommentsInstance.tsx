import SuperVizRoom, { LauncherFacade } from '@superviz/sdk'
import { Comments, CanvasPin } from '@superviz/sdk/lib/components'
import { useEffect, useRef, useState } from 'react';

const groupId = "sv-sample-room-react-ts-mouse-pointers";
const groupName = "Sample Room for Mouse Pointers (React/TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

interface Props { 
  name: string; 
  position: 'left' | 'right' 
  toggle: ()=> void
}

export default function CommentsInstance({ name, position, toggle }: Props) {
  const [room, setRoom] = useState<LauncherFacade>()
  const [comments, setComments] = useState<Comments>()
  
  const loaded = useRef<boolean>(false);

  const initComments = async (room: LauncherFacade | undefined, roomId: string, userId: string, name: string, position: 'left' | 'right') => {
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
      environment: "dev" as any,
    });
  
    const pinAdapter = new CanvasPin(`${name.toLowerCase()}-participant`);
    const comments = new Comments(pinAdapter, { position, buttonLocation: `top-${position}` })

    room.addComponent(comments);
    setRoom(room as LauncherFacade);
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