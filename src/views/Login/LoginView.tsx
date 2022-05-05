import React from 'react';

import LoginForm from '../../components/LoginForm/LoginForm';

const LoginView = () => {
  return (
    <div className="grid md:grid-cols-2 h-[70vh]">
      <div className="flex flex-col content-center justify-center">
        <div className="w-[410px] ml-auto mr-auto">
          <div className="mb-[21px]">
            <h3 className="text-5xl text-[#832BC1] text-left font-black">Log In</h3>
            <span className="block text-left mt-[10px]">
              Enter your username and password to sign in!
            </span>
          </div>
          <LoginForm />
          <span className="block text-left text-large">
            Not registered yet?
            <a href="" className="text-[#832BC1] font-semibold">
              Create an Account
            </a>
          </span>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#832BC1] to-[#503AE7]"></div>
    </div>
  );
};

export default LoginView;
