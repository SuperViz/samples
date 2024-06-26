import "./style.css";
import SuperVizRoom, { Realtime, RealtimeMessage } from "@superviz/sdk";
import { sampleInfo } from "./projectInfo";

let room;
let realtime: Realtime;

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const participant = Math.floor(Math.random() * 100);
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
  if(typeof message === "string") return;

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
  room.addComponent(realtime);

  return room;
}

initializeSuperVizRoom();
