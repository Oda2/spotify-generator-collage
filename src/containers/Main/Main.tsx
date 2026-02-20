import * as React from 'react';

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className="min-h-screen w-full">
      {children}
    </main>
  );
};

export default Main;
