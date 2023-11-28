import { DEVELOPER_KEY } from "../env.js";

let room;
let realtime;
let eventsSubscribed = [];

// Generating random name for the participant
const participantName = (Math.random() + 1).toString(7);
const roomId = "9cbbb622-9e8d-40be-a4fd-0cba22f08887";
const groupId = "sv-sample-room-react-cdn-real-time-data-engine";
const groupName = "Sample Room for Real-time Data Engine (CDN/JS)";

document.addEventListener("DOMContentLoaded", function () {
  loadSuperVizRealTimeDataEngine();
});

document.getElementById("subscribe").addEventListener("click", subscribeToEvent);
document.getElementById("unsubscribe").addEventListener("click", unsubscribeToEvent);
document.getElementById("subscribe-all").addEventListener("click", subscribeToAllEvents);
document.getElementById("publish").addEventListener("click", publish);

async function loadSuperVizRealTimeDataEngine() {
  room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
    roomId: roomId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: participantName,
      name: participantName,
    },
    environment: "dev",
  });

  realtime = new window.SuperVizRoom.Realtime();

  room.addComponent(realtime);
}

function subscribeToEvent() {
  const event = document.getElementById("event-name").value;

  if (!event || eventsSubscribed.includes(event)) return;

  if (eventsSubscribed.length === 3) {
    realtime.unsubscribe(eventsSubscribed[0]);
  }

  realtime.subscribe(event, callbackFunctionForWhenTheEventIsDispatched);

  eventsSubscribed.push(event);
  document.getElementById("event-name").value = "";
}

function unsubscribeToEvent() {
  const event = document.getElementById("event-name").value;

  if (!event || !eventsSubscribed.includes(event)) return;

  realtime.unsubscribe(event);

  eventsSubscribed = eventsSubscribed.filter((e) => e !== event);

  document.getElementById("event-name").value = "";
}

function subscribeToAllEvents() {
  realtime.subscribe("Discord", callbackFunctionForWhenTheEventIsDispatched);
  realtime.subscribe("Slack", callbackFunctionForWhenTheEventIsDispatched);
  realtime.subscribe("Linkedin", callbackFunctionForWhenTheEventIsDispatched);

  eventsSubscribed.push("Discord");
  eventsSubscribed.push("Slack");
  eventsSubscribed.push("Linkedin");
}

function publish() {}

function callbackFunctionForWhenTheEventIsDispatched(message) {
  const messageData = message[0];
  // if (messageData.participantId === participantId) return;

  console.log("Message received", message);

  //setLastPublishedMessage(messageData);
}
