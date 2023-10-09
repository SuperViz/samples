import SuperVizSdk, { MeetingEvent, Participant, ParticipantType } from "@superviz/sdk";
import { EnvironmentTypes } from "@superviz/sdk/common/types/sdk-options.types";
import { VideoComponent } from "@superviz/sdk/components";
import { CamerasPosition, LayoutPosition } from "@superviz/sdk/services/video-conference-manager/types";
import App from "../../App";

export default function VideoPage() {
  let sdk: any = null;
  let video: VideoComponent;

  const initSDK = async () => {
    const DEVELOPER_KEY = process.env.REACT_APP_DEVELOPER_KEY || "";
    const randomNumber = Math.floor(Math.random() * 1000000).toString();
    const randomText = Math.random().toString(36).substring(2, 15);
    sdk = await SuperVizSdk(DEVELOPER_KEY, {
      roomId: "vtn_ts_002",
      group: {
        id: "<GROUP-ID>",
        name: "<GROUP-NAME>",
      },
      participant: {
        id: randomText,
        name: randomText,
        type: ParticipantType.HOST,
      },
      debug: true,
      environment: "dev" as any,
    });
  };

  const enterMeetingSDK = function () {
    // export { PresenceMouseComponent } from './presence-mouse';
    video = new VideoComponent({
      camerasPosition: "top" as any,
      offset: {
        top: 280,
        bottom: 0,
        left: 0,
        right: 0,
      },

      defaultToolbar: true,
    });
    video.subscribe(MeetingEvent.MEETING_DEVICES_CHANGE, onEventSomething);

    sdk.addComponent(video);
  };

  const onEventSomething = function (event: any) {
    console.log("event response 2: ", event);
  };

  const fetchHistoryCall = () => {
    sdk.fetchHistory(MeetingEvent.MEETING_PARTICIPANT_JOINED).then((his: any) => {
      console.log("sdk", his);
    });

    sdk.fetchHistory().then((his: any) => {
      console.log("alll", his);
    });
  };

  const removeComponentCall = () => {
    sdk.removeComponent(video);
  };

  const actionButton = () => {
    video.toggleTranscript();
  };

  initSDK().then(() => {
    enterMeetingSDK();
  });

  return (
    <>
      <App />
      <p>Página de vídeo</p>
      <button onClick={() => fetchHistoryCall()}>FetchHistory</button>
      <button onClick={() => removeComponentCall()}>removeComponent</button>
      <button onClick={() => actionButton()}>actionButton</button>
    </>
  );
}
