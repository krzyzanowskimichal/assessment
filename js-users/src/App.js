import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEditUser from "./pages/AddEditUser";
import { GlobalProvider } from "./context/context";

function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="add" element={<AddEditUser />} />
        <Route path="/edit:id" element={<AddEditUser  />} />

      </Routes>
    </GlobalProvider>
  );
}

export default App;
