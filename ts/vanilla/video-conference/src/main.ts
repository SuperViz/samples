import "./style.css";
import SuperVizRoom from "@superviz/sdk";
import { VideoConference } from "@superviz/sdk/lib/components";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const user = Math.floor(Math.random() * 100);
const groupId = "sv-sample-room-vanilla-video-conference";
const groupName = "Sample Room for Video Conference (Vanilla + TS)";

async function initializeSuperVizRoom() {
  const room = await SuperVizRoom(DEVELOPER_KEY, {
    roomId: "<ROOM-ID>",
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: user.toString(),
      name: "John " + user,
    },
    environment: "dev",
  });
  const video = new VideoConference({ participantType: "host" });
  room.addComponent(video);
  return room;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = ``;

initializeSuperVizRoom();
