import { Routes, Route, Navigate } from "react-router-dom";
import {RecoilRoot} from 'recoil';

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Auth from "views/auth/Auth";
import MyPage from "views/auth/MyPage";
import DepartmentSelect from "./views/auth/DepartmentSelect";
import ManageProject from "views/admin/default/pages/ManageProject";

const App = () => {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="/oauth/callback/:provider" element={<Auth/>} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/department/*" element={<DepartmentSelect />} />
        <Route path="/project/manage" element={<ManageProject />} />
      </Routes>
    </RecoilRoot>
  );
};

export default App;
