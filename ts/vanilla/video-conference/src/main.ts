import SuperVizRoom, { VideoConference } from "@superviz/sdk";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const participant = Math.floor(Math.random() * 100);
const groupId = "sv-sample-room-vanilla-video-conference";
const groupName = "Sample Room for Video Conference (Vanilla + TS)";

async function initializeSuperVizRoom() {
  const room = await SuperVizRoom(DEVELOPER_KEY, {
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
  const video = new VideoConference({ participantType: "host" });
  room.addComponent(video);
  return room;
}

initializeSuperVizRoom();
