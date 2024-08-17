import "./style.css";
import SuperVizRoom, { Realtime, RealtimeComponentEvent, RealtimeComponentState, RealtimeMessage } from "@superviz/sdk";
import { sampleInfo } from "./projectInfo";

let room;
let channel: any;

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const participant = Math.floor(Math.random() * 100).toString().padStart(3, "0");
const groupId = sampleInfo.id;
const groupName = sampleInfo.name;

document.getElementById("subscribe")!.addEventListener("click", subscribeToEvents);
document.getElementById("publishButton")!.addEventListener("click", publishEvent);

function setLastPublishedMessage(message: RealtimeMessage) {
  document.getElementById("lastElement")!.innerHTML = `
    <p><strong>Last message:</strong> <span>${message.data?.toString()}</span></p>
    <p><strong>Published via:</strong> <span>${message.name}</span></p>
    <p><strong>Published by:</strong> <span>${message.participantId}</span></p>
  `;
}

function callbackFunctionForWhenTheEventIsDispatched(message: RealtimeMessage | string) {
  console.log('Received message:', message);
  if (typeof message === "string") return;

  if (message.participantId === participant) return;

  setLastPublishedMessage(message);
}

function subscribeToEvents() {
  channel.subscribe("one", callbackFunctionForWhenTheEventIsDispatched);
  channel.subscribe("two", callbackFunctionForWhenTheEventIsDispatched);
  channel.subscribe("three", callbackFunctionForWhenTheEventIsDispatched);

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

  channel.publish(eventName, messageToPublish);
}

async function initializeSuperVizRoom() {
  room = await SuperVizRoom(DEVELOPER_KEY, {
    roomId: groupId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: participant,
      name: "John " + participant,
    },
  });

  const realtime = new Realtime();

  realtime.subscribe(RealtimeComponentEvent.REALTIME_STATE_CHANGED, (state) => {
    if (state === RealtimeComponentState.STARTED) {
      channel = realtime.connect('my-channel');
    }
  });

  room.addComponent(realtime);

  return room;
}

initializeSuperVizRoom();
