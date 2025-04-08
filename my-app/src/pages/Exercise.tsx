
import Layout from '@/components/layout/Layout';
import FadeIn from '@/components/ui/fade-in';
import { Plus, Search, Clock, Calendar, Dumbbell, Activity, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const exercises = [
  {
    id: 1,
    name: 'Morning Run',
    type: 'Cardio',
    duration: '30 minutes',
    calories: 320,
    time: '7:00 AM',
    intensity: 'Moderate',
  },
  {
    id: 2,
    name: 'Weight Training',
    type: 'Strength',
    duration: '45 minutes',
    calories: 280,
    time: '6:00 PM',
    intensity: 'High',
  },
  {
    id: 3,
    name: 'Yoga',
    type: 'Flexibility',
    duration: '60 minutes',
    calories: 180,
    time: '8:00 PM',
    intensity: 'Low',
  },
];

const Exercise = () => {
  const { toast } = useToast();

  const handleAddExercise = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to add exercises will be available in the next update.",
    });
  };

  return (
    <Layout withFooter={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Exercise Diary</h1>
              <p className="text-gray-600">Track your workouts and physical activity</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search exercises..." 
                  className="pl-10 w-full md:w-auto"
                />
              </div>
              <Button onClick={handleAddExercise}>
                <Plus className="h-4 w-4 mr-2" />
                Add Exercise
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Today's Goal</CardDescription>
                <CardTitle className="text-2xl">500 calories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>0 calories</span>
                  <span>500 calories</span>
                </div>
                <Progress value={0} className="h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-2xl">780 / 2500 calories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>0 calories</span>
                  <span>2500 calories</span>
                </div>
                <Progress value={31.2} className="h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Time</CardDescription>
                <CardTitle className="text-2xl">2h 15m / 5h</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>0 hours</span>
                  <span>5 hours</span>
                </div>
                <Progress value={45} className="h-2" />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="cardio">Cardio</TabsTrigger>
                <TabsTrigger value="strength">Strength</TabsTrigger>
                <TabsTrigger value="flexibility">Flexibility</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Today
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 gap-4">
                {exercises.map((exercise) => (
                  <Card key={exercise.id} className="overflow-hidden">
                    <div className="border-l-4 border-primary h-full flex">
                      <CardContent className="p-0 flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-12 h-full">
                          <div className="col-span-7 p-6">
                            <div className="mb-1 flex items-center">
                              <span className="text-xs uppercase tracking-wider text-muted-foreground mr-2">
                                {exercise.type}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                {exercise.intensity}
                              </span>
                            </div>
                            <h3 className="font-semibold text-xl mb-1">{exercise.name}</h3>
                            <div className="flex items-center text-muted-foreground text-sm space-x-4">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{exercise.time}</span>
                              </div>
                              <div className="flex items-center">
                                <Dumbbell className="h-3 w-3 mr-1" />
                                <span>{exercise.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-5 bg-gray-50 flex items-center justify-between p-6 border-l">
                            <div>
                              <div className="text-sm text-muted-foreground">Calories Burned</div>
                              <div className="text-3xl font-semibold">{exercise.calories}</div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={handleAddExercise}>
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}

                <div className="text-center py-10">
                  <Button onClick={handleAddExercise}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add More Exercises
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </FadeIn>
      </div>
    </Layout>
  );
};

export default Exercise;
