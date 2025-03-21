
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart, 
  Clock, 
  Settings, 
  Users, 
  Activity,
  HelpCircle,
  ChevronRight,
  Award,
  LayoutDashboard
} from 'lucide-react';
import Logo from './Logo';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { 
      name: 'Home', 
      path: '/', 
      icon: Home 
    },
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: BarChart
    },
    { 
      name: 'Forecast', 
      path: '/forecast', 
      icon: Activity
    },
    { 
      name: 'Clubs', 
      path: '/clubs', 
      icon: Users 
    },
    { 
      name: 'Score', 
      path: '/score', 
      icon: Award 
    },
    { 
      name: 'External Dashboards', 
      path: '/external-dashboards', 
      icon: LayoutDashboard 
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: Settings 
    },
    { 
      name: 'Help', 
      path: '/help', 
      icon: HelpCircle 
    }
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 z-30 h-screen glass transition-all duration-300 border-r border-border ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className={`flex items-center h-16 px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && <Logo />}
          {collapsed && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
              <span className="text-sm">ED</span>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="w-6 h-6 rounded-full flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-2">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-foreground/70 hover:bg-primary/5 hover:text-foreground'
                    }`}
                  >
                    <item.icon className={`h-[18px] w-[18px] ${isActive ? 'text-primary' : 'text-foreground/70'}`} />
                    {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4">
          <div className={`glass-card p-3 ${collapsed ? 'text-center' : ''}`}>
            {!collapsed && (
              <>
                <p className="text-xs text-foreground/70 mb-1">Current Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-energy-low animate-pulse"></div>
                  <p className="text-sm font-medium">Low Energy Price</p>
                </div>
              </>
            )}
            {collapsed && (
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-energy-low animate-pulse"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
