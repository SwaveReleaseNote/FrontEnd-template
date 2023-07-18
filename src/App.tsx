import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </RecoilRoot>
  );
};

export default App;
