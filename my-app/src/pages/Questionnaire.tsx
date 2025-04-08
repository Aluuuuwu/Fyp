import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import FadeIn from '@/components/ui/fade-in';

interface Question {
  id: string;
  title: string;
  description: string;
  options: {
    value: string;
    label: string;
    icon?: JSX.Element;
  }[];
  type: 'radio' | 'checkbox';
  allowMultiple?: boolean;
}

const questions: Question[] = [
  {
    id: 'age',
    title: 'What is your age?',
    description: 'This helps us recommend meals that match your preferences.',
    options: [
      { value: '18-24', label: '18-24' },
      { value: '25-34', label: '25-34' },
      { value: '35-44', label: '35-44' },
      { value: '45+', label: 'Over 45' },
    ],
    type: 'radio',
  },
  {
    id: 'foodType',
    title: 'What type of food do you prefer?',
    description: 'This helps us recommend meals that match your preferences.',
    options: [
      { value: 'healthy', label: 'Healthy' },
      { value: 'moderately', label: 'Moderately Healthy' },
      { value: 'special', label: 'Special Diet' },
      { value: 'fast', label: 'Fast Food' },
    ],
    type: 'radio',
  },
  {
    id: 'calories',
    title: 'How many calories do you consume daily?',
    description: "We'll tailor your meal recommendations to match your energy needs.",
    options: [
      { value: 'less1200', label: 'Less than 1200' },
      { value: '1200-1800', label: '1200-1800' },
      { value: '1800-2500', label: '1800-2500' },
      { value: 'more2500', label: 'More than 2500' },
    ],
    type: 'radio',
  },
  {
    id: 'goal',
    title: 'What is your primary goal?',
    description: 'This helps us understand your motivation and provide relevant guidance.',
    options: [
      { value: 'loseWeight', label: 'Lose weight' },
      { value: 'gainWeight', label: 'Gain weight' },
      { value: 'buildMuscle', label: 'Build Muscle' },
      { value: 'eatHealthier', label: 'Eat Healthier' },
    ],
    type: 'radio',
  },
  {
    id: 'allergies',
    title: 'Do you have any food allergies?',
    description: 'Select all that apply to ensure we recommend safe options for you.',
    options: [
      { value: 'gluten', label: 'Gluten-Free' },
      { value: 'lactose', label: 'Lactose Free' },
      { value: 'nuts', label: 'Nut Free' },
      { value: 'soy', label: 'Soy Free' },
      { value: 'none', label: 'None' },
    ],
    type: 'checkbox',
    allowMultiple: true,
  },
  {
    id: 'activity',
    title: 'What is your activity level?',
    description: 'This helps us calculate your nutritional needs more accurately.',
    options: [
      { value: 'sedentary', label: 'Sedentary' },
      { value: 'light', label: 'Lightly Active' },
      { value: 'moderate', label: 'Moderately Active' },
      { value: 'very', label: 'Very Active' },
    ],
    type: 'radio',
  },
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({
    age: '',
    foodType: '',
    calories: '',
    goal: '',
    allergies: [],
    activity: '',
  });
  const [isComplete, setIsComplete] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const { toast } = useToast();
  const form = useForm();

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleGetRecommendations = async () => {
    toast({
      title: 'Profile completed!',
      description: 'Your personalized recommendations are ready.',
    });

    const token = localStorage.getItem('access_token'); // JWT token from login
    if (!token) {
      toast({
        title: 'Unauthorized',
        description: 'Please log in to receive personalized recommendations.',
        variant: 'destructive',
      });
      return;
    }

    const payload = {
      age: answers.age,
      gender: 'unspecified',
      calories: answers.calories,
      goal: answers.goal,
      allergies: Array.isArray(answers.allergies) ? answers.allergies.join(', ') : answers.allergies,
      activity: answers.activity,
      foodType: answers.foodType,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      toast({
        title: 'Network error',
        description: 'Unable to connect to the server.',
        variant: 'destructive',
      });
    }
  };

  const handleNext = () => {
    if (question.type === 'radio' && !answers[question.id]) {
      toast({
        title: 'Please select an option',
        description: 'You need to select an answer before continuing.',
        variant: 'destructive',
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else if (isComplete) {
      setIsComplete(false);
    }
  };

  const handleRadioChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (value === 'none' && checked) {
      setAnswers((prev) => ({ ...prev, [question.id]: ['none'] }));
      return;
    }

    setAnswers((prev) => {
      const current = (prev[question.id] as string[]) || [];
      const updated = checked ? [...current.filter((v) => v !== 'none'), value] : current.filter((v) => v !== value);
      return { ...prev, [question.id]: updated };
    });
  };

  const isOptionSelected = (id: string, value: string) => {
    return question.type === 'radio'
      ? answers[id] === value
      : ((answers[id] as string[]) || []).includes(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <FadeIn>
        <div className="w-full max-w-xl">
          {!isComplete ? (
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">{question.title}</CardTitle>
                <CardDescription>{question.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {question.type === 'radio' ? (
                  <RadioGroup value={answers[question.id] as string || ''} onValueChange={handleRadioChange}>
                    {question.options.map((opt) => (
                      <div key={opt.value} className="flex items-center space-x-2 rounded-lg border p-4">
                        <RadioGroupItem value={opt.value} id={opt.value} />
                        <Label htmlFor={opt.value} className="flex-1 cursor-pointer font-medium">
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="space-y-3">
                    {question.options.map((opt) => (
                      <div key={opt.value} className="flex items-center space-x-2 rounded-lg border p-4">
                        <Checkbox
                          id={opt.value}
                          checked={isOptionSelected(question.id, opt.value)}
                          onCheckedChange={(checked) => handleCheckboxChange(opt.value, checked as boolean)}
                        />
                        <Label htmlFor={opt.value} className="flex-1 cursor-pointer font-medium">
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack} disabled={currentQuestion === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext} className="bg-primary">
                  {currentQuestion < questions.length - 1 ? (
                    <>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Complete <Check className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Profile Complete!</CardTitle>
                <CardDescription>Your recommendations are ready.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="bg-primary/10 rounded-full p-4 mb-6">
                  <Check className="h-12 w-12 text-primary" />
                </div>
                <p className="text-gray-600 text-center mb-6">
                  We've collected your preferences. Click below to get food suggestions.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleGetRecommendations} className="bg-primary">
                  Get Recommendations <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        {isComplete && recommendations.length > 0 && (
          <div className="mt-8 w-full">
            <h2 className="text-xl font-bold text-center mb-4">Recommended Meals</h2>
            <div className="flex overflow-x-scroll gap-4">
              {recommendations.map((item, index) => (
                <img
                  key={index}
                  src={item.image_url}
                  alt={item.recipe_name}
                  className="w-48 h-32 object-cover rounded shadow"
                />
              ))}
            </div>
          </div>
        )}
      </FadeIn>
    </div>
  );
};

export default Questionnaire;
