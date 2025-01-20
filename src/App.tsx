import "./index.css";
import { Home } from "./pages/Home";
// import { Login } from "./pages/Login";

function App() {
  return (
    <div className="w-full h-screen bg-neutral-900 text-neutral-50">
      {/* <Login /> */}
      <Home />
      <div id="dialog"></div>
    </div>
  );
}

export default App;
