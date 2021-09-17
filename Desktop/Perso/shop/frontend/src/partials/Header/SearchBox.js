import React, { useState } from 'react';

function SearchBox({ history }) {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="hidden lg:flex"
      data-dashlane-rid="aa60bf5d1d368b80"
    >
      <input
        className="inline-block px-4 py-3 text-sm text-black placeholder-black font-semibold bg-white border border-transparent rounded-l"
        placeholder="Search"
        onChange={(e) => setKeyword(e.target.value)}
        data-dashlane-rid="1d395ff59b419945"
        data-form-type="other"
      />
      <button
        type="submit"
        className="px-2 rounded-r bg-white"
        data-dashlane-rid="90270769c7bfc34d"
        data-dashlane-label="true"
        data-form-type="other"
      >
        <svg
          className="text-black w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
      {/* <MenuItem /> */}
    </form>
  );
}

export default SearchBox;
