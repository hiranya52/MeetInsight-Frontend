import { TrendingUp, Users, Target, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,} from "recharts";

const kpiCards = [
  { title: "Total Interviews", value: "124", trend: "+12%", icon: Users, color: "bg-primary" },
  { title: "Hire Rate", value: "68%", trend: "+5%", icon: Target, color: "bg-secondary" },
  { title: "Avg Interview Score", value: "4.2/5", trend: "+0.3", icon: Award, color: "bg-accent" },
  { title: "Time to Hire", value: "18 days", trend: "-2 days", icon: TrendingUp, color: "bg-primary" },
];

const monthlyData = [
  { month: "Jan", interviews: 12, hires: 8 },
  { month: "Feb", interviews: 15, hires: 10 },
  { month: "Mar", interviews: 18, hires: 12 },
  { month: "Apr", interviews: 22, hires: 15 },
  { month: "May", interviews: 28, hires: 19 },
  { month: "Jun", interviews: 32, hires: 22 },
];

const departmentData = [
  { name: "Engineering", value: 45 },
  { name: "Product", value: 25 },
  { name: "Design", value: 18 },
  { name: "Marketing", value: 12 },
];

const COLORS = ["#583A3D", "#85A290", "#a8bdb0", "#c9b8a0"];

const radarData = [
  { skill: "Communication", john: 4.5, sarah: 4.0, mike: 5.0 },
  { skill: "Technical", john: 4.8, sarah: 4.2, mike: 4.8 },
  { skill: "Problem Solving", john: 4.5, sarah: 4.3, mike: 4.9 },
  { skill: "Culture Fit", john: 4.2, sarah: 4.1, mike: 4.7 },
];

const topCandidates = [
  { rank: 1, name: "Mike Chen", score: 4.85, position: "UX Designer" },
  { rank: 2, name: "John Smith", score: 4.5, position: "Senior Developer" },
  { rank: 3, name: "Sarah Johnson", score: 4.2, position: "Product Manager" },
  { rank: 4, name: "Emily Davis", score: 4.0, position: "Data Scientist" },
  { rank: 5, name: "Alex Wong", score: 3.95, position: "Frontend Developer" },
];

export function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-2">Insights and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className="text-3xl font-semibold mt-2">{kpi.value}</p>
                    <p className="text-sm text-secondary mt-1">{kpi.trend}</p>
                  </div>
                  <div className={`${kpi.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Interview & Hire Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="interviews" fill="#583A3D" name="Interviews" radius={[8, 8, 0, 0]} />
                <Bar dataKey="hires" fill="#85A290" name="Hires" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Interviews by Department</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  labelLine={false}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  label={(props: any) => {
                    const { name, percent } = props;
                    return `${name} ${((percent ?? 0) * 100).toFixed(0)}%`;
                  }}
                >
                  {departmentData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Radar Chart */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Candidate Skills Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis domain={[0, 5]} />
              <Radar name="John Smith" dataKey="john" stroke="#583A3D" fill="#583A3D" fillOpacity={0.3} />
              <Radar name="Sarah Johnson" dataKey="sarah" stroke="#85A290" fill="#85A290" fillOpacity={0.3} />
              <Radar name="Mike Chen" dataKey="mike" stroke="#a8bdb0" fill="#a8bdb0" fillOpacity={0.3} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Candidates */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Top Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCandidates.map((candidate) => (
              <div
                key={candidate.rank}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white font-semibold">#{candidate.rank}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{candidate.name}</h4>
                  <p className="text-sm text-muted-foreground">{candidate.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold">{candidate.score}</p>
                  <p className="text-xs text-muted-foreground">Overall Score</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}