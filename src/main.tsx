import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import './app/styles/index.css'

createRoot(document.getElementById("root")!).render(<App />);
