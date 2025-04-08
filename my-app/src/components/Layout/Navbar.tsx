import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, Settings, Home, Utensils, BarChart2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Foods', path: '/food', icon: Utensils },
    { name: 'Reports', path: '/progress', icon: BarChart2 },
    { name: 'Community', path: '/community', icon: Users },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary flex items-center justify-center">
                <img src="/lovable-uploads/dcd67338-2aef-40e1-9169-2f98e91ce81b.png" alt="SweetSmart Logo" className="h-10 w-10 object-cover" />
              </div>
              <div className="ml-2">
                <span className="text-lg font-bold text-gray-800">SweetSmart</span>
                <p className="text-xs text-gray-500 -mt-1">mindful eating for life</p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                  location.pathname === link.path
                    ? 'text-primary-foreground bg-primary/10'
                    : 'text-gray-700 hover:text-primary-foreground hover:bg-gray-50'
                }`}
              >
                <link.icon size={16} />
                {link.name}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                  location.pathname === '/dashboard'
                    ? 'text-primary-foreground bg-primary/10'
                    : 'text-gray-700 hover:text-primary-foreground hover:bg-gray-50'
                }`}
              >
                <User size={16} />
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center">
            {!isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="font-medium">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="font-medium flex items-center gap-2">
                      <User size={16} />
                      {user?.name || 'Account'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/profile" className="flex items-center gap-2 w-full">
                        <User size={16} />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/settings" className="flex items-center gap-2 w-full">
                        <Settings size={16} />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="flex items-center gap-2 cursor-pointer">
                      <LogOut size={16} />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            <div className="flex md:hidden ml-2">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-md shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? 'text-primary-foreground bg-primary/10'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-foreground'
              }`}
            >
              <link.icon size={18} />
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/dashboard'
                  ? 'text-primary-foreground bg-primary/10'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-foreground'
              }`}
            >
              <User size={18} />
              Dashboard
            </Link>
          )}
          
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium w-full text-left text-gray-700 hover:bg-gray-50 hover:text-primary-foreground"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <div className="flex flex-col pt-4">
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full mb-2">
                  Log In
                </Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Sign Up Free</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;