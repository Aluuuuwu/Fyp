
import { useEffect, useState } from 'react';
import { CalendarDays, Clock, TrendingUp, Users, BarChart3, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const calorieData = [
  { day: 'Mon', calories: 1850, target: 2000 },
  { day: 'Tue', calories: 1950, target: 2000 },
  { day: 'Wed', calories: 2100, target: 2000 },
  { day: 'Thu', calories: 1800, target: 2000 },
  { day: 'Fri', calories: 2200, target: 2000 },
  { day: 'Sat', calories: 1900, target: 2000 },
  { day: 'Sun', calories: 1750, target: 2000 },
];

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
  { name: 'Protein', value: 125, target: 150 },
  { name: 'Carbs', value: 180, target: 200 },
  { name: 'Fat', value: 50, target: 65 },
  { name: 'Fiber', value: 20, target: 30 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-md shadow-md border border-gray-100">
        <p className="font-medium">{label}</p>
        <p className="text-primary">{`Calories: ${payload[0].value}`}</p>
        <p className="text-gray-500">{`Target: ${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
};

const WeightTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-md shadow-md border border-gray-100">
        <p className="font-medium">{label}</p>
        <p className="text-primary">{`Weight: ${payload[0].value} lbs`}</p>
      </div>
    );
  }
  return null;
};

const Overview = () => {
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      title: "Daily Calories",
      value: "1,850",
      change: "-8%",
      changeType: "decrease",
      icon: Clock,
      description: "from target 2,000",
    },
    {
      title: "Active Streak",
      value: "12",
      change: "+3",
      changeType: "increase",
      icon: TrendingUp,
      description: "consecutive days",
    },
    {
      title: "Weight",
      value: "175",
      change: "-2.5",
      changeType: "decrease",
      icon: BarChart3,
      description: "lbs this month",
    },
    {
      title: "Water",
      value: "6",
      change: "+1",
      changeType: "increase",
      icon: Users,
      description: "of 8 cups daily",
    },
  ];

  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Your health overview and daily progress.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className={`transition-all duration-500`} style={{ transitionDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              <div className={`text-xs inline-flex items-center rounded-full px-2 py-1 font-medium mt-2 ${
                stat.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {stat.changeType === 'increase' ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowUpRight className="h-3 w-3 mr-1 transform rotate-180" />
                )}
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="lg:col-span-4 transition-all duration-500" style={{ transitionDelay: '400ms' }}>
          <CardHeader>
            <CardTitle>Calorie Intake</CardTitle>
            <CardDescription>
              Your calorie consumption over the past week
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {isClient && (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={calorieData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} width={35} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="calories"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#ccc"
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3 transition-all duration-500" style={{ transitionDelay: '500ms' }}>
          <CardHeader>
            <CardTitle>Weight Progress</CardTitle>
            <CardDescription>
              Your weight change over time
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {isClient && (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weightData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} />
                    <YAxis 
                      domain={['dataMin - 5', 'dataMax + 5']}
                      tickLine={false} 
                      axisLine={false} 
                      width={35} 
                    />
                    <Tooltip content={<WeightTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="lg:col-span-3 transition-all duration-500" style={{ transitionDelay: '600ms' }}>
          <CardHeader>
            <CardTitle>Nutrition Breakdown</CardTitle>
            <CardDescription>
              Macronutrient consumption vs. targets
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isClient && (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={nutritionData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} width={35} />
                    <Tooltip />
                    <Bar 
                      dataKey="value" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]} 
                      name="Current"
                    />
                    <Bar 
                      dataKey="target" 
                      fill="rgba(0,0,0,0.1)" 
                      radius={[4, 4, 0, 0]} 
                      name="Target"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 transition-all duration-500" style={{ transitionDelay: '700ms' }}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest logged activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { type: 'food', name: 'Grilled Salmon with Vegetables', time: '30 minutes ago', calories: '+380 calories' },
                { type: 'exercise', name: 'Morning Run', time: '2 hours ago', calories: '-320 calories' },
                { type: 'weight', name: 'Weight Log', time: '5 hours ago', value: '175 lbs' },
                { type: 'water', name: 'Water Intake', time: '6 hours ago', value: '2 cups' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className={`rounded-full p-2 mr-4 
                    ${activity.type === 'food' ? 'bg-blue-100' : 
                      activity.type === 'exercise' ? 'bg-green-100' : 
                      activity.type === 'weight' ? 'bg-purple-100' : 'bg-cyan-100'}`}>
                    {activity.type === 'food' ? (
                      <Utensils className={`h-4 w-4 text-blue-600`} />
                    ) : activity.type === 'exercise' ? (
                      <Activity className={`h-4 w-4 text-green-600`} />
                    ) : activity.type === 'weight' ? (
                      <BarChart3 className={`h-4 w-4 text-purple-600`} />
                    ) : (
                      <Droplets className={`h-4 w-4 text-cyan-600`} />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.name}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <div className="ml-auto text-sm font-medium">
                    {activity.calories || activity.value}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

import { Utensils, Activity, Droplets } from 'lucide-react';

export default Overview;
