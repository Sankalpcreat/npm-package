import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'primary';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, variant = 'default', className = '', children }) => {
  const baseStyles = "px-4 py-2 rounded focus:outline-none transition duration-200";

  const variantStyles = {
    default: "bg-gray-800 text-white hover:bg-gray-700",
    outline: "bg-transparent border border-gray-600 text-gray-100 hover:bg-gray-600",
    primary: "bg-blue-500 text-white hover:bg-blue-600"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </button>
  );
};
