import React from 'react';

const MenuItem = () => {
  const subMenu = (
    // viewer.id && viewer.avatar ? (
    <div>
      <div className="dropdown w-32 inline-block relative">
        <img
          className="inline-flex items-center object-cover w-16 h-16 mr-2 rounded-full"
          src=""
          alt="Profile"
        />
        <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
          <li className="">Profile page</li>
          <li className="">
            <a
              className="rounded-b bg-red-400 py-2 px-4 block whitespace-no-wrap"
              href="/logout"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
  // ) : (
  //   <button className="bg-black px-5 py-3 text-sm shadow-sm font-medium tracking-wider border text-yellow-100 rounded-full hover:shadow-lg ">
  //     <Link to="/login">Sign In</Link>
  //   </button>
  // );

  return (
    <div className="flex">
      {/* <ul className="hidden lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-10">
            <li>
              <Link className=" text-gray-50 hover:text-gray-200" to="/host">
                Host
              </Link>
            </li>
          </ul> */}
      <div className="ml-8">{subMenu}</div>
    </div>
  );
};

export default MenuItem;
