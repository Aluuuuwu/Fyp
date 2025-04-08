
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <div className="bg-gradient-to-r from-primary-foreground to-primary py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6 md:text-4xl">
          Ready to transform your relationship with food?
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of users who are developing mindful eating habits and creating a healthier lifestyle with SweetSmart.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/questionnaire">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto font-medium group">
              Start your journey
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/features">
            <Button variant="outline" size="lg" className="w-full sm:w-auto font-medium border-white/20 text-white hover:bg-white/10">
              Explore features
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
