import React from 'react';

interface MarqueeProps {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  rotate?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({ 
  text, 
  speed = 30, 
  direction = 'left', 
  className = '',
  rotate = -5 
}) => {
  return (
    <div 
      className={`overflow-hidden whitespace-nowrap py-4 border-y border-coffee-dark/10 bg-coffee-bg/50 backdrop-blur-sm ${className}`}
      style={{ transform: `rotate(${rotate}deg) translateY(-50%)`, width: '150%', marginLeft: '-25%' }}
    >
      <div className="flex animate-marquee">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 text-4xl md:text-6xl font-serif italic text-coffee-dark/20 uppercase tracking-widest">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
