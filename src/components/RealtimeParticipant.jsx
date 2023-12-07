import SuperVizRoom from "@superviz/sdk";
import { Realtime } from "@superviz/sdk/lib/components";
import { useEffect, useRef, useState } from "react";

export default function RealtimeParticipant({ name, roomId }) {
  const participantId = name.toLowerCase();
  const groupId = "sv-sample-room-react-js-real-time-data-engine";
  const groupName = "Sample Room for Real-time Data Engine (React/JS)";
  const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;

  const [realtime] = useState(new Realtime());
  const [eventsSubscribed, setEventsSubscribed] = useState([]);
  const [lastPublishedMessage, setLastPublishedMessage] = useState();

  const publishTo = useRef(null);
  const message = useRef(null);

  const InitSuperVizRoom = async () => {
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
    });

    realtime.subscribe("Discord", callbackFunctionForWhenTheEventIsDispatched);
    realtime.subscribe("Slack", callbackFunctionForWhenTheEventIsDispatched);
    realtime.subscribe("Linkedin", callbackFunctionForWhenTheEventIsDispatched);

    setEventsSubscribed(["Discord", "Slack", "Linkedin"]);

    room.addComponent(realtime);
  };

  const callbackFunctionForWhenTheEventIsDispatched = (message) => {
    const messageData = message[0];
    if (messageData.participantId === participantId) return;

    console.log("Message received", message);

    setLastPublishedMessage(messageData);
  };

  const subscribeToBasicEvents = () => {
    InitSuperVizRoom();
  };

  const publishEvent = () => {
    const eventName = publishTo.current?.value;
    const messageToPublish = message.current?.value;
    if (!eventName || !messageToPublish) return;

    realtime.publish(eventName, messageToPublish);
  };

  return (
    <section>
      <h1>{name}</h1>
      <div className="events-info">
        <div className="container">
          <h2>Subscription Manager</h2>
          <button onClick={subscribeToBasicEvents}>Subscribe to events</button>
        </div>

        {eventsSubscribed.length > 0 && (
          <div className="container">
            <h2>Subscribed to:</h2>
            {eventsSubscribed.map((message, index) => {
              return <code key={index}>{message}</code>;
            })}
          </div>
        )}
      </div>

      <hr />

      <div className="container">
        <h2>Publising events</h2>
        <div className="subscribe-options">
          <input placeholder="Event message" ref={message} />
          <input placeholder="Event name" ref={publishTo} />
          <button onClick={publishEvent}>Publish</button>
        </div>
      </div>

      {lastPublishedMessage && (
        <div className="last-message container">
          <p>
            <strong>Last message:</strong> <span>{lastPublishedMessage?.data?.toString()}</span>
          </p>
          <p>
            <strong>Published via:</strong> <span>{lastPublishedMessage?.name}</span>
          </p>
          <p>
            <strong>Published by:</strong> <span>{lastPublishedMessage?.participantId}</span>
          </p>
        </div>
      )}
    </section>
  );
}
