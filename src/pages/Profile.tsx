import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Plus, Download, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    profilePicture: null as File | null,
    fullName: "",
    email: "",
    phoneNumber: "",
    qualification: "",
    college: "",
    currentSemester: "",
    yearOfPassing: "",
    currentlyPursuing: "",
    resume: null as File | null,
  });
  
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [interestedRoles, setInterestedRoles] = useState<string[]>([]);
  
  const commonSkills = [
    "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", 
    "Docker", "AWS", "Git", "SQL", "MongoDB", "GraphQL", "REST APIs"
  ];
  
  const commonRoles = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", 
    "Data Scientist", "DevOps Engineer", "Product Manager", "UI/UX Designer"
  ];

  useEffect(() => {
    // Load existing profile data
    const loadProfile = () => {
      try {
        const profileData = localStorage.getItem("cvvin_profile");
        if (profileData) {
          const profile = JSON.parse(profileData);
          setFormData({
            profilePicture: profile.profilePicture || null,
            fullName: profile.fullName || "",
            email: profile.email || "",
            phoneNumber: profile.phoneNumber || "",
            qualification: profile.qualification || "",
            college: profile.college || "",
            currentSemester: profile.currentSemester || "",
            yearOfPassing: profile.yearOfPassing || "",
            currentlyPursuing: profile.currentlyPursuing || "",
            resume: profile.resume || null,
          });
          setSkills(profile.skills || []);
          setInterestedRoles(profile.interestedRoles || []);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    
    loadProfile();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
      toast({
        title: "File uploaded",
        description: `${file.name} uploaded successfully`,
      });
    }
  };

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const toggleRole = (role: string) => {
    if (interestedRoles.includes(role)) {
      setInterestedRoles(interestedRoles.filter(r => r !== role));
    } else {
      setInterestedRoles([...interestedRoles, role]);
    }
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in at least your name and email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const profileData = {
        ...formData,
        skills,
        interestedRoles,
        isComplete: true
      };
      
      localStorage.setItem("cvvin_profile", JSON.stringify(profileData));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully!",
      });
      
      setIsLoading(false);
    }, 1000);
  };

  const handleDownloadResume = () => {
    if (formData.resume) {
      // In a real app, this would download the file
      toast({
        title: "Download started",
        description: "Your resume is being downloaded",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your profile information and preferences
          </p>
        </div>

        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your profile to get better interview recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="space-y-2">
              <Label>Profile Picture</Label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 border-2 border-dashed border-border rounded-full flex items-center justify-center">
                  {formData.profilePicture ? (
                    <img 
                      src={URL.createObjectURL(formData.profilePicture)} 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('profilePicture', e)}
                    className="hidden"
                    id="profile-picture"
                  />
                  <Label htmlFor="profile-picture" className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>Change Photo</span>
                    </Button>
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    A clear photo helps with proctoring accuracy
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Education</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Qualification</Label>
                  <Select value={formData.qualification} onValueChange={(value) => handleInputChange('qualification', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="college">College/University</Label>
                  <Input
                    id="college"
                    value={formData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    placeholder="Enter your institution"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentSemester">Current Semester/Year</Label>
                  <Input
                    id="currentSemester"
                    value={formData.currentSemester}
                    onChange={(e) => handleInputChange('currentSemester', e.target.value)}
                    placeholder="e.g., 6th Semester"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="yearOfPassing">Year of Passing</Label>
                  <Input
                    id="yearOfPassing"
                    value={formData.yearOfPassing}
                    onChange={(e) => handleInputChange('yearOfPassing', e.target.value)}
                    placeholder="e.g., 2024"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentlyPursuing">What are you currently pursuing?</Label>
                <Textarea
                  id="currentlyPursuing"
                  value={formData.currentlyPursuing}
                  onChange={(e) => handleInputChange('currentlyPursuing', e.target.value)}
                  placeholder="Describe your current studies or focus area"
                  rows={3}
                />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Skills</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {commonSkills.map((skill) => (
                  <Button
                    key={skill}
                    variant={skills.includes(skill) ? "default" : "outline"}
                    size="sm"
                    onClick={() => addSkill(skill)}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add custom skill"
                  onKeyPress={(e) => e.key === "Enter" && addSkill(newSkill)}
                />
                <Button onClick={() => addSkill(newSkill)} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
                    <span>{skill}</span>
                    <button onClick={() => removeSkill(skill)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Interested Roles */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Interested Roles</h3>
              <div className="flex flex-wrap gap-2">
                {commonRoles.map((role) => (
                  <Button
                    key={role}
                    variant={interestedRoles.includes(role) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleRole(role)}
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>

            {/* Resume Management */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Profile Resume</h3>
              
              {formData.resume ? (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium">{formData.resume.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Profile Resume • Used for analysis
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handleDownloadResume}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload('resume', e)}
                        className="hidden"
                        id="resume-replace"
                      />
                      <Label htmlFor="resume-replace" className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                          <span>Replace</span>
                        </Button>
                      </Label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload('resume', e)}
                    className="hidden"
                    id="resume-upload"
                  />
                  <Label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Upload your resume</p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX files</p>
                  </Label>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="pt-6">
              <Button 
                onClick={handleSave} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;