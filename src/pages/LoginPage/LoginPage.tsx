import React from 'react';

import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo/Logo';

const LoginPage = () => {
  return (
    <section className="grid md:grid-cols-2 gap-6 md:gap-0">
      <div className="flex flex-col content-center justify-center max-h-columns">
        <div className="px-6 m-auto">
          <div className="mb-6">
            <h2 className="section__title text-[#832BC1]">Sign In</h2>
            <span className="block text-left mt-[10px]">
              Enter your username and password to sign in!
            </span>
          </div>
          <LoginForm labelColor="#832BC1" />
          <span className="block text-left text-large">
            Not registered yet?&nbsp;
            <a href="/signup" className="text-[#832BC1] font-semibold">
              Create an Account
            </a>
          </span>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#832BC1] to-[#503AE7] flex flex-col justify-center items-center gap-6 md:gap-10 p-6">
        <div className="bg-white px-6 py-6  md:px-14 md:py-10 rounded">
          <Logo isScrolling={false} isBoardPage={false} />
        </div>
        <div className="text-center section__title text-white">
          <p>Get all things done.</p>
          <p>Easily.</p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
