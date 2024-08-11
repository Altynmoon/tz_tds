import { Routes, Route } from "react-router-dom";
import UserList from "./components/pages/user-list.tsx";
import AddUser from "./components/pages/add-user.tsx";
import EditUser from "./components/pages/edit-user.tsx";

function App() {
  return (
    <div className="">
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/edit-user/:id" element={<EditUser />} />
    </Routes>
  </div>
  );
}

export default App;
