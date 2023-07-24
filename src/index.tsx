import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { CookiesProvider } from "react-cookie";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <RecoilRoot>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </RecoilRoot>
  </BrowserRouter>
);
