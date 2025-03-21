
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Forecast', path: '/forecast' },
    { name: 'Clubs', path: '/clubs' },
    { name: 'External Dashboards', path: '/external-dashboards' },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            {!isMobile && (
              <nav className="ml-6 hidden md:block">
                <ul className="flex items-center gap-6">
                  {navLinks.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className={`text-sm font-medium transition-all hover:text-primary relative py-2 ${
                          location.pathname === link.path
                            ? 'text-primary'
                            : 'text-foreground/80 hover:text-foreground'
                        }`}
                      >
                        {link.name}
                        {location.pathname === link.path && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Sun className="h-5 w-5" />
            </Button>

            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full md:hidden" 
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <div
          className={`md:hidden ${
            isOpen
              ? 'glass fixed inset-0 pt-16 animate-fade-in'
              : 'hidden'
          }`}
        >
          <nav className="p-4">
            <ul className="space-y-6 pt-8">
              {navLinks.map((link) => (
                <li key={link.path} className="animate-slide-in">
                  <Link
                    to={link.path}
                    className={`block text-lg font-medium py-2 px-4 rounded-lg transition-all ${
                      location.pathname === link.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground/80 hover:bg-primary/5 hover:text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
