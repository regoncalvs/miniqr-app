import React from 'react';
import { FaBars } from 'react-icons/fa';
import { PiSignOut } from 'react-icons/pi';
import { logout } from '@/services/usuarios-service';
import './globals.css'
import { useRouter } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const handleLogout = () => {
    logout().then(() => {
      router.push(`/login`);
    });
  };

  return (<>

<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap" rel="stylesheet"></link>
    <div className="flex h-screen">
      <nav className={'bg-indigo-800 text-white w-16 flex-shrink-0 block'}>
        <div className="p-4">
          <div className="mb-4">
            <FaBars
              className="cursor-pointer"
              size={24}
            />
          </div>
          <div>
            <PiSignOut
              className="cursor-pointer"
              size={24}
              onClick={handleLogout}
            />
          </div>
        </div>
      </nav>
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  </>
  );
};

export default Layout;
