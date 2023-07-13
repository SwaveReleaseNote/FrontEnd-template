import InputField from "components/fields/InputField";
import React, { useState } from "react";
import { FcGoogle, FcComments } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import "./SignIn.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCardBody,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
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
export default function SignIn() {
  const host = "http://localhost:3000";
  const KAKAO_REST_API_KEY = "4646a32b25c060e42407ceb8c13ef14a";
  const KAKAO_REDIRECT_URI = host + "/oauth/callback/kakao";
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegisterFormData>({ mode: "onChange" });
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState<LoginFormData>({
    login_email: "",
    login_password: "",
  });

  /*회원가입 모달창 띄우기*/
  const handleRegisterModalButton = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  /*회원가입 변경 감지 및 보내기*/
  const register_name = watch("name");
  const register_password = watch("password");
  const register_email = watch("email");
  const register_confirmPassword = watch("confirmPassword");
  const handleClickRegisterFormSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    setRegisterData({
      name: register_name,
      email: register_email,
      password: register_password,
      confirmPassword: register_confirmPassword,
    });
    e.preventDefault();
    console.log({
      register_name,
      register_email,
      register_password,
      register_confirmPassword,
    });
    axios
      .post("http://localhost:8080/api/login/createUser", {
        name: register_name,
        email: register_email,
        password: register_password,
      })
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        setRegisterData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
    reset(); // Reset the form after submission
  };
  /*로그인 데이터 변경 감지 및 보내기*/
  const handleClickLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginData);
    axios
      .post("http://localhost:8080/api/login/login", loginData)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
    reset(); // Reset the form after submission
  };
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({ ...prevLoginData, [name]: value }));
  };

  /*비밀 번호 인증 파트*/
  const validatePassword = (value: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return (
      regex.test(value) ||
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one special character"
    );
  };
  const isFormValid = Object.keys(errors).length === 0;

  /*이메일 유효성검사 인증 파트*/
  const [showAuthInput, setShowAuthInput] = useState(false);
  const [authNumber, setAuthNumber] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleValidationButtonClick = () => {
    setShowAuthInput(true);
  };
  const handleAuthInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAuthNumber(event.target.value);
  };
  const handleValidationSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform validation logic with the authNumber
    // ...
    setIsAuthenticated(true);
    // Reset the authentication number and hide the input window
    setAuthNumber("");
    setShowAuthInput(false);
  };

  /* 패스워드 찾기 */
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const handleForgotPasswordModalButton = () => {
    setShowForgotPasswordModal(!showForgotPasswordModal);
  };

  const handleClickForgotPasswordFormSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    // Handle forgot password form submission
  };
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleForgotPasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForgotPasswordEmail(e.target.value);
  };
  return (
    <>
      <div
        className={`mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start ${
          showRegisterModal ? "blur-background" : ""
        }`}
      >
        {/* Sign in section */}
        <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            Sign In
          </h4>
          <p className="ml-1 text-base text-gray-600">
            Enter your email and password to sign in!
          </p>
          <a href={KAKAO_AUTH_URI}>
            <div className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
              <div className="rounded-full text-xl">
                <FcComments />
              </div>
              <h5 className="text-sm font-medium text-navy-700 dark:text-white">
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
            {/* Checkbox */}
            <div className="flex items-center justify-between px-2">
              <a
                onClick={handleForgotPasswordModalButton}
                className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4">
            <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
              Not registered yet?
            </span>
            <a
              onClick={handleRegisterModalButton}
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
      {/* Register Modal */}
      {showRegisterModal && (
        <MDBModal
          show={showRegisterModal}
          tabIndex={-1}
          setShow={setShowRegisterModal}
        >
          <MDBModalDialog size="lg">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Register</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={handleRegisterModalButton}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <form onSubmit={handleClickRegisterFormSubmit}>
                  <MDBCardBody className="px-5">
                    <h2 className="text-uppercase mb-5 text-center">
                      Create an account
                    </h2>
                    <MDBInput
                      wrapperClass="mb-4 w-50"
                      label="Your Name"
                      // size="lg"
                      id="register_form1"
                      type="text"
                      defaultValue={registerData.email}
                      // onChange={handleRegisterInputChange}
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-danger">Name is required</span>
                    )}
                    <div className="d-flex align-items-center mb-4">
                      <MDBInput
                        wrapperClass="me-2"
                        label="Your Email"
                        size="lg"
                        id="register_form2"
                        type="email"
                        defaultValue={registerData.email}
                        {...register("email", {
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      <MDBBtn
                        className="w-25 mb-2"
                        style={{ backgroundColor: "#A3AED0" }}
                        type="button"
                        onClick={handleValidationButtonClick}
                        size="lg"
                      >
                        유효성검사
                      </MDBBtn>
                    </div>
                    {errors.email && <p>{errors.email.message}</p>}
                    <form onSubmit={handleValidationSubmit}>
                      {showAuthInput && (
                        <div className="mb-4">
                          <MDBInput
                            label="Authentication number"
                            wrapperClass="mb-4 w-50"
                            type="text"
                            value={authNumber}
                            onChange={handleAuthInputChange}
                            placeholder="Enter authentication number"
                          />
                          <MDBBtn className="w-25 mb-2" type="submit">
                            Submit
                          </MDBBtn>
                        </div>
                      )}
                      {showAuthInput &&
                        (isAuthenticated ? (
                          <div className="text-success">
                            Authentication success
                          </div>
                        ) : (
                          <div className="text-fail">Authentication fail</div>
                        ))}
                    </form>
                    <MDBInput
                      wrapperClass="mb-4 w-50"
                      label="Password"
                      size="lg"
                      id="register_form3"
                      type="password"
                      defaultValue={registerData.password}
                      // onChange={handleRegisterInputChange}
                      {...register("password", {
                        required: true,
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        validate: validatePassword,
                      })}
                    />
                    {errors.password && (
                      <div className="text-danger">
                        {errors.password.message}
                      </div>
                    )}

                    <MDBInput
                      wrapperClass="mb-4 w-50"
                      label="Repeat your password"
                      size="lg"
                      id="register_form4"
                      type="password"
                      // value={registerData.confirmPassword}
                      // onChange={handleRegisterInputChange}
                      {...register("confirmPassword", {
                        required: true,
                        validate: (value) =>
                          value === register_password ||
                          "Passwords do not match", // Use password variable
                      })}
                    />
                    {errors.confirmPassword && (
                      <div className="text-danger">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                    <MDBBtn
                      className="w-100 mb-4"
                      size="lg"
                      // style={{ backgroundColor: "#A3AED0" }}
                      disabled={!isFormValid}
                    >
                      Register
                    </MDBBtn>
                  </MDBCardBody>
                </form>
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}
      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="relative mx-auto my-4 w-full max-w-3xl rounded-xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-start justify-between">
              <h3 className="text-xl font-semibold">Forgot Password</h3>
              <button
                onClick={handleForgotPasswordModalButton}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                <label
                  htmlFor="forgotPasswordEmail"
                  className="mb-2 block font-medium text-gray-800"
                >
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
                  className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
