import React from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center container  space-x-4 animate-bounce">
      <div className="w-8 h-8 bg-green-600 rounded-full"></div>
      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
      <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
    </div>
  );
}

export default Loader;
