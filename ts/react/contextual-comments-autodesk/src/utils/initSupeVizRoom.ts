import { AutodeskPin } from "@superviz/autodesk-viewer-plugin";
import SuperVizRoom from "@superviz/sdk";
import { EnvironmentTypes } from "@superviz/sdk/lib/common/types/sdk-options.types";
import { Comments } from "@superviz/sdk/lib/components";

interface Parameters {
  pinAdapter: AutodeskPin;
  participant: string;
  participantId: string;
  roomId: string;
  avatar: string;
  position: "left" | "right";
}

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-react-ts-contextual-comments-autodesk";
const groupName = "Sample Room with Contextual Comments for Autodesk  (React/TS)";

export default async function initSuperVizRoomWithAutodesk({
  pinAdapter,
  participant,
  participantId,
  roomId,
  avatar,
  position,
}: Parameters) {
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
    environment: "dev" as EnvironmentTypes,
  });

  const autodeskPresence = new Comments(pinAdapter, {
    position: position,
    buttonLocation: `top-${position == "left" ? "right" : "left"}`,
  });

  room.addComponent(autodeskPresence as any);

  return room;
}
