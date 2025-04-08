
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  imageUrl: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Create your account',
    description: 'Sign up for free and set up your profile with your personal details and health goals.',
    imageUrl: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    number: '02',
    title: 'Answer 5 simple questions',
    description: 'Tell us about your food preferences, dietary needs, and health goals so we can personalize your experience.',
    imageUrl: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    number: '03',
    title: 'Get food recommendations',
    description: 'Receive personalized meal suggestions and nutrition insights based on your diet preferences and goals.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    number: '04',
    title: 'Track your progress',
    description: 'Monitor your journey with detailed reports and analytics to see how your eating habits improve over time.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className="bg-gray-50 py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl font-bold text-gray-900 mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            How SweetSmart works
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            Getting started is simple. Follow these steps to begin your mindful eating journey.
          </p>
        </div>

        <div className="space-y-24 relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2 hidden md:block"></div>

          {steps.map((step, index) => (
            <div 
              key={index}
              className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              <div className={`md:grid md:grid-cols-2 md:gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Step content */}
                <div className={`mb-8 md:mb-0 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-5">
                    <span className="text-primary font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 text-lg max-w-md">{step.description}</p>
                </div>

                {/* Step image */}
                <div className={`rounded-xl overflow-hidden shadow-lg ${index % 2 === 1 ? 'md:order-first' : ''}`}>
                  <img 
                    src={step.imageUrl} 
                    alt={step.title} 
                    className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Connection dot (visible on medium screens and up) */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white rounded-full border-4 border-primary hidden md:block"
                     style={{ bottom: '-3rem' }}></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/questionnaire">
            <Button size="lg" className="font-medium group">
              Get started with your profile
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
