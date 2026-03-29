import { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

const meetings = [
  { 
    id: 1, 
    title: "Interview - Senior Developer", 
    candidate: "John Smith", 
    type: "Interview", 
    date: "2026-03-15", 
    time: "10:00 AM",
    participants: ["Alice Johnson", "Bob Lee"],
    status: "Completed"
  },
  { 
    id: 2, 
    title: "Product Review Meeting", 
    candidate: "Sarah Johnson", 
    type: "Team Meeting", 
    date: "2026-03-14", 
    time: "2:00 PM",
    participants: ["Carol White", "David Kim"],
    status: "Completed"
  },
  { 
    id: 3, 
    title: "UX Designer Interview", 
    candidate: "Mike Chen", 
    type: "Interview", 
    date: "2026-03-16", 
    time: "11:00 AM",
    participants: ["Emma Davis"],
    status: "Scheduled"
  },
  { 
    id: 4, 
    title: "Sprint Planning", 
    candidate: "N/A", 
    type: "Sprint Review", 
    date: "2026-03-17", 
    time: "9:00 AM",
    participants: ["Frank Miller", "Grace Lee", "Henry Wilson"],
    status: "Scheduled"
  },
];

export function Meetings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.candidate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || meeting.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Meetings</h1>
          <p className="text-muted-foreground mt-2">Manage and track all your meetings</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Meeting</DialogTitle>
              <DialogDescription>Schedule a new meeting or interview</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter meeting title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Team Meeting">Team Meeting</SelectItem>
                    <SelectItem value="Client Meeting">Client Meeting</SelectItem>
                    <SelectItem value="Sprint Review">Sprint Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="candidate">Candidate Name (Optional)</Label>
                <Input id="candidate" placeholder="Enter candidate name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Add meeting notes or agenda" rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90">Create Meeting</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search meetings or candidates..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Team Meeting">Team Meeting</SelectItem>
                  <SelectItem value="Client Meeting">Client Meeting</SelectItem>
                  <SelectItem value="Sprint Review">Sprint Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meetings List */}
      <div className="grid gap-4">
        {filteredMeetings.map((meeting) => (
          <Card key={meeting.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{meeting.title}</h3>
                    <Badge 
                      variant={meeting.status === "Completed" ? "secondary" : "default"}
                      className={meeting.status === "Completed" ? "bg-secondary" : "bg-primary"}
                    >
                      {meeting.status}
                    </Badge>
                    <Badge variant="outline">{meeting.type}</Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {meeting.candidate !== "N/A" && (
                      <p>Candidate: <span className="font-medium text-foreground">{meeting.candidate}</span></p>
                    )}
                    <p>Date: {meeting.date} at {meeting.time}</p>
                    <p>Participants: {meeting.participants.join(", ")}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/meetings/${meeting.id}`}>
                    <Button variant="outline" size="sm" className="hover:bg-accent">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="hover:bg-accent">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-destructive hover:text-destructive-foreground">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
