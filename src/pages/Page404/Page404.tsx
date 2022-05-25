import { NavLink } from 'react-router-dom';

function Page404(): JSX.Element {
  return (
    <main className="container flex flex-col gap-10 items-center justify-center my-auto mx-auto">
      <h2 className="text-center font-black font-heading text-l md:text-2xl">
        404
        <span> | </span>
        This page can’t be reached.
      </h2>
      <NavLink
        to={'/'}
        className="font-semibold text-center text-m py-3 px-8 bg-primaryPurple text-white rounded-full rounded-tr-none hover:opacity-70"
      >
        Go to Home page
      </NavLink>
    </main>
  );
}

export default Page404;
