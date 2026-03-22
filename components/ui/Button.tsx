import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm',
    secondary: 'bg-cream-200 text-brown-900 hover:bg-cream-300',
    ghost: 'hover:bg-cream-100 text-brown-800',
    outline: 'border border-cream-300 bg-transparent hover:bg-cream-50 text-brown-800'
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-6 text-lg'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};