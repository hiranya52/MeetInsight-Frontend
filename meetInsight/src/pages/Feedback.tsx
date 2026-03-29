import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Slider } from "../components/ui/slider";

const feedbackList = [
  {
    id: 1,
    candidate: "John Smith",
    reviewer: "Alice Johnson",
    date: "2026-03-15",
    ratings: {
      communication: 4.5,
      technical: 4.8,
      problemSolving: 4.5,
      cultureFit: 4.2
    },
    overall: 4.5
  },
  {
    id: 2,
    candidate: "Sarah Johnson",
    reviewer: "Bob Lee",
    date: "2026-03-14",
    ratings: {
      communication: 4.0,
      technical: 4.2,
      problemSolving: 4.3,
      cultureFit: 4.1
    },
    overall: 4.2
  },
  {
    id: 3,
    candidate: "Mike Chen",
    reviewer: "Carol White",
    date: "2026-03-13",
    ratings: {
      communication: 5.0,
      technical: 4.8,
      problemSolving: 4.9,
      cultureFit: 4.7
    },
    overall: 4.8
  },
];

export function Feedback() {
  const [communicationRating, setCommunicationRating] = useState([4]);
  const [technicalRating, setTechnicalRating] = useState([4]);
  const [problemSolvingRating, setProblemSolvingRating] = useState([4]);
  const [cultureFitRating, setCultureFitRating] = useState([4]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Feedback</h1>
          <p className="text-muted-foreground mt-2">Review and submit interview feedback</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Submit Feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Submit Interview Feedback</DialogTitle>
              <DialogDescription>Provide detailed feedback for the candidate</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="meeting">Select Meeting</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a meeting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Interview - Senior Developer (John Smith)</SelectItem>
                    <SelectItem value="2">Product Manager Interview (Sarah Johnson)</SelectItem>
                    <SelectItem value="3">UX Designer Interview (Mike Chen)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Rating Categories</h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Communication Skills</Label>
                      <span className="text-sm text-muted-foreground">{communicationRating[0]}/5</span>
                    </div>
                    <Slider
                      value={communicationRating}
                      onValueChange={setCommunicationRating}
                      max={5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Technical Skills</Label>
                      <span className="text-sm text-muted-foreground">{technicalRating[0]}/5</span>
                    </div>
                    <Slider
                      value={technicalRating}
                      onValueChange={setTechnicalRating}
                      max={5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Problem Solving</Label>
                      <span className="text-sm text-muted-foreground">{problemSolvingRating[0]}/5</span>
                    </div>
                    <Slider
                      value={problemSolvingRating}
                      onValueChange={setProblemSolvingRating}
                      max={5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Culture Fit</Label>
                      <span className="text-sm text-muted-foreground">{cultureFitRating[0]}/5</span>
                    </div>
                    <Slider
                      value={cultureFitRating}
                      onValueChange={setCultureFitRating}
                      max={5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="strengths">Key Strengths</Label>
                <Textarea 
                  id="strengths" 
                  placeholder="What did the candidate do well?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weaknesses">Areas for Improvement</Label>
                <Textarea 
                  id="weaknesses" 
                  placeholder="What could the candidate improve?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Additional Comments</Label>
                <Textarea 
                  id="comments" 
                  placeholder="Any other observations or notes"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90">Submit Feedback</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Feedback List */}
      <div className="grid gap-4">
        {feedbackList.map((feedback) => (
          <Card key={feedback.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold">{feedback.candidate}</h3>
                    <div className="flex items-center gap-1 bg-secondary/10 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-secondary">Overall: {feedback.overall}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Reviewed by {feedback.reviewer} on {feedback.date}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Communication</p>
                      <p className="text-lg font-semibold">{feedback.ratings.communication}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Technical</p>
                      <p className="text-lg font-semibold">{feedback.ratings.technical}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Problem Solving</p>
                      <p className="text-lg font-semibold">{feedback.ratings.problemSolving}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Culture Fit</p>
                      <p className="text-lg font-semibold">{feedback.ratings.cultureFit}</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="hover:bg-accent">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
