import { Presence3D } from "@superviz/autodesk-viewer-plugin";
import SuperVizRoom from "@superviz/sdk";
import { EnvironmentTypes } from "@superviz/sdk/lib/common/types/sdk-options.types";

interface Parameters {
    autodeskPresence: Presence3D
    participant: string
    participantId: string
    roomId: string
    avatar: string
}

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = "sv-sample-room-cdn-js-presence3d-autodesk-viewer";
const groupName = "Sample Room for Presence3D for Autodesk viewer (CDN/JS)";

export default async function initSuperVizRoomWithAutodesk({ autodeskPresence, participant, participantId, roomId, avatar }: Parameters) {
    // This line is only for demonstration purpose. You can use any avatar you want.  
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
      environment: "dev" as EnvironmentTypes,
    });
  
    room.addComponent(autodeskPresence as any);
    
    return room;
  }