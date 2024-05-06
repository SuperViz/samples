import "./style.css";
import SuperVizRoom, { Realtime, RealtimeMessage } from "@superviz/sdk";

let room;
let realtime: Realtime;

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const participant = Math.floor(Math.random() * 100);
const groupId = "sv-sample-room-vanilla-mouse-pointers";
const groupName = "Sample Room for Mouse Pointers (Vanilla + TS)";

document.getElementById("subscribe")!.addEventListener("click", subscribeToEvents);
document.getElementById("publishButton")!.addEventListener("click", publishEvent);

function setLastPublishedMessage(message: RealtimeMessage) {
  document.getElementById("lastElement")!.innerHTML = `
    <p><strong>Last message:</strong> <span>${message.data?.toString()}</span></p>
    <p><strong>Published via:</strong> <span>${message.name}</span></p>
    <p><strong>Published by:</strong> <span>${message.participantId}</span></p>
  `;
}

function callbackFunctionForWhenTheEventIsDispatched(message: RealtimeMessage) {
  if (message.participantId === participant.toString()) return;

  setLastPublishedMessage(message);
}

function subscribeToEvents() {
  realtime.subscribe("one", callbackFunctionForWhenTheEventIsDispatched);
  realtime.subscribe("two", callbackFunctionForWhenTheEventIsDispatched);
  realtime.subscribe("three", callbackFunctionForWhenTheEventIsDispatched);

  document.getElementById("subscribedTo")!.innerHTML = `<h2>Subscribed to:</h2>
          <code>one</code>
          <code>two</code>
          <code>three</code>`;

  (document.getElementById("eventName")! as HTMLSelectElement).disabled = false;
}

function publishEvent() {
  const eventDropdown = document.getElementById("eventName")! as HTMLSelectElement;
  const messageInput = document.getElementById("eventMessage")! as HTMLInputElement;

  const eventName = eventDropdown.value;
  const messageToPublish = messageInput.value;

  if (!eventName || !messageToPublish) return;

  realtime.publish(eventName, messageToPublish);
}

async function initializeSuperVizRoom() {
  room = await SuperVizRoom(DEVELOPER_KEY, {
    roomId: groupId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: participant.toString(),
      name: "John " + participant,
    },
  });

  realtime = new Realtime();
  room.addComponent(realtime as any);

  return room;
}

initializeSuperVizRoom();
