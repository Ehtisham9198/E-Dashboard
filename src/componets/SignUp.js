import React from 'react';
import { useState, useRef, useEffect } from 'react';
import "./SignUp.css";
import SignInPage from "./SignInPage";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const EmailInput = useRef();
  const PasswordInput = useRef();
  const NameInput = useRef();
  const [signIn, setSignIn] = useState(false);
  const [Alreadyacc, setAlreadyacc] = useState(false);
  const [signupped, setsignupped] = useState(false);
  const [loading,setloading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  })

  const SignInHandler = () => {
    setSignIn(true);
  }


  const SubmitHandler = (event) => {
    setloading(true);
    if (NameInput.current.value.trim() === "" || EmailInput.current.value.trim() === "" || PasswordInput.current.value.trim() === "") {
      return;
    }
    const email = EmailInput.current.value;
    const password = PasswordInput.current.value;
    const name = NameInput.current.value;;
    const CollectData = async () => {
      let result = await fetch('/signup', {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-type': "application/json"
        },

      });

      result = await result.json();
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result));
      navigate('/');
        setloading(false);
      
    }
    CollectData();
    EmailInput.current.value = "";
    PasswordInput.current.value = "";
    NameInput.current.value = "";
  };

  return (
    <div>
      {signIn ? (
        <SignInPage />
      ) : (
        <div className="login_box flex justify-center items-center border rounded-xl">
          <div className="text-center p-5">
            <h1 className="text-4xl font-bold pt-3 pb-6">Sign Up</h1>
            <input
              type="text"
              placeholder="Enter your Name"
              className="mt-4 p-2 h-8"
              ref={NameInput}
            />
            <br />
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
              className={`login_button mt-8 h-8 font-bold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={SubmitHandler}
              disabled={loading}
            >Sign Up
              </button>
            <p className="mt-3">
              Have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer "
                onClick={SignInHandler}
              >
                Sign In
              </span>
            </p>
            {Alreadyacc && <p className="mt-3.5 text-red-500">Account already exists!</p>}
            {signupped && <p className="mt-3.5 text-red-500">Account created successfully <br />Please login now</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
