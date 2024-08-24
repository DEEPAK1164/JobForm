// src/components/Header.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="bg-black py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* JobForm Logo */}
        <div className="text-red-600 text-3xl font-bold">JobForm</div>
        
        {/* User Icon */}
        <div className="text-white">
          <FontAwesomeIcon icon={faUser} className="h-6 w-6 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
