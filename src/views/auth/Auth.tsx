import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { atom } from 'recoil';

interface LoginState {
  state: boolean;
  name: string | null;
  info: string | null;
  email: string | null;
  token: string | null;
}

const loginState = atom<LoginState>({
  key: "loginState",
  default: {
    state: false,
    name: null,
    info: null,
    email: null,
    token: null
  }
});

const Auth = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useRecoilState(loginState);
  console.log("sdafafsadfsads");
  const { provider } = useParams<{ provider: string }>();

  useEffect(() => {
    (async () => {
      const pathname = window.location.search;
      const code = pathname.split('=')[1];
      console.log(code);
      //url의 인가코드
      try {
        const res = await axios.post(`http://localhost:8080/api/user/oauth/token?code=${code}&provider=${provider}`);
        //인가코드를 백엔드로 보내고 헤더에서 엑세스 토큰 받아옴
        const token = res.headers.authorization;
        console.log(token);
        //로컬스토리지에 저장

        setIsLogined((prev) => {
          return {
            state: true,
            name: "테스트",
            email: "1223ndj@gachon.ac.kr",
            info: "",
            token: String(token)
          };
        });

        try {
          axios.get(`http://localhost:8080/api/user/me`, {
            headers: {
              Authorization: token,
            },
          }).then((response) => { //api의 응답을 제대로 받은경우 
            console.log(response);
            console.log(response.data);
            setIsLogined((prev) => {
              return {
                state: true,
                name: response.data.name,
                email: response.data.email,
                info: "",
                token: String(token)
              };
            });
          });
          navigate('/admin');
        } catch (e) {
          console.error(e);
        }
      } catch (e) {
        console.error(e);
        navigate('/');
      }
    })();
  }, [provider, navigate]);

  return <></>; // Placeholder return statement as the component doesn't render anything
};

export default Auth;
