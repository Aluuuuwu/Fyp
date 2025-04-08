
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-full">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gray-200/40 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <span className={`inline-block px-3 py-1 rounded-full bg-primary/10 text-primary-foreground text-sm font-medium mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}`}>
            Mindful Eating For Life
          </span>
          
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground to-gray-700">Smart</span> choices.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-primary-foreground">Sweet</span> life.
          </h1>
          
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}`}>
            The easiest way to develop mindful eating habits, track your nutrition, and create a healthier relationship with food.
          </p>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}`}>
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto font-medium group bg-primary text-primary-foreground hover:bg-primary/90">
                Start your journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-medium border-gray-300 text-gray-700">
                Learn more
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Hero image */}
        <div className={`relative mt-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
          <div className="relative mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
            <img
              src="https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="SweetSmart Dashboard Preview"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-foreground rounded-full flex items-center justify-center text-white font-bold text-lg animate-pulse">
              Try it
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
