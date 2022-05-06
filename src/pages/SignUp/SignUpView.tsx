import React from 'react';

import SignUpForm from '../../components/SignUpForm/SignUpForm';

const SignUpView = () => {
  return (
    <div className="grid md:grid-cols-2 h-[70vh]">
      <div className="flex flex-col content-center justify-center">
        <div className="w-[410px] ml-auto mr-auto">
          <div className="mb-[21px]">
            <h3 className="text-5xl text-[#096CFE] text-left font-black">Sign Up</h3>
            <span className="block text-left mt-[10px]">Enter your data to sign up!</span>
          </div>
          <SignUpForm labelColor="#096CFE" />
          <span className="block text-left text-large">
            Already registered?
            <a href="" className="text-[#096CFE] font-semibold">
              Log in into your Account
            </a>
          </span>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#096CFE] to-[#ABFFE0]"></div>
    </div>
  );
};

export default SignUpView;
