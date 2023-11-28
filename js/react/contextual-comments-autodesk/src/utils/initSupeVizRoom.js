import SuperVizRoom from "@superviz/sdk";
import { Comments } from "@superviz/sdk/lib/components";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-react-js-contextual-comments-autodesk";
const groupName = "Sample Room with Contextual Comments for Autodesk  (React/JS)";

export default async function initSuperVizRoomWithAutodesk({
  pinAdapter,
  participant,
  participantId,
  roomId,
  position,
}) {
  // This line is only for demonstration purpose. You can use any avatar you want.
  const avatarImageForParticipant = participant == "Hera" ? "2" : "5";

  const room = await SuperVizRoom(DEVELOPER_KEY, {
    roomId: roomId,
    group: {
      id: groupId,
      name: groupName,
    },
    participant: {
      id: participantId,
      name: participant,
      avatar: {
        imageUrl: `https://production.cdn.superviz.com/static/default-avatars/${avatarImageForParticipant}.png`,
        model3DUrl: `https://production.storage.superviz.com/readyplayerme/${avatarImageForParticipant}.glb`,
      },
    },
    environment: "dev",
  });

  const autodeskPresence = new Comments(pinAdapter, {
    position: position,
    buttonLocation: `top-${position == "left" ? "right" : "left"}`,
  });

  room.addComponent(autodeskPresence);

  return room;
}
