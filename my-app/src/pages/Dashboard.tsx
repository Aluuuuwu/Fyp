
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Overview from '@/components/dashboard/Overview';
import FadeIn from '@/components/ui/fade-in';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart2, Activity, Utensils, Flame } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  // Sample data for demonstration
  const caloriesConsumed = 1450;
  const caloriesBurned = 320;
  const caloriesGoal = 2000;
  const caloriesRemaining = caloriesGoal - caloriesConsumed + caloriesBurned;
  const caloriesProgress = Math.min(100, Math.round((caloriesConsumed / caloriesGoal) * 100));

  const weeklyData = [
    { day: 'Mon', calories: 1800, weight: 75.2, steps: 8500 },
    { day: 'Tue', calories: 1650, weight: 75.1, steps: 10200 },
    { day: 'Wed', calories: 2100, weight: 75.0, steps: 7300 },
    { day: 'Thu', calories: 1750, weight: 74.8, steps: 9100 },
    { day: 'Fri', calories: 1900, weight: 74.9, steps: 8700 },
    { day: 'Sat', calories: 2200, weight: 74.7, steps: 6500 },
    { day: 'Sun', calories: 1450, weight: 74.5, steps: 11200 },
  ];

  const recentFoods = [
    { name: 'Oatmeal with fruit', calories: 320, time: '8:30 AM' },
    { name: 'Grilled chicken salad', calories: 450, time: '12:45 PM' },
    { name: 'Protein shake', calories: 180, time: '3:15 PM' },
    { name: 'Salmon with vegetables', calories: 500, time: '7:00 PM' },
  ];

  const recentExercises = [
    { name: 'Morning run', calories: 220, duration: '25 min' },
    { name: 'Weight training', calories: 180, duration: '40 min' },
  ];

  return (
    <Layout withFooter={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <FadeIn>
          <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>
          
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
                  <Flame className="h-5 w-5 text-orange-500 mr-2" />
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
                  <Activity className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-2xl font-bold">{caloriesRemaining}</span>
                  <span className="text-sm text-gray-500 ml-1">cal</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Goal</CardTitle>
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
          
          <Tabs defaultValue="summary" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="calories">Calories</TabsTrigger>
              <TabsTrigger value="weight">Weight</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart2 className="h-5 w-5 mr-2" />
                      Calories This Week
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="calories" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Weight Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="day" />
                          <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                          <Tooltip />
                          <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="calories">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Detailed Calorie Breakdown</CardTitle>
                  <CardDescription>Your calorie intake and expenditure over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="calories" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="weight">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Weight Progress</CardTitle>
                  <CardDescription>Track your weight changes over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                        <Tooltip />
                        <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Activity Levels</CardTitle>
                  <CardDescription>Daily steps and activity metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="steps" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Utensils className="h-5 w-5 mr-2" />
                  Recent Foods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFoods.map((food, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">{food.name}</p>
                        <p className="text-sm text-gray-500">{food.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{food.calories} cal</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Exercise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExercises.map((exercise, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">{exercise.name}</p>
                        <p className="text-sm text-gray-500">{exercise.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{exercise.calories} cal</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      </div>
    </Layout>
  );
};

export default Dashboard;
