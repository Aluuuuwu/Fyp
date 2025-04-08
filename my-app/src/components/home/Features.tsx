
import { useState, useEffect, useRef } from 'react';
import { Check, Utensils, Activity, BarChart, Heart } from 'lucide-react';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Utensils,
    title: 'Mindful Eating',
    description: 'Track your meals and develop mindful eating habits with our comprehensive food database.',
  },
  {
    icon: Activity,
    title: 'Wellness Tracking',
    description: "Log your activities and see how they affect your overall wellness and relationship with food.",
  },
  {
    icon: BarChart, 
    title: 'Progress Insights',
    description: 'View detailed charts and insights about your nutrition patterns and mindful eating journey.',
  },
  {
    icon: Heart,
    title: 'Personalized Goals',
    description: 'Set realistic goals and get customized recommendations for your unique wellness journey.',
  },
];

const Features = () => {
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
    <div className="bg-white py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl font-bold text-gray-900 mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            Your path to mindful eating
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            Our comprehensive set of tools makes developing a healthy relationship with food simple and effective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className={`mt-16 bg-gradient-to-r from-gray-100 to-primary/10 rounded-2xl p-8 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why people love SweetSmart</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of users who are transforming their relationship with food through mindful eating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Guided mindful eating practices",
              "Simple intuitive interface",
              "Detailed nutrition insights",
              "Customized meal suggestions",
              "Personalized wellness goals",
              "Progress visualization"
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center mr-3">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
