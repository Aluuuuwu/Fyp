
import Layout from '@/components/layout/Layout';
import FoodTracker from '@/components/food/FoodTracker';
import FadeIn from '@/components/ui/fade-in';

const Food = () => {
  return (
    <Layout withFooter={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <h1 className="text-3xl font-bold tracking-tight mb-6">Food Diary</h1>
          <FoodTracker />
        </FadeIn>
      </div>
    </Layout>
  );
};

export default Food;
