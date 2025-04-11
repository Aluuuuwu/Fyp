import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import FadeIn from '@/components/ui/fade-in';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Account created successfully!",
          description: "Now let's set up your profile preferences.",
        });
        navigate('/questionnaire');
      } else {
        toast({
          title: "Signup failed",
          description: data.message || "Something went wrong.",
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Network error",
        description: "Unable to reach the server.",
        variant: 'destructive',
      });
    }
  };

  const passwordStrength = password.length > 0 ? (
    password.length < 8 ? 'weak' :
      /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) ? 'strong' : 'medium'
  ) : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <FadeIn>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                SweetSmart
              </span>
            </Link>
          </div>

          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>
                Enter your information to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Smith"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {passwordStrength && (
                    <div className="flex items-center mt-2">
                      <div className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${passwordStrength === 'weak'
                            ? 'bg-red-500 w-1/3'
                            : passwordStrength === 'medium'
                              ? 'bg-yellow-500 w-2/3'
                              : 'bg-green-500 w-full'
                            }`}
                        />
                      </div>
                      <span className={`ml-2 text-xs ${passwordStrength === 'weak'
                        ? 'text-red-500'
                        : passwordStrength === 'medium'
                          ? 'text-yellow-500'
                          : 'text-green-500'
                        }`}>
                        {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                      </span>
                    </div>
                  )}
                  <div className="space-y-1 mt-2">
                    {[
                      { text: 'At least 8 characters', valid: password.length >= 8 },
                      { text: 'Contains a number', valid: /[0-9]/.test(password) },
                      { text: 'Contains uppercase & lowercase', valid: /[A-Z]/.test(password) && /[a-z]/.test(password) },
                    ].map((rule, index) => (
                      <div key={index} className={`flex items-center text-xs ${rule.valid && password ? 'text-green-600' : 'text-gray-500'}`}>
                        {rule.valid && password ? (
                          <Check className="h-3 w-3 mr-1" />
                        ) : (
                          <div className="h-3 w-3 mr-1" />
                        )}
                        {rule.text}
                      </div>
                    ))}
                  </div>
                </div>
                <Button type="submit" className="w-full font-medium">
                  Create Account
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full font-medium">
                  Google
                </Button>
                <Button variant="outline" className="w-full font-medium">
                  Apple
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-xs text-muted-foreground">
                By clicking Create Account, you agree to our{' '}
                <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
                  Privacy Policy
                </Link>.
              </div>
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </FadeIn>
    </div>
  );
};

export default Signup;
