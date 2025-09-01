import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Code, Mic, BarChart3, Clock, Star } from "lucide-react";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const mockStats = {
    totalSessions: 12,
    averageScore: 78,
    lastSessionDate: "2 days ago",
    skillLevel: "Intermediate"
  };

  const quickActions = [
    {
      title: "Resume Analysis",
      description: "Upload your resume and analyze job fit",
      icon: FileText,
      path: "/analyze",
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
      title: "Technical Interview",
      description: "Practice coding and MCQ questions",
      icon: Code,
      path: "/tech",
      color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
    },
    {
      title: "HR Interview",
      description: "Simulate behavioral interview scenarios",
      icon: Mic,
      path: "/hr",
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
    },
    {
      title: "View Feedback",
      description: "Check your performance analytics",
      icon: BarChart3,
      path: "/feedback",
      color: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to practice your interview skills? Let's get started.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-semibold">{mockStats.averageScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                  <p className="text-2xl font-semibold">{mockStats.totalSessions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Session</p>
                  <p className="text-2xl font-semibold">{mockStats.lastSessionDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-sm">
                  {mockStats.skillLevel}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Skill Level</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card key={action.path} className="card-shadow hover:card-elevated transition-smooth cursor-pointer group">
                  <Link to={action.path}>
                    <CardHeader className="text-center pb-2">
                      <div className={`w-12 h-12 ${action.color} rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-smooth`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-center">
                        {action.description}
                      </CardDescription>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Flagship CTA */}
        <Card className="card-shadow mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Ready for the Complete Experience?
              </h2>
              <p className="text-muted-foreground mb-6">
                Take our full 2-2.5 hour interview simulation with resume analysis, technical questions, coding challenges, and HR interview.
              </p>
              <Link to="/mock/full">
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  title="A full 2–2.5 hour interview simulation (Resume→Tech MCQs→Coding→HR) with detailed proctoring & feedback."
                >
                  Start End-to-End Mock Interview
                </Button>
              </Link>
              <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>2-2.5 hours</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BarChart3 className="w-4 h-4" />
                  <span>Detailed feedback</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interview practice sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Technical", score: 85, date: "2 days ago", status: "Completed" },
                { type: "HR Interview", score: 72, date: "1 week ago", status: "Completed" },
                { type: "Resume Analysis", score: 90, date: "2 weeks ago", status: "Completed" },
              ].map((session, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div>
                      <p className="font-medium">{session.type}</p>
                      <p className="text-sm text-muted-foreground">{session.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">{session.score}%</Badge>
                    <Badge variant="secondary">{session.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;