import React from 'react';
import Logo from '../../components/Logo/Logo';

import SignUpForm from '../../components/SignUpForm/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="grid md:grid-cols-2 h-[70vh]">
      <div className="flex flex-col content-center justify-center">
        <div className="w-[410px] ml-auto mr-auto">
          <div className="mb-[21px]">
            <h2 className="section__title text-[#096CFE]">Sign Up</h2>
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
      <div className="bg-gradient-to-b from-[#096CFE] to-[#ABFFE0] flex flex-col justify-center items-center gap-10 p-6">
        <div className="bg-white px-14 py-10 rounded">
          <Logo isScrolling={false} isBoardPage={false} />
        </div>
        <div className="text-center section__title text-white">
          <p>Get all things done.</p>
          <p>Easily.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
