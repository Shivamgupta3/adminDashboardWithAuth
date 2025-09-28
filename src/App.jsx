import React from "react";
import Login from "./Components/Auth/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Sidebar/Home.jsx";
import CrudHome from "./Components/Dashboard/Crud/CrudHome.jsx";
import Profile from "./Components/Dashboard/Profile/Profile.jsx";
import Settings from "./Components/Dashboard/Settings/Settings.jsx";
import Create from "./Components/Dashboard/Crud/Create.jsx";
import Read from "./Components/Dashboard/Crud/Read.jsx";
import Update from "./Components/Dashboard/Crud/Update.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<CrudHome />} />
          <Route path="dashboard">
            <Route index element={<CrudHome />} />
            <Route path="create" element={<Create />} />
            <Route path="read/:id" element={<Read />} />
            <Route path="update/:id" element={<Update />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
