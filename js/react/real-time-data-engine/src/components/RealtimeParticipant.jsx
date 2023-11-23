import SuperVizRoom from "@superviz/sdk";
import { Realtime } from "@superviz/sdk/lib/components";
import { useEffect, useRef, useState } from "react";

const groupId = "sv-sample-room-react-ts-who-is-online";
const groupName = "Sample Room for Who-is-Online (React/TS)";
const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

const initWhoIsOnline = async (roomId, userId, name, realtime) => {
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
    environment: "dev",
  });

  room.addComponent(realtime);
};

export default function RealtimeParticipant({ name, roomId }) {
  const containerId = name + "-container";
  const realtime = useRef(new Realtime());
  const subscribeTo = useRef(null);
  const unsubscribeFrom = useRef(null);
  const publishTo = useRef(null);
  const message = useRef(null);

  const [lastPublishedMessage, setLastPublishedMessage] = useState();

  const userId = name.toLowerCase();
  const [subscribedTo, setSubscribedTo] = useState([])
  
  const updateMessages = (message) => {
    // destructuring the message and taking the fields "data" and "participantId"
    // from the first element of the array
    const [{ data, participantId }] = message;
    if (participantId === userId) return;

    const { text, event , author} = data;

    setLastPublishedMessage({ text, event, author });
  }
  const subscribeToBasicEvents = () => {
    realtime.current.subscribe('Discord', updateMessages)
    realtime.current.subscribe('Slack', updateMessages)
    realtime.current.subscribe('Linkedin', updateMessages)

  subscribedTo.forEach((event) => { realtime.current.unsubscribe(event)})
    setSubscribedTo(['Discord', 'Slack', 'Linkedin'])
  }

  useEffect(()=> {
    (
      async () => {
        await initWhoIsOnline(roomId, userId, name, realtime.current);
      }
    )(
    )
  }, [])

  const subscribeToEvent = ()=> {
    const event = subscribeTo.current?.value;

    if (!event || subscribedTo.includes(event)) return;

    if (subscribedTo.length === 3) {
      realtime.current.unsubscribe(subscribedTo[0]);
    }

    realtime.current.subscribe(subscribeTo.current.value, updateMessages);

    setSubscribedTo((prev) => [...prev.slice(-2), event]);
    subscribeTo.current.value = '';
  }

  const unsubscribeFromEvent = ()=> {
    const event = unsubscribeFrom.current?.value;

    if (!event || !subscribedTo.includes(event)) return;
    realtime.current.unsubscribe(unsubscribeFrom.current.value);
    setSubscribedTo((prev) => prev.filter((message) => message !== event));
    unsubscribeFrom.current.value = '';
  }

  const publishEvent = () => {
    const event = publishTo.current?.value;
    const text = message.current?.value;
    if (!event || !text) return;
    
    realtime.current.publish(event, { text, event, author: name });
    publishTo.current.value = '';
    message.current.value = '';
  }
  
  return (
    <section>
      <h1>{name}</h1>
      <div id={containerId} className="container">
        <button onClick={subscribeToBasicEvents}>Subscribe to basic events</button>
        <div>
          <button onClick={subscribeToEvent}>Subscribe to:</button>
          <input placeholder="Type the event name" ref={subscribeTo}/>
        </div>
        <div>
          <button onClick={unsubscribeFromEvent}>Unsubscribe from:</button>
          <input placeholder="Type the event name" ref={unsubscribeFrom}/>
        </div>
        <div>
          <button onClick={publishEvent}>Publish:</button>
          <input placeholder="Type the message" ref={message}/>
          <h2>To:</h2>
          <input ref={publishTo} placeholder="Type the event name"/>
        </div>
        {subscribedTo.length > 0 && <div className="subscriptions">
          <h2>Subscribed to:</h2>
          <div>
            {subscribedTo.map((message, index) => {
              return (
                <span key={index} className="subscription">
                  {message}
                </span>
              )
            })}
          </div>
        </div>}
        {lastPublishedMessage && <div className="last-message">
          <span>
            <h2>Last message:</h2>
            <p>{lastPublishedMessage?.text}</p>
          </span>
          <span>
            <h2>Published via:</h2>
            <p>{lastPublishedMessage?.event}</p>
          </span>
          <span>
            <h2>Published by:</h2>
            <p>{lastPublishedMessage?.author}</p>
          </span>
        </div>}
      </div>
    </section>
  );
}
