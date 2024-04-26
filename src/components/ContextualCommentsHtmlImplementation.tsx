import { Comments, useHTMLPin } from "@superviz/react-sdk";

function ContextualCommentsHtmlImplementation() {
  const containerId = "html-pin-participant";

  const { pin } = useHTMLPin({ containerId });

  return (
    <>
      <div id={containerId}>
        <p data-superviz-id="23">Paragraph that can have a comment</p>
        <p data-superviz-id="42">Another paragraph that can have a comment</p>
        <p data-superviz-id="16">One more paragraph to have a comment</p>
      </div>
      <Comments pin={pin} position="right" />
    </>
  );
}

export default ContextualCommentsHtmlImplementation;
