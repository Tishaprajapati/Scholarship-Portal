import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store, { persistor } from "./components/redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toaster />
    </PersistGate>
  </Provider>
);
