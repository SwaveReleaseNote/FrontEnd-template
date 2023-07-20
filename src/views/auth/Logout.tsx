import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { atom } from 'recoil';
import { loginState } from './contexts/atom';

const Logout = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useRecoilState(loginState);
  /*Logout으로 넘어오는지 log 확인 */
  console.log("sdafafsadfsads");

  useEffect(() => {
    window.localStorage.clear();
    navigate("/auth/sign-in")
  }, []);

  return <></>; // Placeholder return statement as the component doesn't render anything
};

export default Logout;
