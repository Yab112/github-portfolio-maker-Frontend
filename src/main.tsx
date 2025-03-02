import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import AppProvider from "./context/AppProvider";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
    </BrowserRouter>
  </StrictMode>
);