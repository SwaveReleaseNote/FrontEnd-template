import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Logout = (): JSX.Element => {
  const navigate = useNavigate();
  // Logout으로 넘어오는지 log 확인
  console.log("sdafafsadfsads");

  useEffect(() => {
    window.localStorage.clear();
    navigate("/auth/sign-in")
  }, []);

  return <></>; // Placeholder return statement as the component doesn't render anything
};

export default Logout;
