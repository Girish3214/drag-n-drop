import { RouteComponent } from "./components";
import "./index.css";

function App() {
  return (
    <div className="w-full h-screen bg-neutral-900 text-neutral-50">
      <RouteComponent />
      <div id="dialog"></div>
    </div>
  );
}

export default App;
