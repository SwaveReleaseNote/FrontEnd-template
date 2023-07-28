import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { atom } from 'recoil';
import { loginState } from './contexts/atom';
import { getCookie } from "views/auth/cookie";

const Logout = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useRecoilState(loginState);
  /*Logout으로 넘어오는지 log 확인 */
  console.log("sdafafsadfsads");

  useEffect(() => {
    try {
      axios
        .patch(
          "http://localhost:8080/api/user/status",
          {
            loginState: false,
          },
          {
            headers: {
              Authorization: getCookie("id"),
            },
          }
        )
        .then((response) => {
          console.log(response.data); // Process the response as needed
        })
        .catch((error) => {
          console.error(error);
          // Handle error cases here
        });
        window.localStorage.clear();
        navigate("/auth/sign-in")
    } catch (error) {
      console.error(error);
    }
  }, []);

  return <></>; // Placeholder return statement as the component doesn't render anything
};

export default Logout;
