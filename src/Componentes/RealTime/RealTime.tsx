import SuperVizSdk, { Participant, ParticipantEvent, ParticipantType, RealtimeEvent } from "@superviz/sdk";
import App from "../../App";
import { Realtime } from "@superviz/sdk/components";
import { useState } from "react";

export default function RealTime() {
  let sdk: any = null;
  const DEVELOPER_KEY = process.env.REACT_APP_DEVELOPER_KEY || "";
  const randomText = Math.random().toString(36).substring(2, 15).trim();
  const [participant, setParticipant] = useState<string>(randomText);

  const initSDK = async (isHost: boolean) => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const participantType = isHost ? ParticipantType.HOST : ParticipantType.GUEST;

    console.log(`${randomNumber} - ${randomText} - ${participantType}`);
    sdk = await SuperVizSdk(DEVELOPER_KEY, {
      roomId: "vtn_room_1",
      group: {
        id: "<GROUP-ID>",
        name: "<GROUP-NAME>",
      },
      participant: {
        id: randomNumber.toString(),
        name: participant,
        type: participantType,
      },
      debug: true,
      environment: "dev" as any,
    });
  };

  const enterMousePresence = function () {
    const rtde = new Realtime();

    //sdk.subscribe(ParticipantEvent.LOCAL_UPDATED, onEventSomething);
    sdk.subscribe(RealtimeEvent.REALTIME_NO_HOST_AVAILABLE, onEventSomething2);

    sdk.addComponent(rtde);
  };

  const onEventSomething = function (event: any) {
    console.log("event response 2: ", event);
  };

  const onEventSomething2 = function (event: any) {
    console.log("host available: ", event);
  };

  const changeParticipant = function () {
    setParticipant("teste");
  };

  const enterHost = (isHost: boolean) => {
    initSDK(isHost).then(() => {
      enterMousePresence();
    });
  };

  return (
    <>
      <App />
      <p>Página do Realtime data engine</p>
      <button onClick={() => enterHost(true)}>enterHost</button>
      <button onClick={() => enterHost(false)}>enterGuest</button>
      <button onClick={() => changeParticipant()}>changeParticipant</button>
    </>
  );
}
