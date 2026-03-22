import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Briefcase, 
  Code2, 
  BookOpen, 
  Bell, 
  Search,
  Zap,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Badge } from './ui/Badge';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/squad', label: 'Meu Squad', icon: Users },
    { path: '/trilha-negocios', label: 'Trilha Negócios', icon: Briefcase },
    { path: '/trilha-tech', label: 'Trilha Tech', icon: Code2 },
    { path: '/biblioteca', label: 'Biblioteca', icon: BookOpen }, 
  ];

  return (
    <div className="flex h-screen bg-cream-50 font-sans text-brown-900 overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-brown-900/50 z-40 md:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - Responsive (Fixed on Mobile, Static on Desktop) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-cream-100/95 md:bg-cream-100/50 border-r border-cream-300 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-cream-300 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brown-900 flex items-center justify-center">
              <span className="text-orange-500 font-bold text-lg">L</span>
            </div>
            <span className="font-serif font-bold text-lg text-brown-900 tracking-tight">Lab Inovação</span>
          </div>
          {/* Close button for mobile */}
          <button onClick={closeSidebar} className="md:hidden text-brown-800">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar} // Close on navigation (mobile)
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
                  ${isActive 
                    ? 'bg-brown-900 text-white shadow-md' 
                    : 'text-brown-800 hover:bg-white hover:text-orange-600 hover:shadow-sm'
                  }`}
              >
                <Icon size={18} className={isActive ? 'text-orange-500' : 'text-brown-800/70 group-hover:text-orange-600'} />
                {item.label}
                {isActive && <ChevronRight size={14} className="ml-auto text-orange-500" />}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-cream-300">
          <NavLink 
            to="/conta" 
            onClick={closeSidebar}
            className={({ isActive }) => `
              bg-white rounded-xl p-3 border border-cream-300 shadow-sm flex items-center gap-3 transition-all hover:border-orange-200 hover:shadow-md group
              ${isActive ? 'ring-2 ring-orange-500/20 border-orange-200' : ''}
            `}
          >
            <img src="https://picsum.photos/100/100" alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-cream-200 group-hover:border-orange-100 transition-colors" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate group-hover:text-orange-600 transition-colors">Dra. Amanda</p>
              <p className="text-xs text-brown-800/60 truncate">Líder Squad Alpha</p>
            </div>
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-cream-300 bg-white/60 backdrop-blur-md px-4 md:px-8 flex items-center justify-between sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-4">
            {/* Hamburger Button */}
            <button onClick={toggleSidebar} className="md:hidden text-brown-800 hover:text-orange-600">
              <Menu size={24} />
            </button>

            <div className="flex items-center gap-4 text-brown-800/50">
              <Search size={18} />
              <span className="text-sm hidden sm:block">Buscar na plataforma...</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {/* Gamification Badge - Compact on Mobile */}
            <div className="flex items-center gap-2 bg-cream-100 px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-cream-200">
              <div className="p-1 bg-orange-100 rounded-full">
                <Zap size={14} className="text-orange-600 fill-orange-600" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[8px] md:text-[10px] uppercase font-bold text-brown-800/60 tracking-wider">Nível Squad</span>
                <span className="text-xs md:text-sm font-bold text-brown-900">XP 2.450</span>
              </div>
            </div>

            <button className="relative text-brown-800 hover:text-orange-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto pb-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};