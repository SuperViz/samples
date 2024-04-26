import { useRef, useState } from "react";

import { useRealtime } from "@superviz/react-sdk";

export default function EventForm({ participantId }) {
  const [eventsSubscribed, setEventsSubscribed] = useState([]);
  const [lastPublishedMessage, setLastPublishedMessage] = useState();
  const message = useRef<HTMLInputElement>(null);
  const publishTo = useRef<HTMLSelectElement>(null);

  const { subscribe, publish } = useRealtime();

  const callbackFunctionForWhenTheEventIsDispatched = (message) => {
    if (message.participantId === participantId) return;

    setLastPublishedMessage(message);
  };

  const subscribeToBasicEvents = () => {
    subscribe("one", callbackFunctionForWhenTheEventIsDispatched);
    subscribe("two", callbackFunctionForWhenTheEventIsDispatched);
    subscribe("three", callbackFunctionForWhenTheEventIsDispatched);

    setEventsSubscribed(["one", "two", "three"]);
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
          <select ref={publishTo}>
            {eventsSubscribed.map((event, index) => (
              <option key={index} value={event}>
                {event}
              </option>
            ))}
          </select>
          <input placeholder="Event message" ref={message} />
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
