import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'spotify' | 'youtube' | 'deezer';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-spotify to-spotify-light text-white hover:shadow-lg hover:shadow-spotify/50',
    secondary: 'bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20',
    spotify: 'bg-gradient-to-r from-spotify to-spotify-light text-white hover:shadow-lg hover:shadow-spotify/50',
    youtube: 'bg-gradient-to-r from-youtube to-red-600 text-white hover:shadow-lg hover:shadow-red-500/50',
    deezer: 'bg-gradient-to-r from-deezer to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/50',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
