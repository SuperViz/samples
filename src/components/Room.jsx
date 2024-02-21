import { Comments, useHTMLPin } from "@superviz/react-sdk";
import React, { useRef } from "react";
import useMosaic from "../hooks/useMosaic";
import useDraggable from "../hooks/useDraggable";

function Room() {
  const containerId = 'html-pin-participant';

  const styles = `
    .comments__floating-button {
      background: #eeeeee;
    }`;

  const { pin } = useHTMLPin({ containerId });

  return (
    <Comments pin={pin} position="right" styles={styles} />
  );
}

export default Room;
