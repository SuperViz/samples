import { Comments, useHTMLPin } from "@superviz/react-sdk";

function Room() {
  const containerId = 'html-pin-participant';

  const { pin } = useHTMLPin({ containerId });
  const styles = `
    .comments__floating-button {
      background:#eeeeee;
    }`;
    
  return  <Comments pin={pin} position="right" styles={styles} />

}

export default Room;
