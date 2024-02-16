import { WhoIsOnline, useSuperVizRoom } from "@superviz/react-sdk";
import { useEffect } from "react";

export default function Room() {
  const { startRoom, stopRoom, isJoinedRoom } = useSuperVizRoom();

  // This effect will start the room when the component is mounted
  // and stop the room when the component is unmounted
  useEffect(() => {
    if (!startRoom || isJoinedRoom) return;

    startRoom();

    return () => {
      if (!stopRoom || !isJoinedRoom) return;

      stopRoom();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div id='container' />
      <WhoIsOnline position='container'  />
    </section>
  );
}

/**
 * import { WhoIsOnline, useSuperVizRoom } from "@superviz/react-sdk";
import { useEffect } from "react";

function Room() {
  const { startRoom, stopRoom, isJoinedRoom } = useSuperVizRoom();

  // This effect will start the room when the component is mounted
  // and stop the room when the component is unmounted
  useEffect(() => {
    if (!startRoom || isJoinedRoom) return;

    startRoom();

    return () => {
      if (!stopRoom || !isJoinedRoom) return;

      stopRoom();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = `
  .who-is-online__participant {

    border-width:5px;
  }

  .who-is-online__participant img {
    width: 100%;
    height: 100%;
  }
`;

  return (
    <>
      <WhoIsOnline styles={styles} />
    </>
  );
}

export default Room;
 */
