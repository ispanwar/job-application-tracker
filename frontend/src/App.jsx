import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import KanbanPage from "./pages/KanbanPage";
import JobPage from "./pages/JobPage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/jobpage"} element={<JobPage />} />
        <Route path={"/kanban"} element={<KanbanPage />} />
      </Routes>
      {/* <h1 className="text-5xl text-red-500">Hello World</h1> */}
    </>
  );
}

export default App;
