import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { atom } from "recoil";
import { loginState } from "./contexts/atom";
import { useCookies } from "react-cookie";
import { setCookie, getCookie } from "./cookie";

const Auth = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useRecoilState(loginState);

  /*로그인 페이지에서 Auth로 넘어오는지 log 확인 */
  console.log("sdafafsadfsads");
  const { provider } = useParams<{ provider: string }>();

  useEffect(() => {
    (async () => {
      const pathname = window.location.search;
      const code = pathname.split("=")[1];
      console.log(code);
      //url의 인가코드
      try {
        const res = await axios.post(
          `http://localhost:8080/api/user/prelogin/login-by-oauth?code=${code}&provider=${provider}`
        );
        //인가코드를 백엔드로 보내고 헤더에서 엑세스 토큰 받아옴
        const token = res.headers.authorization;
        console.log(token);
        //로컬스토리지에 저장
        window.localStorage.setItem("token", token);
        // setCookie("id", token);
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);

        setCookie("id", token, {
          path: "/",
          sameSite: "strict",
          expires: expirationTime,
          HttpOnly: true,
          secure: true,
        });
        axios
          .patch(
            "http://localhost:8080/api/user/updateStatus",
            {
              loginState:true,
            },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            console.log(response.data); // Procesconsole.log(response.data); s the response as needed
          })
          .catch((error) => {
            console.error(error);
            // Handle error cases here
          });

        try {
          axios
            .get(`http://localhost:8080/api/user/getuser`, {
              headers: {
                Authorization: token,
              },
            })
            .then((response) => {
              //api의 응답을 제대로 받은경우
              /* axios 값 log 확인*/
              console.log(response.data);
              window.localStorage.setItem("state", "true");
              window.localStorage.setItem("name", response.data.username);
              window.localStorage.setItem("email", response.data.email);
              window.localStorage.setItem("info", "");
              window.localStorage.setItem(
                "department",
                response.data.department
              );
              console.log(localStorage.getItem("email"));
            });
          navigate("/admin");
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    })();
  }, [provider, navigate]);

  return <></>; // Placeholder return statement as the component doesn't render anything
};

export default Auth;
