import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Toaster } from "react-hot-toast";
import StoreProvider from "./context/storePovider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider>
      <App />
      <Toaster position="top-center" />
    </StoreProvider>
  </StrictMode>
);