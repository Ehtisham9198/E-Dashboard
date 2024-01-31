import React, { useState, useRef } from 'react';
import './SignUp.css';
import SignUp from "./SignUp";
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const EmailInput = useRef();
  const PasswordInput = useRef();
  const [signUp, setSignUp] = useState(false);
  const [isAcc, setisAcc] = useState(true);
  const [incorrectpass, setincorrectpass] = useState(false);
  const [showLoginPage, setshowLoginPage] = useState(true);
  const [UserName, setUserName] = useState("");

  const signUpHandler = () => {
    setSignUp(true);
  };

  const navigate = useNavigate();


  const submitHandler = () => {
    if (EmailInput.current.value.trim() === "" || PasswordInput.current.value.trim() === "") {
      return;
    }
    const email = EmailInput.current.value;
    const password = PasswordInput.current.value;

    const LOGIN=async()=>{
      let result = await fetch('https://e-dashboard-two.vercel.app/login', {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-type': 'application/json'
        }
      });
    result = await result.json();
    if (result.name) {
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/')
    }
    else {
      alert("Please enter correct deatils");
    }
  }
  LOGIN();
    EmailInput.current.value = "";
    PasswordInput.current.value = "";

  };

  return (
    <div>
      {signUp ? (
        <SignUp />
      ) : showLoginPage && (
        <div className="login_box flex justify-center items-center border rounded-xl">
          <div className="text-center p-5">
            <h1 className="text-4xl font-bold pt-3 pb-6">Login</h1>
            <input
              type="text"
              placeholder="Enter your email"
              className="mt-4 p-2 h-8"
              ref={EmailInput}
            />
            <br />
            <input
              type="password"
              placeholder="Enter your Password"
              className="mt-6 p-2 h-8"
              ref={PasswordInput}
            />
            <br />
            <button
              className="login_button mt-8 h-8 font-bold"
              onClick={submitHandler}
            >Sign In
            </button>
            <p className="mt-3">
              Not have an account?{" "}
              <span
                className="text-blue-800 cursor-pointer "
                onClick={signUpHandler}
              >
                Sign up
              </span>
            </p>
            {incorrectpass && (
              <p className="mt-3 text-red-500">
                Incorrect password.{" "}
              </p>
            )}
            {!isAcc && (
              <p className="mt-3.5 text-red-500">
                Account is not found. {" "}Please Sign Up
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
