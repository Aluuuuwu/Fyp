
import { useState } from 'react';
import { Plus, Search, Filter, ChevronDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface NutritionGoal {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const initialFoods: FoodItem[] = [
  {
    id: '1',
    name: 'Oatmeal with Berries',
    calories: 350,
    protein: 12,
    carbs: 60,
    fat: 7,
    time: '8:30 AM',
    meal: 'breakfast',
  },
  {
    id: '2',
    name: 'Grilled Chicken Salad',
    calories: 420,
    protein: 35,
    carbs: 25,
    fat: 18,
    time: '12:30 PM',
    meal: 'lunch',
  },
  {
    id: '3',
    name: 'Apple',
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    time: '3:00 PM',
    meal: 'snack',
  },
];

const dailyGoals: NutritionGoal = {
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 65,
};

const FoodTracker = () => {
  const [foods, setFoods] = useState<FoodItem[]>(initialFoods);
  const [activeTab, setActiveTab] = useState<string>('all');
  const { toast } = useToast();

  const calculateTotals = () => {
    return foods.reduce(
      (totals, food) => {
        totals.calories += food.calories;
        totals.protein += food.protein;
        totals.carbs += food.carbs;
        totals.fat += food.fat;
        return totals;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const totals = calculateTotals();

  const handleAddFood = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to add foods will be available in the next update.",
    });
  };

  const handleDeleteFood = (id: string) => {
    setFoods(foods.filter((food) => food.id !== id));
    toast({
      title: "Food removed",
      description: "The food item has been removed from your diary.",
    });
  };

  const filteredFoods = activeTab === 'all' 
    ? foods 
    : foods.filter((food) => food.meal === activeTab);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Food Diary</h2>
          <p className="text-gray-600">Track your daily nutrition intake</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search foods..." 
              className="pl-10 w-full md:w-auto"
            />
          </div>
          <Button onClick={handleAddFood}>
            <Plus className="h-4 w-4 mr-2" />
            Add Food
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Calories', value: totals.calories, max: dailyGoals.calories, unit: 'kcal', color: 'bg-blue-500' },
          { label: 'Protein', value: totals.protein, max: dailyGoals.protein, unit: 'g', color: 'bg-red-500' },
          { label: 'Carbs', value: totals.carbs, max: dailyGoals.carbs, unit: 'g', color: 'bg-green-500' },
          { label: 'Fat', value: totals.fat, max: dailyGoals.fat, unit: 'g', color: 'bg-yellow-500' },
        ].map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{item.label}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex justify-between items-end mb-2">
                <span className="text-2xl font-bold">{item.value}</span>
                <span className="text-sm text-gray-500">of {item.max} {item.unit}</span>
              </div>
              <Progress 
                value={(item.value / item.max) * 100} 
                className="h-2"
                indicatorClassName={item.color}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="dinner">Dinner</TabsTrigger>
            <TabsTrigger value="snack">Snacks</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Food
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calories
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Protein
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Carbs
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Fat
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFoods.length > 0 ? (
                  filteredFoods.map((food) => (
                    <tr key={food.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">{food.name}</div>
                            <div className="text-sm text-gray-500 md:hidden">{food.time} · {food.meal}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                        {food.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {food.calories} kcal
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                        {food.protein}g
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                        {food.carbs}g
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                        {food.fat}g
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteFood(food.id)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <div className="mb-4 p-4 rounded-full bg-gray-100">
                          <Utensils className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No foods logged</h3>
                        <p className="text-gray-600 mb-4">Add some foods to your diary to see them here.</p>
                        <Button onClick={handleAddFood}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Food
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

import { Utensils } from 'lucide-react';

export default FoodTracker;
