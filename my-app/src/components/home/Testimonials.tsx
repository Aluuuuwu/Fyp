
import { useState, useEffect, useRef } from 'react';
import { StarIcon } from 'lucide-react';

interface Testimonial {
  content: string;
  author: string;
  role: string;
  rating: number;
  imageUrl: string;
}

const testimonials: Testimonial[] = [
  {
    content: "FitTrack has completely transformed my health journey. The intuitive interface makes tracking my meals and workouts effortless. I've lost 15 pounds in just two months!",
    author: "Emma Thompson",
    role: "Fitness Enthusiast",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    content: "As a personal trainer, I recommend FitTrack to all my clients. The detailed nutrition breakdown and progress reports keep them motivated and accountable.",
    author: "Michael Rodriguez",
    role: "Personal Trainer",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    content: "The food database is incredibly comprehensive. I love that I can scan barcodes for instant tracking, and the recipe builder makes planning my meals so much easier.",
    author: "Sarah Johnson",
    role: "Nutrition Coach",
    rating: 4,
    imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
];

const Testimonials = () => {
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
            What our users are saying
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            Thousands of users have transformed their health journey with FitTrack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              {/* Rating stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill={i < testimonial.rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              
              {/* Testimonial content */}
              <p className="text-gray-700 mb-6 text-lg italic">"{testimonial.content}"</p>
              
              {/* Author information */}
              <div className="flex items-center">
                <img 
                  src={testimonial.imageUrl} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div 
          className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}
        >
          {[
            { value: '1M+', label: 'Active Users' },
            { value: '11M+', label: 'Foods in Database' },
            { value: '98%', label: 'Customer Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl">
              <p className="text-4xl font-bold text-primary mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
