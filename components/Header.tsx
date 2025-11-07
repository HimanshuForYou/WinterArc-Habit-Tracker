import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8 px-4 bg-white shadow-sm">
      <div className="flex justify-center items-center gap-4">
        <LogoIcon className="h-16 w-16" />
        <div>
            <h1 className="text-4xl md:text-5xl font-bold text-orange-700 tracking-tight">
            90 Days Don't Break the Chain
            </h1>
            <p className="text-xl text-orange-500 mt-1">Hum Jeetenge</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
