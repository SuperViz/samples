import {
  Comments,
  useSuperVizRoom,
  useHTMLPin,
} from "@superviz/react-sdk";
import React, { useEffect, useRef, useState } from "react";
import useMosaic from "../hooks/useMosaic";
import useDraggable from "../hooks/useDraggable";

function Room({ loaded }) {
  const { startRoom, stopRoom, hasJoinedRoom } = useSuperVizRoom();

  const containerRef = useRef(null);
  const containerId = 'html-pin-participant';

  const styles = `
    .comments__floating-button {
      background:#eeeeee;
    }`;

  const { pin } = useHTMLPin({ containerId });

  // This effect will start the room when the component is mounted
  // and stop the room when the component is unmounted
  useEffect(() => {
    if (!startRoom || hasJoinedRoom) return;

    startRoom();

    
    return () => {
      if (!stopRoom || !hasJoinedRoom) return;
      
      stopRoom();
    };
  }, []);
  
  useDraggable(containerRef);
  useMosaic(containerRef, loaded);

  return (
    <Comments pin={pin} position="right" styles={styles}>
      <div className="full comments-html">
        {!loaded && (
          <div className="center loader-container">
            <span className="loader"></span>
          </div>
        )}
        <div className={!loaded ? 'hidder helper' : 'helper'}>
          <p>
            Try dragging the cards across the area. The comments will be pinned to
            the cards.
          </p>
        </div>
        <ul
          id={containerId}
          className={!loaded ? 'hidder html-pin-container' : 'html-pin-container'}
          ref={containerRef}
        >
          <li data-superviz-id="01" draggable="true">
            <img src="https://doc-samples.superviz.com/avatars/zeus.jpg" alt="Zeus" />
            <div>
              <h1>Zeus</h1>
              <p>Zeus is the sky and thunder god in ancient Greek religion</p>
            </div>
          </li>
          <li data-superviz-id="02" draggable="true">
            <img src="https://doc-samples.superviz.com/avatars/hera.jpg" alt="Hera" />
            <div>
              <h1>Hera</h1>
              <p>Hera is the queen of the gods and the goddess of marriage</p>
            </div>
          </li>
          <li data-superviz-id="03" draggable="true">
            <img src="https://doc-samples.superviz.com/avatars/athena.jpg" alt="Athena" />
            <div>
              <h1>Athena</h1>
              <p>Athena is the goddess of wisdom, courage, and inspiration</p>
            </div>
          </li>
          <li data-superviz-id="04" draggable="true">
            <img src="https://doc-samples.superviz.com/avatars/poseidon.jpg" alt="Poseidon" />
            <div>
              <h1>Poseidon</h1>
              <p>Poseidon is the god of the sea, earthquakes, and horses</p>
            </div>
          </li>
          <li data-superviz-id="05" draggable="true">
            <img src="https://doc-samples.superviz.com/avatars/artemis.jpg" alt="Artemis" />
            <div>
              <h1>Artemis</h1>
              <p>
                Artemis is the goddess of the hunt, the wilderness, and chastity
              </p>
            </div>
          </li>
        </ul>
      </div>
    </Comments>
  );
}

export default Room;
