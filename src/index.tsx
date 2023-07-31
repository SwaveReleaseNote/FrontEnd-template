import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import React from "react";

import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement != null) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <BrowserRouter>
      <RecoilRoot>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
} else {
  console.error("Root element with id 'root' not found.");
}
