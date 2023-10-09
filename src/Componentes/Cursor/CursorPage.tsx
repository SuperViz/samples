import SuperVizSdk, { ParticipantType } from "@superviz/sdk";
import App from "../../App";
import { PresenceMouseComponent } from "@superviz/sdk/components";

export default function CursorPage() {
  let sdk: any = null;

  const initSDK = async () => {
    const DEVELOPER_KEY = process.env.REACT_APP_DEVELOPER_KEY || "";
    const randomNumber = Math.floor(Math.random() * 1000000);
    const randomText = Math.random().toString(36).substring(2, 15);
    sdk = await SuperVizSdk(DEVELOPER_KEY, {
      roomId: "vtn_room_1",
      group: {
        id: "<GROUP-ID>",
        name: "<GROUP-NAME>",
      },
      participant: {
        id: randomNumber.toString(),
        name: randomText,
        type: ParticipantType.GUEST,
      },
      debug: true,
      environment: "dev" as any,
    });

    console.log(randomNumber, randomText);
  };

  const enterMousePresence = function () {
    const mouse = new PresenceMouseComponent("place");

    sdk.addComponent(mouse);
  };

  initSDK().then(() => {
    enterMousePresence();
  });

  return (
    <>
      <App />
      <p>Página de cursor</p>
      <canvas id="place"></canvas>
    </>
  );
}
