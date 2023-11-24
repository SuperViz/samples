import SuperVizRoom, { RealtimeMessage } from "@superviz/sdk";
import { Realtime } from "@superviz/sdk/lib/components";
import { useEffect, useRef, useState } from "react";

export default function RealtimeParticipant({ name, roomId }: { name: string; roomId: string }) {
  const participantId = name.toLowerCase();
  const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
  const groupId = "sv-sample-room-react-ts-real-time-data-engine";
  const groupName = "Sample Room for Real-time Data Engine (React/TS)";

  const [eventsSubscribed, setEventsSubscribed] = useState<string[]>([]);
  const [lastPublishedMessage, setLastPublishedMessage] = useState<RealtimeMessage | undefined>();

  const realtime = useRef<Realtime>(new Realtime());
  const subscribeTo = useRef<HTMLInputElement>(null);
  const publishTo = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLInputElement>(null);

  const InitSuperVizRoom = async (roomId: string, name: string, realtime: Realtime) => {
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
      environment: "dev" as any,
    });

    room.addComponent(realtime as any);
  };

  const callbackFunctionForWhenTheEventIsDispatched = (message: any) => {
    const messageData = message[0] as RealtimeMessage;
    if (messageData.participantId === participantId) return;

    console.log("Message received", message);

    setLastPublishedMessage(message[0]);
  };

  const subscribeToBasicEvents = () => {
    realtime.current.subscribe("Discord", callbackFunctionForWhenTheEventIsDispatched);
    realtime.current.subscribe("Slack", callbackFunctionForWhenTheEventIsDispatched);
    realtime.current.subscribe("Linkedin", callbackFunctionForWhenTheEventIsDispatched);

    setEventsSubscribed(["Discord", "Slack", "Linkedin"]);
  };

  useEffect(() => {
    (async () => {
      await InitSuperVizRoom(roomId, name, realtime.current);
    })();
  }, []);

  const subscribeToEvent = () => {
    const eventName = subscribeTo.current?.value;

    if (!eventName || eventsSubscribed.includes(eventName)) return;

    if (eventsSubscribed.length === 3) realtime.current.unsubscribe(eventsSubscribed[0]);

    realtime.current.subscribe(subscribeTo.current.value, callbackFunctionForWhenTheEventIsDispatched);

    setEventsSubscribed((prev) => [...prev.slice(-2), eventName]);
    subscribeTo.current.value = "";
  };

  const unsubscribeFromEvent = () => {
    const eventName = subscribeTo.current?.value;

    if (!eventName || !eventsSubscribed.includes(eventName)) return;

    realtime.current.unsubscribe(subscribeTo.current.value);

    setEventsSubscribed((prev) => prev.filter((message) => message !== eventName));
    subscribeTo.current.value = "";
  };

  const publishEvent = () => {
    const eventName = publishTo.current?.value;
    const messageToPublish = message.current?.value;
    if (!eventName || !messageToPublish) return;

    realtime.current.publish(eventName, messageToPublish);
  };

  return (
    <section>
      <h1>{name}</h1>
      <div className="events-info">
        <div className="container">
          <h2>Subscription Manager</h2>
          <input placeholder="Event name" ref={subscribeTo} />
          <div className="subscribe-options">
            <button onClick={subscribeToEvent}>Subscribe</button>
            <button onClick={unsubscribeFromEvent}>Unsubscribe</button>
          </div>
          <button onClick={subscribeToBasicEvents}>Subscribe to basic events</button>
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
