import InputField from 'components/fields/InputField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import kakaobutton from 'assets/img/auth/kakao2.png';
import { setCookie } from './cookie';
import api from 'context/api';
import axios from 'axios';
import {createStompClient,activateStompClient} from "../../views/auth/stompClientUtils";

interface RegisterFormData {
   name: string;
   email: string;
   password: string;
   confirmPassword: string;
}
interface LoginFormData {
   login_email: string;
   login_password: string;
}
// interface TokenData {
//    data: string;
//    type: string;
//  }
const SignIn: React.FC = () => {
   const navigate = useNavigate();
   const host = 'http://266e8974276247f4b3cad8498606fafb.kakaoiedge.com:80';

   const KAKAO_REST_API_KEY = '4646a32b25c060e42407ceb8c13ef14a';
   const KAKAO_REDIRECT_URI = host + '/oauth/callback/kakao';
   const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
   const {
      register,
      formState: { errors },
      reset,
      watch,
   } = useForm<RegisterFormData>({ mode: 'onChange' });
   const [showRegisterModal, setShowRegisterModal] = useState(false);
   const [registerData, setRegisterData] = useState<RegisterFormData>({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
   });
   const [loginData, setLoginData] = useState<LoginFormData>({
      login_email: '',
      login_password: '',
   });

   /* 회원가입 모달창 띄우기 */
   const handleRegisterModalButton = (): void => {
      console.log(showRegisterModal);
      setShowRegisterModal(!showRegisterModal);
   };

   /* 회원가입 변경 감지 및 보내기 */
   const registeName = watch('name');
   const registerPassword = watch('password');
   const registerEmail = watch('email');
   const registerConfirmPassword = watch('confirmPassword');
   const handleClickRegisterFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      setRegisterData({
         name: registeName,
         email: registerEmail,
         password: registerPassword,
         confirmPassword: registerConfirmPassword,
      });
      console.log({
         registeName,
         registerEmail,
         registerPassword,
         registerConfirmPassword,
      });
      api.post('user', {
         name: registeName,
         email: registerEmail,
         password: registerPassword,
      })
         .then(response => {
            // Handle successful response
            console.log(response.data);
            setRegisterData({
               name: '',
               email: '',
               password: '',
               confirmPassword: '',
            });
            alert('Sign UP Success!');
            setShowRegisterModal(!showRegisterModal);
            setShowAuthInput(true);
            setIsAuthenticated(false);
         })
         .catch(error => {
            // Handle error
            console.error(error);
         });
      reset(); // Reset the form after submission
   };

   /* 로그인 데이터 변경 감지 및 보내기 */
   const handleClickLoginFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      console.log(loginData);

      api.post('user/login-by-email', {
         email: loginData.login_email,
         password: loginData.login_password,
      })
         .then(async response => {
            // Handle successful response

            
            // const parsedData: TokenData = JSON.parse(response.data.slice(5));
            // console.log(parsedData);
            // const token = parsedData.data.replace(/"/g, '');
            console.log(response.data);
            const token = response.data;
            console.log(token);
            if (response.data === 'Information Not valid') {
               alert('Information Not valid');
               console.error('error');
               return;
            }
            const expirationTime = new Date();
            expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);
            
            createStompClient(`Bearer ${String(token)}`);
            activateStompClient();
            try {
               await axios
                  .get(`http://61.109.214.110:80/api/user`, {
                     headers: {
                        Authorization: `Bearer ${String(token)}`,
                     },
                  })
                  .then(response => {
                     // api의 응답을 제대로 받은경우
                     console.log(response);
                     console.log(response.data);
                     window.localStorage.setItem('state', 'true');
                     window.localStorage.setItem('name', response.data.username);
                     window.localStorage.setItem('email', response.data.email);
                     window.localStorage.setItem('info', '');
                     window.localStorage.setItem('user_id',response.data.id);
                     window.localStorage.setItem('department', response.data.department);
                     window.localStorage.setItem('token', `Bearer ${String(token)}`);
                     const emailCookieKey = localStorage.getItem('email') as string;
                     setCookie(emailCookieKey, `Bearer ${String(token)}`, {
                        path: '/',
                        sameSite: 'strict',
                        expires: expirationTime,
                        HttpOnly: true,
                        secure: true,
                     });
                  });
            } catch (error) {
               console.error(error);
            } finally {
               console.log("get", window.localStorage.getItem('department'));
               navigate('/admin');
            }

         })
         .catch(error => {
            // Handle error
            alert(error);
            console.error(error);
         });
      reset(); // Reset the form after submission
   };
   const handleLoginInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target;
      setLoginData(prevLoginData => ({ ...prevLoginData, [name]: value }));
   };

   /* 비밀 번호 인증 파트 */
   const validatePassword = (value: string): boolean | string => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return (
         regex.test(value) ||
         'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one special character'
      );
   };

   /* 이메일 유효성검사 인증 파트 */
   const [showAuthInput, setShowAuthInput] = useState(false); // 인증번호 넣는칸 보여주기
   const [frontAuthNumber, setFrontAuthNumber] = useState(''); // front에서 입력한 인증번호
   const [backAuthNumber, setBackAuthNumber] = useState(''); // back에서 받은 인증번호
   const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증이 맞는지 체크
   const handleValidationButtonClick = (): void => {
      setShowAuthInput(true);
      api.post('user/validation', {
         email: registerEmail,
      })
         .then(response => {
            // Handle successful response
            console.log(response.data);
            setBackAuthNumber(response.data);
         })
         .catch(error => {
            // Handle error
            console.error(error);
         });
   };
   const handleAuthInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setFrontAuthNumber(event.target.value);
   };
   const handleValidationSubmit = (): void => {
      // Perform validation logic with the frontAuthNumber
      // ...
      console.log(frontAuthNumber);
      if (frontAuthNumber.length !== 0 && frontAuthNumber === backAuthNumber) {
         setIsAuthenticated(true);
         setFrontAuthNumber('');
      } else {
         setIsAuthenticated(false);
      }
      // Reset the authentication number and hide the input window
      // setShowAuthInput(false);
   };

   /* 패스워드 찾기 */
   const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
   const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
   const handleForgotPasswordModalButton = (): void => {
      setShowForgotPasswordModal(!showForgotPasswordModal);
   };
   const handleClickForgotPasswordFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      // Handle forgot password form submission
      console.log(forgotPasswordEmail);
      api.post('user/temporary-password', {
         email: forgotPasswordEmail,
      })
         .then(response => {
            // Handle successful response
            console.log(response.data);
            setForgotPasswordMessage(response.data);
            setForgotPasswordMessage('');
         })
         .catch(error => {
            // Handle error
            console.error(error);
            setForgotPasswordMessage('An error occurred. Please try again later.');
            setForgotPasswordMessage('');
         });
   };
   const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
   const handleForgotPasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setForgotPasswordEmail(event.target.value);
   };

   /* Register 오류 검사 */
   const isFormValid = isAuthenticated && Object.keys(errors).length === 0;

   return (
      <div>
         <div
            className={`mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start ${
               showForgotPasswordModal || showRegisterModal ? 'blur-background' : ''
            }`}>
            {/* Sign in section */}
            <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
               <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Sign In</h4>
               <p className="ml-1 text-base text-gray-600">Enter your email and password to sign in!</p>
               <a href={KAKAO_AUTH_URI}>
                  <div
                     style={{ backgroundColor: '#fee500' }}
                     className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
                     <div className="rounded-full text-xl">
                        <img src={kakaobutton} className="flex h-[50px] items-left" alt="kakao" />
                     </div>
                     <h5 className="py-[12px] text-base font-medium text-black transition duration-200">
                        Sign In with Kakao
                     </h5>
                  </div>
               </a>
               <div className="flex items-center  gap-3">
                  <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                  <p className="text-base text-gray-600 dark:text-white"> or </p>
                  <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
               </div>
               <form onSubmit={handleClickLoginFormSubmit}>
                  {/* Email */}
                  <InputField
                     variant="auth"
                     extra="mb-3"
                     label="Email*"
                     placeholder="mail@simmmple.com"
                     id="email"
                     type="email"
                     name="login_email"
                     onChange={handleLoginInputChange}
                  />

                  {/* Password */}
                  <InputField
                     variant="auth"
                     extra="mb-3"
                     label="Password*"
                     placeholder="Min. 8 characters"
                     id="password"
                     type="password"
                     name="login_password"
                     onChange={handleLoginInputChange}
                  />
                  {/* Forgot Password */}
                  <div className="flex items-center justify-between px-2">
                     <a
                        onClick={handleForgotPasswordModalButton}
                        className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white">
                        Forgot Password?
                     </a>
                  </div>
                  <button
                     type="submit"
                     className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                     Sign In
                  </button>
               </form>
               <div className="mt-4">
                  <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">Not registered yet?</span>
                  <a
                     onClick={handleRegisterModalButton}
                     className="hover:cursor-pointer ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white">
                     Create an account
                  </a>
               </div>
            </div>
         </div>
         {/* Register Modal */}
         {showRegisterModal && (
            <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
               <div
                  className="relative mx-auto my-4 w-full max-w-3xl rounded-xl bg-white p-8 shadow-lg"
                  style={{ right: '22%' }}>
                  <div className="mb-6 flex items-start justify-between">
                     <h3 className="text-xl font-semibold">Create an Account</h3>
                     <button onClick={handleRegisterModalButton} className="text-gray-500 hover:text-gray-700">
                        <svg
                           className="h-6 w-6"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                           />
                        </svg>
                     </button>
                  </div>
                  <form onSubmit={handleClickRegisterFormSubmit}>
                     {/* Register form fields */}
                     <div className="mb-4">
                        <label htmlFor="register_form1" className="mb-2 block font-medium text-gray-800">
                           Your Name
                        </label>
                        <input
                           id="register_form1"
                           type="text"
                           className="w-full rounded-md border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           defaultValue={registerData?.email ?? ''}
                           {...register('name', { required: true })}
                        />
                        {errors.name != null && <span className="text-danger">Name is required</span>}
                     </div>
                     <div className="mb-4 flex items-center justify-between">
                        <div className="w-1/2 me-2">
                           <label htmlFor="register_form2" className="mb-2 block font-medium text-gray-800">
                              Your Email
                           </label>
                           <input
                              id="register_form2"
                              type="email"
                              className="w-full rounded-md border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              defaultValue={registerData.email}
                              {...register('email', {
                                 required: true,
                                 pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                 },
                              })}
                           />
                           {errors.email != null && <p className="text-danger">{errors.email.message}</p>}
                        </div>
                        <button
                           type="button"
                           onClick={handleValidationButtonClick}
                           className="w-1/4 rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">
                           e-mail 확인
                        </button>
                     </div>
                     {/* Authentication number input */}
                     {showAuthInput && (
                        <div className="mb-4">
                           <label htmlFor="auth_number" className="mb-2 block font-medium text-gray-800">
                              Authentication number
                           </label>
                           <input
                              id="auth_number"
                              type="text"
                              className="w-full rounded-md border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={frontAuthNumber}
                              onChange={handleAuthInputChange}
                              placeholder="Enter authentication number"
                           />
                           <button
                              type="button"
                              onClick={handleValidationSubmit}
                              className="text-gray-500 hover:text-gray-700">
                              Submit
                           </button>
                        </div>
                     )}
                     {/* Authentication success/fail message */}
                     {showAuthInput &&
                        (isAuthenticated ? (
                           <div className="text-green-500">Authentication success</div>
                        ) : (
                           <div className="text-red-500">Authentication fail</div>
                        ))}
                     {/* Password */}
                     <div className="mb-4">
                        <label htmlFor="register_form3" className="mb-2 block font-medium text-gray-800">
                           Password
                        </label>
                        <input
                           id="register_form3"
                           type="password"
                           className="w-full rounded-md border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           defaultValue={registerData.password}
                           {...register('password', {
                              required: true,
                              minLength: {
                                 value: 8,
                                 message: 'Password must be at least 8 characters',
                              },
                              validate: validatePassword,
                           })}
                        />
                        {errors.password != null && (
                           <div className="text-danger text-red-500">{errors.password.message}</div>
                        )}
                     </div>
                     {/* Repeat Password */}
                     <div className="mb-4">
                        <label htmlFor="register_form4" className="mb-2 block font-medium text-gray-800">
                           Repeat your password
                        </label>
                        <input
                           id="register_form4"
                           type="password"
                           className="w-full rounded-md border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           {...register('confirmPassword', {
                              required: true,
                              validate: value => value === registerPassword || 'Passwords do not match', // Use password variable
                           })}
                        />
                        {errors.confirmPassword != null && (
                           <div className="text-danger text-red-500">{errors.confirmPassword.message}</div>
                        )}
                     </div>
                     <button
                        className="mb-4 w-full rounded-md bg-brand-500 px-4 py-2 text-lg font-medium text-white hover:bg-brand-600 focus:bg-brand-600"
                        disabled={!isFormValid}
                        type="submit">
                        Register
                     </button>
                  </form>
               </div>
            </div>
         )}
         {/* Forgot Password Modal */}
         {showForgotPasswordModal && (
            <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
               <div
                  className="relative mx-auto my-4 w-full max-w-3xl rounded-xl bg-white p-8 shadow-lg"
                  style={{ right: '22%' }}>
                  <div className="mb-6 flex items-start justify-between">
                     <h3 className="text-xl font-semibold">Forgot Password</h3>
                     <button onClick={handleForgotPasswordModalButton} className="text-gray-500 hover:text-gray-700">
                        <svg
                           className="h-6 w-6"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                           />
                        </svg>
                     </button>
                  </div>
                  <form onSubmit={handleClickForgotPasswordFormSubmit}>
                     {/* Forgot password form */}
                     <div className="mb-4">
                        <label htmlFor="forgotPasswordEmail" className="mb-2 block font-medium text-gray-800">
                           Email
                        </label>
                        <input
                           type="email"
                           id="forgotPasswordEmail"
                           className="w-full rounded-md border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Enter your email"
                           value={forgotPasswordEmail}
                           onChange={handleForgotPasswordInputChange}
                           required
                        />
                     </div>
                     <div className="flex justify-end">
                        <button
                           type="submit"
                           className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">
                           Submit
                        </button>
                     </div>
                     {forgotPasswordMessage !== '' && (
                        <p className="mt-4 text-sm text-red-500">{forgotPasswordMessage}</p>
                     )}
                  </form>
               </div>
            </div>
         )}
      </div>
   );
};

export default SignIn;
