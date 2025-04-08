
import { useState } from 'react';
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import FadeIn from '@/components/ui/fade-in';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Camera, Calendar, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const weightData = [
  { date: 'Apr 1', weight: 185 },
  { date: 'Apr 8', weight: 183 },
  { date: 'Apr 15', weight: 181 },
  { date: 'Apr 22', weight: 180 },
  { date: 'Apr 29', weight: 178 },
  { date: 'May 6', weight: 177 },
  { date: 'May 13', weight: 175 },
];

const nutritionData = [
  { date: 'Mon', calories: 1850, protein: 120, carbs: 180, fat: 60 },
  { date: 'Tue', calories: 1950, protein: 130, carbs: 190, fat: 65 },
  { date: 'Wed', calories: 2100, protein: 140, carbs: 200, fat: 70 },
  { date: 'Thu', calories: 1800, protein: 115, carbs: 170, fat: 55 },
  { date: 'Fri', calories: 2200, protein: 150, carbs: 210, fat: 75 },
  { date: 'Sat', calories: 1900, protein: 125, carbs: 185, fat: 62 },
  { date: 'Sun', calories: 1750, protein: 110, carbs: 165, fat: 58 },
];

const exerciseData = [
  { day: 'Week 1', cardio: 120, strength: 90, flexibility: 60 },
  { day: 'Week 2', cardio: 150, strength: 100, flexibility: 70 },
  { day: 'Week 3', cardio: 180, strength: 130, flexibility: 90 },
  { day: 'Week 4', cardio: 210, strength: 150, flexibility: 120 },
];

const measurementData = [
  { date: 'Apr 1', chest: 42, waist: 34, hips: 38 },
  { date: 'Apr 15', chest: 41.5, waist: 33, hips: 37.5 },
  { date: 'May 1', chest: 41, waist: 32, hips: 37 },
  { date: 'May 15', chest: 40.5, waist: 31, hips: 36.5 },
];

const Progress = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Layout withFooter={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Progress Tracker</h1>
              <p className="text-gray-600">Monitor your health and fitness journey</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Select defaultValue="30days">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Time Period</SelectLabel>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button>
                <Camera className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Current Weight</CardDescription>
                <CardTitle className="text-2xl">175 lbs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <TrendingDown className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">-10 lbs</span>
                  <span className="text-muted-foreground ml-2">since start</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>BMI</CardDescription>
                <CardTitle className="text-2xl">24.2</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                    Normal
                  </span>
                  <span className="text-muted-foreground ml-2">Healthy range</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Body Fat</CardDescription>
                <CardTitle className="text-2xl">18%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <TrendingDown className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">-3%</span>
                  <span className="text-muted-foreground ml-2">since start</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Daily Avg. Calories</CardDescription>
                <CardTitle className="text-2xl">1,875 kcal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <TrendingDown className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">-125 kcal</span>
                  <span className="text-muted-foreground ml-2">vs target</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="weight" className="mb-8">
            <TabsList>
              <TabsTrigger value="weight">Weight</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="exercise">Exercise</TabsTrigger>
              <TabsTrigger value="measurements">Measurements</TabsTrigger>
              <TabsTrigger value="photos">Progress Photos</TabsTrigger>
            </TabsList>

            <TabsContent value="weight" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Progression</CardTitle>
                  <CardDescription>
                    Track your weight changes over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isClient && (
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={weightData}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="date" tickLine={false} axisLine={false} />
                          <YAxis domain={['dataMin - 5', 'dataMax + 5']} tickLine={false} axisLine={false} />
                          <Tooltip />
                          <defs>
                            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="weight" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#colorWeight)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nutrition" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Progression</CardTitle>
                  <CardDescription>
                    Track your daily nutrient intake
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isClient && (
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={nutritionData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="date" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} />
                          <Tooltip />
                          <Bar dataKey="protein" stackId="a" fill="#8884d8" name="Protein" />
                          <Bar dataKey="carbs" stackId="a" fill="#82ca9d" name="Carbs" />
                          <Bar dataKey="fat" stackId="a" fill="#ffc658" name="Fat" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exercise" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exercise Progression</CardTitle>
                  <CardDescription>
                    Track your weekly exercise duration by type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isClient && (
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={exerciseData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="day" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} />
                          <Tooltip />
                          <Bar dataKey="cardio" name="Cardio (mins)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="strength" name="Strength (mins)" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="flexibility" name="Flexibility (mins)" fill="#ffc658" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="measurements" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Body Measurements</CardTitle>
                  <CardDescription>
                    Track changes in your body measurements over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isClient && (
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={measurementData}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="date" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} />
                          <Tooltip />
                          <Line type="monotone" dataKey="chest" stroke="#8884d8" strokeWidth={2} name="Chest (in)" />
                          <Line type="monotone" dataKey="waist" stroke="#82ca9d" strokeWidth={2} name="Waist (in)" />
                          <Line type="monotone" dataKey="hips" stroke="#ffc658" strokeWidth={2} name="Hips (in)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="photos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Photos</CardTitle>
                  <CardDescription>
                    Visual record of your transformation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="mb-6">
                      <Camera className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No progress photos yet</h3>
                      <p className="text-gray-600 mb-6">Add photos to visually track your progress over time</p>
                      <Button>
                        <Camera className="h-4 w-4 mr-2" />
                        Add First Photo
                      </Button>
                    </div>
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

export default Progress;
