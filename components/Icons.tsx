import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="white" stroke="#FDBA74" strokeWidth="4"/>
    <path d="M40 25 C 50 35, 60 25, 70 30" stroke="#F87171" strokeWidth="6" strokeLinecap="round"/>
    <path d="M30 70 C 40 60, 35 45, 50 50" stroke="#60A5FA" strokeWidth="6" strokeLinecap="round"/>
    <path d="M70 75 C 60 65, 75 50, 60 55" stroke="#34D399" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="35" cy="45" r="8" fill="#FBBF24"/>
  </svg>
);


export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

export const FireIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.052A9.75 9.75 0 0110.5 18.75a.75.75 0 001.071 1.052 8.25 8.25 0 005.14-14.416.75.75 0 00-1.072-1.052z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M10.5 18.75a.75.75 0 001.071 1.052 8.25 8.25 0 005.14-14.416.75.75 0 00-1.072-1.052A9.75 9.75 0 0110.5 18.75z" clipRule="evenodd" />
  </svg>
);

export const CalendarDaysIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" />
    </svg>
);