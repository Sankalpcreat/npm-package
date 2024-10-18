import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const CardHeader: React.FC<CardProps> = ({ className, children }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

const CardContent: React.FC<CardProps> = ({ className, children }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

const CardFooter: React.FC<CardProps> = ({ className, children }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

const CardTitle: React.FC<CardProps> = ({ className, children }) => (
  <h3 className={`text-xl font-bold ${className}`}>{children}</h3>
);

export const Card: React.FC<CardProps> & {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
  Title: typeof CardTitle; // Add CardTitle to the exports
} = ({ className, children }) => {
  return (
    <div className={`bg-gray-800 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

// Attach Card sub-components
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Title = CardTitle; // Attach CardTitle as well
