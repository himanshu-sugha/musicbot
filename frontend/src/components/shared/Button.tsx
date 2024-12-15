import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
  className?: string;
}

export function Button({ 
  children, 
  href, 
  variant = 'primary', 
  icon: Icon,
  className = '' 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors";
  const variantStyles = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
  };

  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
      {Icon && <Icon className="ml-2 h-5 w-5" />}
    </Component>
  );
}