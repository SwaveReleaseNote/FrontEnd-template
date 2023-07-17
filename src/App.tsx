import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Login from "views/auth/Login";
import Auth from "views/auth/Auth";
import MyPage from "views/auth/MyPage";
import DepartmentSelect from "./views/auth/DepartmentSelect";
const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="/oauth/callback/:provider" element={<Auth/>} />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/default" replace />} />
      <Route path="/default/*" element={<Login />} />
      <Route path="/mypage/*" element={<MyPage />} />
      <Route path="/department/*" element={<DepartmentSelect />} />
    </Routes>
  );
};

export default App;
