import { Routes, Route, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import React from "react";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Auth from "views/auth/Auth";
import Logout from "views/auth/Logout";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="/oauth/callback/:provider" element={<Auth />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
        <Route path="/user/logout" element={<Logout />} />
      </Routes>
    </RecoilRoot>
  );
};

export default App;
