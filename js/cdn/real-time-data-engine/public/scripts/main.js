import { DEVELOPER_KEY } from "../env.js";

let room;
let realtime;
let eventsSubscribed = [];

// Generating random name for the participant
const participantName = Math.floor(Math.random() * Date.now()).toString(36);
const roomId = "9cbbb622-9e8d-40be-a4fd-0cba22f08887";
const groupId = "sv-sample-room-react-cdn-real-time-data-engine";
const groupName = "Sample Room for Real-time Data Engine (CDN/JS)";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("participant-name").innerHTML = "Participant name: " + participantName;
});

document.getElementById("subscribe-all").addEventListener("click", loadSuperVizRealTimeDataEngine);
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
  });

  realtime = new window.SuperVizRoom.Realtime();

  realtime.subscribe("Discord", callbackFunctionForWhenTheEventIsDispatched);
  realtime.subscribe("Slack", callbackFunctionForWhenTheEventIsDispatched);
  realtime.subscribe("Linkedin", callbackFunctionForWhenTheEventIsDispatched);

  room.addComponent(realtime);

  eventsSubscribed.push("Discord");
  eventsSubscribed.push("Slack");
  eventsSubscribed.push("Linkedin");

  const container = document.getElementById("events");
  container.innerHTML = `<h2>Subscribed to:</h2>`;
  container.innerHTML += eventsSubscribed.map((event) => `<code>${event}</code>`).join("");
}

function publish() {
  const eventName = document.getElementById("name").value;
  const eventMessage = document.getElementById("message").value;

  console.log("Publishing", realtime);

  realtime.publish(eventName, eventMessage);
}

function callbackFunctionForWhenTheEventIsDispatched(message) {
  const messageData = message[0];
  if (messageData.participantId === participantName) return;

  console.log("Message received", messageData);

  const container = document.getElementById("last-message");
  container.innerHTML = `<p><strong>Last message:</strong> <span>${messageData.data}</span></p>
        <p><strong>Published via:</strong> <span>${messageData.name}</span></p>
        <p><strong>Published by:</strong> <span>${messageData.participantId}</span></p>`;
}
