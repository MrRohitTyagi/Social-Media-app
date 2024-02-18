import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { BrowserRouter } from "react-router-dom";
import AuthorizeUser from "./Components/Authorize/index.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <BrowserRouter>
      <AuthorizeUser>
        <App />
      </AuthorizeUser>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
