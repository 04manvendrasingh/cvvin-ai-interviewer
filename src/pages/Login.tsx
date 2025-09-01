import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!token.trim()) {
      toast({
        title: "Error",
        description: "Please enter a token",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("cvvin_token", token);
      
      // Trigger auth state update
      window.dispatchEvent(new Event('cvvin-auth-change'));
      
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      navigate("/");
      setIsLoading(false);
    }, 1000);
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
            Enter your access token to start your AI-powered interview practice
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token">Access Token</Label>
            <Input
              id="token"
              type="password"
              placeholder="Enter your token..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          <Button 
            onClick={handleLogin} 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Authenticating..." : "Sign In"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Demo token: <code className="bg-muted px-2 py-1 rounded">demo-token-123</code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;