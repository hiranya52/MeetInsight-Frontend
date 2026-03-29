import { Calendar, TrendingUp, Users, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const statsCards = [
  { title: "Total Meetings", value: "124", change: "+12%", icon: Calendar, color: "bg-primary" },
  { title: "Avg Rating", value: "4.2", change: "+0.3", icon: Star, color: "bg-secondary" },
  { title: "Active Candidates", value: "48", change: "+8", icon: Users, color: "bg-accent" },
  { title: "This Month", value: "32", change: "+15%", icon: TrendingUp, color: "bg-primary" },
];

const meetingData = [
  { month: "Jan", meetings: 12 },
  { month: "Feb", meetings: 15 },
  { month: "Mar", meetings: 18 },
  { month: "Apr", meetings: 22 },
  { month: "May", meetings: 28 },
  { month: "Jun", meetings: 32 },
];

const ratingData = [
  { month: "Jan", rating: 3.8 },
  { month: "Feb", rating: 4.0 },
  { month: "Mar", rating: 3.9 },
  { month: "Apr", rating: 4.1 },
  { month: "May", rating: 4.3 },
  { month: "Jun", rating: 4.2 },
];

const recentMeetings = [
  { id: 1, candidate: "John Smith", role: "Senior Developer", date: "2026-03-15", rating: 4.5 },
  { id: 2, candidate: "Sarah Johnson", role: "Product Manager", date: "2026-03-14", rating: 4.2 },
  { id: 3, candidate: "Mike Chen", role: "UX Designer", date: "2026-03-13", rating: 4.8 },
  { id: 4, candidate: "Emily Davis", role: "Data Scientist", date: "2026-03-12", rating: 4.0 },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your meeting overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-semibold mt-2">{stat.value}</p>
                    <p className="text-sm text-secondary mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Meeting Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={meetingData} id="meeting-trends-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b5456" />
                <YAxis stroke="#6b5456" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="meetings" fill="#583A3D" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Average Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ratingData} id="rating-trends-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b5456" />
                <YAxis domain={[0, 5]} stroke="#6b5456" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Line type="monotone" dataKey="rating" stroke="#85A290" strokeWidth={3} dot={{ fill: '#85A290', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Meetings */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Recent Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Candidate</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Rating</th>
                </tr>
              </thead>
              <tbody>
                {recentMeetings.map((meeting) => (
                  <tr key={meeting.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{meeting.candidate}</td>
                    <td className="py-3 px-4 text-muted-foreground">{meeting.role}</td>
                    <td className="py-3 px-4 text-muted-foreground">{meeting.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="font-medium">{meeting.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}