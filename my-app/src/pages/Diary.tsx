
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import FadeIn from '@/components/ui/fade-in';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, PlusCircle, Utensils, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Diary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Sample data for demonstration
  const caloriesConsumed = 1450;
  const caloriesBurned = 320;
  const caloriesGoal = 2000;
  const caloriesRemaining = caloriesGoal - caloriesConsumed + caloriesBurned;
  const caloriesProgress = Math.min(100, Math.round((caloriesConsumed / caloriesGoal) * 100));
  
  const meals = [
    {
      name: 'Breakfast',
      foods: [
        { name: 'Oatmeal with fruit', calories: 320, protein: 12, carbs: 54, fat: 6 },
        { name: 'Coffee with milk', calories: 45, protein: 1, carbs: 2, fat: 2 },
      ]
    },
    {
      name: 'Lunch',
      foods: [
        { name: 'Grilled chicken salad', calories: 450, protein: 35, carbs: 20, fat: 15 },
        { name: 'Whole wheat bread', calories: 80, protein: 4, carbs: 15, fat: 1 },
      ]
    },
    {
      name: 'Dinner',
      foods: [
        { name: 'Salmon with vegetables', calories: 500, protein: 40, carbs: 15, fat: 25 },
      ]
    },
    {
      name: 'Snacks',
      foods: [
        { name: 'Protein shake', calories: 180, protein: 25, carbs: 5, fat: 3 },
        { name: 'Apple', calories: 95, protein: 0, carbs: 25, fat: 0 },
      ]
    }
  ];
  
  const exercises = [
    { name: 'Morning run', duration: '25 min', calories: 220 },
    { name: 'Weight training', duration: '40 min', calories: 180 },
  ];
  
  const nutrientTotals = {
    calories: caloriesConsumed,
    protein: 117,
    carbs: 136,
    fat: 52
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };
  
  const prevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };
  
  const nextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };
  
  return (
    <Layout withFooter={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <FadeIn>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Food Diary</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={prevDay}>&lt; Previous</Button>
              <span className="font-medium">{formatDate(selectedDate)}</span>
              <Button variant="outline" size="sm" onClick={nextDay}>Next &gt;</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Consumed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Utensils className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold">{caloriesConsumed}</span>
                  <span className="text-sm text-gray-500 ml-1">cal</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Burned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="text-2xl font-bold">{caloriesBurned}</span>
                  <span className="text-sm text-gray-500 ml-1">cal</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">{caloriesRemaining}</span>
                  <span className="text-sm text-gray-500 ml-1">cal</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Daily Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{caloriesGoal}</span>
                    <span className="text-sm font-medium">{caloriesProgress}%</span>
                  </div>
                  <Progress value={caloriesProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="food" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="food">Food</TabsTrigger>
              <TabsTrigger value="exercise">Exercise</TabsTrigger>
            </TabsList>
            
            <TabsContent value="food">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input 
                    type="search" 
                    placeholder="Search for a food..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                {meals.map((meal, index) => (
                  <Card key={index} className="bg-white shadow-sm">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle>{meal.name}</CardTitle>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <PlusCircle size={16} />
                        Add Food
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
                          <div className="col-span-2">Food</div>
                          <div className="text-right">Calories</div>
                          <div className="text-right">Protein</div>
                          <div className="text-right">Carbs</div>
                        </div>
                        
                        {meal.foods.map((food, idx) => (
                          <div key={idx} className="grid grid-cols-5 gap-4 text-sm items-center">
                            <div className="col-span-2 font-medium">{food.name}</div>
                            <div className="text-right">{food.calories}</div>
                            <div className="text-right">{food.protein}g</div>
                            <div className="text-right">{food.carbs}g</div>
                          </div>
                        ))}
                        
                        {meal.foods.length === 0 && (
                          <div className="text-center py-4 text-gray-500">
                            No foods added yet
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle>Totals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-4 text-sm font-bold">
                      <div className="col-span-2">Daily Nutrition</div>
                      <div className="text-right">{nutrientTotals.calories} cal</div>
                      <div className="text-right">{nutrientTotals.protein}g</div>
                      <div className="text-right">{nutrientTotals.carbs}g</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="exercise">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input 
                    type="search" 
                    placeholder="Search for an exercise..." 
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Card className="bg-white shadow-sm mb-6">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle>Exercises</CardTitle>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <PlusCircle size={16} />
                    Add Exercise
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500 border-b pb-2">
                      <div>Exercise</div>
                      <div className="text-right">Duration</div>
                      <div className="text-right">Calories</div>
                    </div>
                    
                    {exercises.map((exercise, idx) => (
                      <div key={idx} className="grid grid-cols-3 gap-4 text-sm items-center">
                        <div className="font-medium">{exercise.name}</div>
                        <div className="text-right">{exercise.duration}</div>
                        <div className="text-right">{exercise.calories}</div>
                      </div>
                    ))}
                    
                    {exercises.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        No exercises added yet
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle>Total Calories Burned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 text-orange-500 mr-2" />
                    <span className="text-2xl font-bold">{caloriesBurned}</span>
                    <span className="text-sm text-gray-500 ml-1">calories</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </FadeIn>
      </div>
    </Layout>
  );
};

export default Diary;
