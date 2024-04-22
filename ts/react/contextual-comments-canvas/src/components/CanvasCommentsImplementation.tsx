import { useCanvasPin, Comments } from "@superviz/react-sdk";

function CanvasCommentsImplementation() {
  const canvasId = "canvas-container";
  const { pin } = useCanvasPin({ canvasId });

  return (
    <>
      <canvas id={canvasId} className="full comments-canvas" />
      <Comments pin={pin} />
    </>
  );
}

export default CanvasCommentsImplementation;
