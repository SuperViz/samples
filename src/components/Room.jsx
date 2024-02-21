import { useCanvasPin, Comments } from "@superviz/react-sdk";

function Room() {
  const canvasId = 'canvas-container';

  const styles = `
    .comments__floating-button {
      background:#eeeeee;
    }`;

  const { pin } = useCanvasPin({ canvasId });
  
  return (
    <Comments pin={pin} position="right" styles={styles}>
      <canvas id={canvasId} className="full comments-canvas" />
    </Comments>
  );
}

export default Room;
