import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import VideoPage from "./Componentes/Video/VideoPage";
import CursorPage from "./Componentes/Cursor/CursorPage";
import RealTime from "./Componentes/RealTime/RealTime";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cursor",
    element: <CursorPage />,
  },
  {
    path: "/video",
    element: <VideoPage />,
  },
  {
    path: "/realtime",
    element: <RealTime />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<RouterProvider router={router} />);

reportWebVitals();
