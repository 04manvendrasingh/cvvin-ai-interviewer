import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Code, Mic, BarChart3, Camera, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";

const MockInterview = () => {
  const interviewSteps = [
    {
      title: "Resume Analysis",
      description: "Upload your resume and job description for AI analysis",
      icon: FileText,
      duration: "10-15 min",
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
      title: "Technical MCQs",
      description: "Answer multiple-choice questions based on the job requirements",
      icon: Code,
      duration: "30-45 min",
      color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
    },
    {
      title: "Coding Challenge",
      description: "Solve a programming problem in an online code editor",
      icon: Code,
      duration: "45-60 min",
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
    },
    {
      title: "HR Interview",
      description: "Answer behavioral questions with voice recording",
      icon: Mic,
      duration: "20-30 min",
      color: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
    },
    {
      title: "Feedback Report",
      description: "Get detailed analysis and recommendations",
      icon: BarChart3,
      duration: "5 min",
      color: "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400"
    }
  ];

  const features = [
    {
      title: "AI-Powered Proctoring",
      description: "Real-time monitoring for tab switches and webcam status",
      icon: Shield
    },
    {
      title: "Webcam Monitoring",
      description: "Camera access required for authentic interview simulation",
      icon: Camera
    },
    {
      title: "Detailed Analytics",
      description: "Comprehensive feedback on performance and areas for improvement",
      icon: BarChart3
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            End-to-End Mock Interview
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Experience a complete 2-2.5 hour interview simulation with AI-powered analysis
          </p>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span>Total Duration: 2-2.5 hours</span>
          </div>
        </div>

        {/* Interview Process */}
        <Card className="card-shadow mb-8">
          <CardHeader>
            <CardTitle>Interview Process</CardTitle>
            <CardDescription>
              Complete all stages for a comprehensive evaluation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {interviewSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 ${step.color} rounded-xl mx-auto mb-4 flex items-center justify-center`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {step.duration}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="card-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Important Notes */}
        <Card className="card-shadow mb-8">
          <CardHeader>
            <CardTitle>Important Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p>Ensure you have a stable internet connection throughout the interview</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p>Camera access is required for proctoring and will be monitored</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p>Tab switching and window focus changes will be tracked</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p>Find a quiet environment free from distractions</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p>The interview cannot be paused once started</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <div className="text-center">
          <Button size="lg" className="px-12 py-6 text-lg">
            Begin Full Mock Interview
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Ready to start your complete interview simulation?
          </p>
        </div>
      </main>
    </div>
  );
};

export default MockInterview;