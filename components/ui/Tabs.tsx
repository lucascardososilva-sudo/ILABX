import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  // Added className to support layout and styling from parent
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // @ts-ignore - simplistic prop passing for this example
          return React.cloneElement(child, { selectedValue: value, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, selectedValue, onValueChange, className = '' }) => {
  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-lg bg-cream-200 p-1 text-brown-800/60 ${className}`}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // @ts-ignore
          return React.cloneElement(child, { selectedValue, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  // Added className to support layout and styling from parent
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, selectedValue, onValueChange, className = '' }) => {
  const isSelected = value === selectedValue;
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 
        ${isSelected ? 'bg-white text-brown-900 shadow-sm' : 'hover:bg-cream-100 hover:text-brown-900'} ${className}`}
      onClick={() => onValueChange?.(value)}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  selectedValue?: string;
  // Added className to support layout and styling from parent
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, selectedValue, className = '' }) => {
  if (value !== selectedValue) return null;
  return <div className={`mt-4 animate-in fade-in-50 duration-300 ${className}`}>{children}</div>;
};