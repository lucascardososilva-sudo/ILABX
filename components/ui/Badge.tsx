import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'orange' | 'green';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-brown-800 text-white',
    outline: 'border border-brown-800 text-brown-800',
    orange: 'bg-orange-100 text-orange-600 border border-orange-200',
    green: 'bg-green-100 text-green-700 border border-green-200'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};