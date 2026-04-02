import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { HeartPulse, LayoutDashboard, PlusCircle, User, LogOut, Sparkles, MessageCircle } from 'lucide-react';

const Navigation = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Mood Tracker', path: '/track', icon: <PlusCircle size={20} /> },
    { name: 'Recommendations', path: '/recommendations', icon: <Sparkles size={20} /> },
    { name: 'Chat AI', path: '/chatbot', icon: <MessageCircle size={20} /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="w-12 h-12 rounded-xl bg-wellness-primary flex items-center justify-center shadow-lg shadow-wellness-primary/20 group-hover:shadow-wellness-primary/40 group-hover:-translate-y-0.5 transition-all duration-300">
                <HeartPulse className="text-white" size={28} />
              </div>
              <span className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-wellness-text to-wellness-primary hidden sm:block tracking-tight">
                MindCare
              </span>
            </Link>
            <div className="hidden md:ml-12 md:flex md:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`inline-flex items-center px-4 gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive
                        ? 'bg-wellness-hero-light text-wellness-primary-hover shadow-sm'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/profile" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-500 hover:bg-wellness-hero-light hover:text-wellness-primary transition-colors">
              <User size={20} />
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 shadow-sm text-sm font-semibold rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 active:scale-95"
            >
              <LogOut size={18} />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile mapping */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-around py-3 px-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex flex-col items-center justify-center gap-1.5 p-2 w-full rounded-xl transition-all ${isActive ? 'text-wellness-primary-hover bg-wellness-hero-light' : 'text-slate-400 hover:text-slate-600'
                  }`}
              >
                {link.icon}
                <span className="text-[10px] font-bold tracking-wide">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
