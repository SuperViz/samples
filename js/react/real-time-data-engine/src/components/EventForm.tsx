import { useEffect, useRef, useState } from "react";
import { useRealtime } from "@superviz/react-sdk";

export default function EventForm({ participantId }) {
  const [eventsSubscribed, setEventsSubscribed] = useState([]);
  const [lastPublishedMessage, setLastPublishedMessage] = useState();
  const message = useRef(null);
  const publishTo = useRef(null);
  
  const { subscribe, publish } = useRealtime();

  const callbackFunctionForWhenTheEventIsDispatched = (message) => {
    const messageData = message[0];
    if (messageData.participantId === participantId) return;
    setLastPublishedMessage(messageData);
  };

  const subscribeToBasicEvents = () => {
    subscribe("event_name_1", callbackFunctionForWhenTheEventIsDispatched);
    subscribe("event_name_2", callbackFunctionForWhenTheEventIsDispatched);
    subscribe("event_name_3", callbackFunctionForWhenTheEventIsDispatched);

    setEventsSubscribed(["event_name_1", "event_name_2", "event_name_3"]);
  };

  const publishEvent = () => {
    const eventName = publishTo.current?.value;
    const messageToPublish = message.current?.value;
    if (!eventName || !messageToPublish) return;

    publish(eventName, messageToPublish);
  };

  return (
    <section>
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
  )
}