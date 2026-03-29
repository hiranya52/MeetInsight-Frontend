import { useState } from "react";
import { Plus, CheckCircle2, Circle, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const tasks = [
  {
    id: 1,
    title: "Send offer letter to John Smith",
    meeting: "Interview - Senior Developer",
    assignee: "Bob Lee",
    status: "Pending",
    priority: "High",
    deadline: "2026-03-18"
  },
  {
    id: 2,
    title: "Schedule follow-up call",
    meeting: "Interview - Senior Developer",
    assignee: "Alice Johnson",
    status: "Completed",
    priority: "Medium",
    deadline: "2026-03-16"
  },
  {
    id: 3,
    title: "Review technical assessment",
    meeting: "UX Designer Interview",
    assignee: "Carol White",
    status: "In Progress",
    priority: "High",
    deadline: "2026-03-17"
  },
  {
    id: 4,
    title: "Prepare sprint retrospective notes",
    meeting: "Sprint Planning",
    assignee: "Frank Miller",
    status: "Pending",
    priority: "Low",
    deadline: "2026-03-20"
  },
  {
    id: 5,
    title: "Update candidate database",
    meeting: "Product Review Meeting",
    assignee: "David Kim",
    status: "Completed",
    priority: "Medium",
    deadline: "2026-03-15"
  },
];

export function Tasks() {
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all");

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "pending") return task.status === "Pending";
    if (filter === "in-progress") return task.status === "In Progress";
    if (filter === "completed") return task.status === "Completed";
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="h-5 w-5 text-secondary" />;
      case "In Progress":
        return <Clock className="h-5 w-5 text-accent" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive text-destructive-foreground";
      case "Medium":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const pendingCount = tasks.filter(t => t.status === "Pending").length;
  const inProgressCount = tasks.filter(t => t.status === "In Progress").length;
  const completedCount = tasks.filter(t => t.status === "Completed").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Action Items</h1>
          <p className="text-muted-foreground mt-2">Track and manage meeting action items</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Action Item</DialogTitle>
              <DialogDescription>Add a new task or action item</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="task-title">Task Title</Label>
                <Input id="task-title" placeholder="Enter task description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meeting">Related Meeting</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meeting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Interview - Senior Developer</SelectItem>
                    <SelectItem value="2">Product Review Meeting</SelectItem>
                    <SelectItem value="3">UX Designer Interview</SelectItem>
                    <SelectItem value="4">Sprint Planning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign to" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alice">Alice Johnson</SelectItem>
                      <SelectItem value="bob">Bob Lee</SelectItem>
                      <SelectItem value="carol">Carol White</SelectItem>
                      <SelectItem value="david">David Kim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input id="deadline" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90">Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-semibold mt-1">{pendingCount}</p>
              </div>
              <Circle className="h-10 w-10 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-3xl font-semibold mt-1">{inProgressCount}</p>
              </div>
              <Clock className="h-10 w-10 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-semibold mt-1">{completedCount}</p>
              </div>
              <CheckCircle2 className="h-10 w-10 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as any)}>
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4 mt-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getStatusIcon(task.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline">{task.meeting}</Badge>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge variant="secondary">{task.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Assigned to: <span className="font-medium text-foreground">{task.assignee}</span></p>
                          <p>Due: {task.deadline}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="hover:bg-accent">
                          Edit
                        </Button>
                        {task.status !== "Completed" && (
                          <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
