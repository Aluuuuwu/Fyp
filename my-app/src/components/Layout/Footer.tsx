
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Facebook, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary flex items-center justify-center">
                <img src="/logo/dcd67338-2aef-40e1-9169-2f98e91ce81b.png" alt="SweetSmart Logo" className="h-10 w-10 object-cover" />
              </div>
              <div className="ml-2">
                <span className="text-lg font-bold text-gray-800">SweetSmart</span>
                <p className="text-xs text-gray-500 -mt-1">mindful eating for life</p>
              </div>
            </Link>
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              Your complete solution for developing mindful eating habits and creating a healthier relationship with food.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary-foreground transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-foreground transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-foreground transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-foreground transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">Features</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/food" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">
                  Mindful Eating
                </Link>
              </li>
              <li>
                <Link to="/exercise" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">
                  Wellness Tracking
                </Link>
              </li>
              <li>
                <Link to="/progress" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">
                  Progress Insights
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">
                  Recipe Database
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">
                  Mindfulness Guides
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2023 SweetSmart. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-500">
              Mindful eating for a better life.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
