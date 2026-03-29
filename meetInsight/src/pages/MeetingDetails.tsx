import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, Clock, Users, MessageSquare, CheckSquare } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";

const mockMeetingData = {
  id: 1,
  title: "Interview - Senior Developer",
  candidate: "John Smith",
  type: "Interview",
  date: "2026-03-15",
  time: "10:00 AM",
  status: "Completed",
  description: "Technical interview for Senior Developer position focusing on backend development and system design.",
  participants: [
    { name: "Alice Johnson", role: "Tech Lead" },
    { name: "Bob Lee", role: "HR Manager" },
  ],
  feedback: [
    {
      reviewer: "Alice Johnson",
      communication: 4.5,
      technical: 4.8,
      problemSolving: 4.5,
      cultureFit: 4.2,
      strengths: "Strong technical skills, excellent problem-solving approach",
      weaknesses: "Could improve on communication clarity",
      comments: "Impressive candidate with solid backend experience"
    }
  ],
  actionItems: [
    { id: 1, title: "Send offer letter", assignee: "Bob Lee", status: "Pending", deadline: "2026-03-18" },
    { id: 2, title: "Schedule follow-up call", assignee: "Alice Johnson", status: "Completed", deadline: "2026-03-16" },
  ],
  comments: [
    { id: 1, author: "Bob Lee", message: "Great candidate overall. Recommend moving forward.", time: "2 hours ago" },
    { id: 2, author: "Alice Johnson", message: "Agreed. Strong technical background.", time: "1 hour ago" },
  ]
};

export function MeetingDetails() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/meetings">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-foreground">{mockMeetingData.title}</h1>
          <p className="text-muted-foreground mt-1">Meeting ID: {id}</p>
        </div>
        <Badge className="bg-secondary">{mockMeetingData.status}</Badge>
      </div>

      {/* Meeting Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="font-medium">{mockMeetingData.date}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Clock className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="font-medium">{mockMeetingData.time}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Participants</p>
              <p className="font-medium">{mockMeetingData.participants.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CheckSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="font-medium">{mockMeetingData.type}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="tasks">Action Items</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground">{mockMeetingData.description}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Candidate</h4>
                <p className="text-muted-foreground">{mockMeetingData.candidate}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Participants</h4>
                <div className="space-y-2">
                  {mockMeetingData.participants.map((participant, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-muted-foreground">{participant.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          {mockMeetingData.feedback.map((fb, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>Feedback by {fb.reviewer}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Communication</span>
                      <span className="text-sm text-muted-foreground">{fb.communication}/5</span>
                    </div>
                    <Progress value={fb.communication * 20} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Technical Skills</span>
                      <span className="text-sm text-muted-foreground">{fb.technical}/5</span>
                    </div>
                    <Progress value={fb.technical * 20} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Problem Solving</span>
                      <span className="text-sm text-muted-foreground">{fb.problemSolving}/5</span>
                    </div>
                    <Progress value={fb.problemSolving * 20} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Culture Fit</span>
                      <span className="text-sm text-muted-foreground">{fb.cultureFit}/5</span>
                    </div>
                    <Progress value={fb.cultureFit * 20} className="h-2" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Strengths</h4>
                    <p className="text-sm text-muted-foreground">{fb.strengths}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Areas for Improvement</h4>
                    <p className="text-sm text-muted-foreground">{fb.weaknesses}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Additional Comments</h4>
                  <p className="text-sm text-muted-foreground">{fb.comments}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Action Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockMeetingData.actionItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Assigned to {item.assignee} • Due {item.deadline}
                      </p>
                    </div>
                    <Badge variant={item.status === "Completed" ? "secondary" : "outline"}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Discussion Thread</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMeetingData.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-sm text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="text-muted-foreground">{comment.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
