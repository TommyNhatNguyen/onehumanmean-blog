import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";

if (import.meta.env.MODE === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
