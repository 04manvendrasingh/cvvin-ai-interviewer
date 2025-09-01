import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Target, TrendingUp, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";

const Analyze = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.name.endsWith('.pdf')) {
        setResume(file);
        toast({
          title: "Resume uploaded",
          description: `${file.name} uploaded successfully`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
      }
    }
  };

  const analyzeResume = async () => {
    if (!resume || !jobDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please upload a resume and provide job description",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call
    setTimeout(() => {
      const mockAnalysis = {
        matchScore: 78,
        matchedSkills: [
          "React", "TypeScript", "Node.js", "API Development", "Git"
        ],
        missingSkills: [
          "Docker", "Kubernetes", "AWS", "GraphQL"
        ],
        strengths: [
          "Strong frontend development experience",
          "Good understanding of modern JavaScript frameworks",
          "Experience with full-stack development"
        ],
        improvements: [
          "Add cloud platform experience",
          "Include containerization skills",
          "Demonstrate DevOps knowledge"
        ]
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete",
        description: `Your resume matches ${mockAnalysis.matchScore}% with the job requirements`,
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Resume Analysis</h1>
          <p className="text-muted-foreground">
            Upload your resume and job description to get AI-powered match analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Resume Upload */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload Resume</span>
                </CardTitle>
                <CardDescription>Upload your resume in PDF format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    {resume ? (
                      <div>
                        <p className="text-sm font-medium">{resume.name}</p>
                        <p className="text-xs text-muted-foreground">Click to change</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-medium">Click to upload resume</p>
                        <p className="text-xs text-muted-foreground">PDF files only</p>
                      </div>
                    )}
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
                <CardDescription>Paste the job description you're applying for</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={10}
                  className="resize-none"
                />
              </CardContent>
            </Card>

            <Button 
              onClick={analyzeResume}
              disabled={!resume || !jobDescription.trim() || isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Resume Match"}
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {isAnalyzing && (
              <Card className="card-shadow">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-sm text-muted-foreground">Analyzing your resume...</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {analysis && (
              <>
                {/* Match Score */}
                <Card className="card-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Match Score</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {analysis.matchScore}%
                      </div>
                      <Progress value={analysis.matchScore} className="w-full" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Your resume matches {analysis.matchScore}% of the job requirements
                    </p>
                  </CardContent>
                </Card>

                {/* Skills Analysis */}
                <Card className="card-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>Skills Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-success">Matched Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.matchedSkills.map((skill: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="bg-success/10 text-success">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-warning">Missing Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.missingSkills.map((skill: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="border-warning text-warning">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="card-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5" />
                      <span>Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-success">Strengths</h4>
                      <ul className="space-y-1">
                        {analysis.strengths.map((strength: string, idx: number) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <span className="text-success">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-warning">Areas for Improvement</h4>
                      <ul className="space-y-1">
                        {analysis.improvements.map((improvement: string, idx: number) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <span className="text-warning">•</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analyze;