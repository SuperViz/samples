import SuperVizRoom from "@superviz/sdk";
import { Comments } from "@superviz/sdk/lib/components";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-cdn-js-presence3d-autodesk-viewer";
const groupName = "Sample Room for Presence3D for Autodesk viewer (CDN/JS)";

export default async function initSuperVizRoomWithAutodesk({ pinAdapter, participant, participantId, roomId, avatar, position }) {
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
          imageUrl: `https://production.cdn.superviz.com/static/default-avatars/${avatar}.png`,
          model3DUrl: `https://production.storage.superviz.com/readyplayerme/${avatar}.glb`,
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