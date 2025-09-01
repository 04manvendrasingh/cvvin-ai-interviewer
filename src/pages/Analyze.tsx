import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Target, TrendingUp, AlertCircle, Link2, Download } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";

const Analyze = () => {
  const [resumeSource, setResumeSource] = useState<"profile" | "upload">("profile");
  const [resume, setResume] = useState<File | null>(null);
  const [profileResume, setProfileResume] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Load profile resume if available
    try {
      const profileData = localStorage.getItem("cvvin_profile");
      if (profileData) {
        const profile = JSON.parse(profileData);
        if (profile.resume) {
          setProfileResume(profile.resume);
        }
      }
    } catch (error) {
      console.error("Error loading profile resume:", error);
    }
  }, []);

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleJDUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.type === "text/plain" || file.name.endsWith('.txt')) {
        setJobDescriptionFile(file);
        // Read file content and set in textarea
        const reader = new FileReader();
        reader.onload = (e) => {
          setJobDescription(e.target?.result as string || "");
        };
        reader.readAsText(file);
        toast({
          title: "Job description uploaded",
          description: `${file.name} uploaded successfully`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or TXT file",
          variant: "destructive",
        });
      }
    }
  };

  const analyzeResume = async () => {
    const hasResume = (resumeSource === "profile" && profileResume) || (resumeSource === "upload" && resume);
    
    if (!hasResume || !jobDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a resume source and provide job description",
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
            {/* Resume Source Selection */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Resume Source</span>
                </CardTitle>
                <CardDescription>Choose your resume source for analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup 
                  value={resumeSource} 
                  onValueChange={(value: "profile" | "upload") => setResumeSource(value)}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="profile" id="profile-resume" />
                    <Label htmlFor="profile-resume" className="flex-1">
                      Use Profile Resume
                      {profileResume && (
                        <span className="block text-xs text-muted-foreground mt-1">
                          {profileResume.name} • Available in profile
                        </span>
                      )}
                      {!profileResume && (
                        <span className="block text-xs text-warning mt-1">
                          No resume uploaded in profile
                        </span>
                      )}
                    </Label>
                    {profileResume && (
                      <Button variant="outline" size="sm">
                        <Link2 className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upload" id="upload-resume" />
                    <Label htmlFor="upload-resume">Upload Another Resume</Label>
                  </div>
                </RadioGroup>

                {resumeSource === "upload" && (
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleResumeUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
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
                )}
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
                <CardDescription>Upload or paste the job description you're applying for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Upload JD File</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept=".pdf,.txt"
                        onChange={handleJDUpload}
                        className="hidden"
                        id="jd-upload"
                      />
                      <label htmlFor="jd-upload" className="cursor-pointer">
                        <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        {jobDescriptionFile ? (
                          <div>
                            <p className="text-xs font-medium">{jobDescriptionFile.name}</p>
                            <p className="text-xs text-muted-foreground">Click to change</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-xs font-medium">Upload JD</p>
                            <p className="text-xs text-muted-foreground">PDF or TXT</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Or Paste JD Text</Label>
                    <div className="text-center p-4 border rounded-lg bg-muted/20">
                      <p className="text-xs text-muted-foreground">
                        Use the textarea below to paste job description text
                      </p>
                    </div>
                  </div>
                </div>
                
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                
                {jobDescriptionFile && (
                  <p className="text-xs text-muted-foreground">
                    Note: Text in the field above takes precedence if both file and text are provided
                  </p>
                )}
              </CardContent>
            </Card>

            <Button 
              onClick={analyzeResume}
              disabled={
                !(resumeSource === "profile" && profileResume) && 
                !(resumeSource === "upload" && resume) || 
                !jobDescription.trim() || 
                isAnalyzing
              }
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