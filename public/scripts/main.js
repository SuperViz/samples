import { DEVELOPER_KEY } from "../env.js";
import { sampleInfo } from "../projectInfo";

let roomId;
const groupId = sampleInfo.id;
const groupName = sampleInfo.name;

document.addEventListener("DOMContentLoaded", function () {
  roomId = generateUUID();
});

document.getElementById("enter-call").addEventListener("click", initSuperVizWithVideoConference);

async function initSuperVizWithVideoConference() {
  const room = await window.SuperVizRoom.init(DEVELOPER_KEY, {
    roomId: roomId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: "zeus",
      name: "Zeus",
    },
  });

  const videoConference = new window.SuperVizRoom.VideoConference({
    participantType: "host",
  });
  room.addComponent(videoConference);
}

function generateUUID() {
  var d = new Date().getTime();
  var d2 = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
