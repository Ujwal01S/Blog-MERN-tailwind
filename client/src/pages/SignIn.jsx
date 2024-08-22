import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react';
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const {loading, error: errorMessage} = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleChange =(e) => {

    setFormData({...formData, [e.target.id]: e.target.value.trim()});

  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password){
      return dispatch(signInFailure('Please fill in all fields'));
    }

    try {

      dispatch(signInStart());
      const res = await fetch('api/auth/signin', {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if(data.success === false){
        dispatch(signInFailure(data.message));
      }


      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }

    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Sign
            </span>
            In
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can signin with your email and passowrd or with Google.
          </p>
        </div>
        {/* Rights */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

            <div>
            <Label value= 'Your email' />
            <TextInput
            type="email"
            placeholder='Email'
            id="email"
            onChange={handleChange}
            />
            </div>

            <div>
            <Label value= 'Your password' />
            <TextInput
            type="password"
            placeholder='Password'
            id="password"
            onChange={handleChange}
            />
            </div>

            <Button
            gradientDuoTone='purpleToPink'
            type="submit"
            disabled={loading}>
              {loading ? (
                <>
                <Spinner size='sm'/>
                <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to= 'sign-up' className="text-blue-500">
            SignUp</Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
