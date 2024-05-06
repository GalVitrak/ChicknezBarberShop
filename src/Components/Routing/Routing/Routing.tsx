/* eslint-disable @typescript-eslint/no-unused-vars */
import AdminPage from "../../Admin/AdminPage/AdminPage";
import Signin from "../../Auth/Signin/SignIn";
import Gallery from "../../Home/Gallery/Gallery";
import Home from "../../Home/Home/Home";
import "./Routing.css";
import { Navigate, Route, Routes } from "react-router-dom";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/auth" element={<Signin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default Routing;
