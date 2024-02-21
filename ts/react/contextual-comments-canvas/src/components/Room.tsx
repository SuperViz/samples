import { useCanvasPin, Comments } from "@superviz/react-sdk";

function Room({ loaded }: { loaded: boolean}) {
  const canvasId = 'canvas-container';

  const styles = `
    .comments__floating-button {
      background:#eeeeee;
    }`;

  const { pin } = useCanvasPin({ canvasId });
  
  return (
    <Comments pin={pin} position="right" styles={styles}>
      {!loaded && (
        <div className="center full loader-container">
          <span className="loader"></span>
        </div>
      )}
      <canvas id={canvasId} className="full comments-canvas" />
    </Comments>
  );
}

export default Room;
