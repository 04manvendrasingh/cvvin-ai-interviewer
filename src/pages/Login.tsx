import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (type: 'login' | 'signup') => {
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Error", 
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        email,
        id: Date.now().toString(),
        name: email.split('@')[0],
        hasProfile: type === 'login' // Simulate existing profile for login
      };
      
      localStorage.setItem("cvvin_token", JSON.stringify(userData));
      localStorage.setItem("cvvin_user", JSON.stringify(userData));
      
      // Trigger auth state update
      window.dispatchEvent(new Event('cvvin-auth-change'));
      
      toast({
        title: "Success",
        description: type === 'login' ? "Logged in successfully!" : "Account created successfully!",
      });
      
      // Route based on profile completion
      if (type === 'signup' || !userData.hasProfile) {
        navigate("/profile/setup");
      } else {
        navigate("/dashboard");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleAuth = () => {
    toast({
      title: "Coming Soon",
      description: "Google authentication will be available soon",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-elevated">
        <CardHeader className="text-center">
          <div className="w-16 h-16 gradient-primary rounded-xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">CV</span>
          </div>
          <CardTitle className="text-2xl font-semibold">Welcome to CVVIN</CardTitle>
          <CardDescription>
            AI-powered interview practice platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Log in</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAuth('login')}
                />
              </div>
              <Button 
                onClick={() => handleAuth('login')}
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Log in"}
              </Button>
              <Button 
                onClick={handleGoogleAuth}
                variant="outline" 
                className="w-full"
              >
                Continue with Google
              </Button>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAuth('signup')}
                />
              </div>
              <Button 
                onClick={() => handleAuth('signup')}
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
              <Button 
                onClick={handleGoogleAuth}
                variant="outline" 
                className="w-full"
              >
                Continue with Google
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;