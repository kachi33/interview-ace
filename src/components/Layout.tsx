import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-gradient-to-br font-space-grotesk from-purple-50 to-blue-50 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
      <footer className="text-center py-4 text-gray-600 text-sm font-griffy">
        Made with love by Kachi
      </footer>
    </div>
  );
};

export default Layout;