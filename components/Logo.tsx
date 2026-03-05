import React from 'react';

export const Logo: React.FC<{ className?: string, size?: number }> = ({ className = '', size = 32 }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-coffee-dark"
      >
        <path
          d="M20 20V80H80"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40 40L60 60"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-50"
        />
      </svg>
      <span className="font-serif text-2xl font-medium tracking-[0.2em] text-coffee-dark">
        LYAAR
      </span>
    </div>
  );
};
