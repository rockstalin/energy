import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, Info, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WeatherMap from "@/components/WeatherMap";

const data = [
  {
    name: "Mon",
    usage: 2400,
    production: 1398,
    amt: 2210,
  },
  {
    name: "Tue",
    usage: 1398,
    production: 2800,
    amt: 2290,
  },
  {
    name: "Wed",
    usage: 9800,
    production: 3908,
    amt: 2000,
  },
  {
    name: "Thu",
    usage: 3908,
    production: 4800,
    amt: 2181,
  },
  {
    name: "Fri",
    usage: 4800,
    production: 3800,
    amt: 2500,
  },
  {
    name: "Sat",
    usage: 3800,
    production: 4300,
    amt: 2100,
  },
  {
    name: "Sun",
    usage: 4300,
    production: 2400,
    amt: 2100,
  },
];

const DashboardPage = () => {
  const [timeRange, setTimeRange] = useState("daily");
  const [energyData, setEnergyData] = useState(data);

  useEffect(() => {
    // Simulate fetching data based on time range
    const fetchData = () => {
      // Replace with actual API call
      const newData = data.map((item) => ({
        ...item,
        usage: item.usage + Math.random() * 1000,
        production: item.production + Math.random() * 500,
      }));
      setEnergyData(newData);
    };

    fetchData();
  }, [timeRange]);

  // TypeScript fix for toFixed method
  const formatValue = (value: any): string => {
    if (typeof value === 'number') {
      return value.toFixed(1);
    }
    return String(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          View your energy usage and save money with renewable energy.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="settings" disabled>
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Energy Usage
                </CardTitle>
                <Info className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9,457 kWh</div>
                <p className="text-sm text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Energy Production
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7,457 kWh</div>
                <p className="text-sm text-muted-foreground">
                  +18.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Daily Usage
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+52.7%</div>
                <p className="text-sm text-muted-foreground">
                  Compared to last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Energy Price Trend
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72</div>
                <p className="text-sm text-muted-foreground">
                  -13% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Usage & Production</CardTitle>
                <CardDescription>
                  Overview of energy usage and production.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between pb-4">
                  <TabsList>
                    <TabsTrigger value="daily" onClick={() => setTimeRange("daily")}>Daily</TabsTrigger>
                    <TabsTrigger value="weekly" onClick={() => setTimeRange("weekly")}>Weekly</TabsTrigger>
                    <TabsTrigger value="monthly" onClick={() => setTimeRange("monthly")}>Monthly</TabsTrigger>
                  </TabsList>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart
                    data={energyData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${formatValue(value)} kWh`, 'Usage']}
                    />
                    <Area
                      type="monotone"
                      dataKey="usage"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="Usage"
                    />
                    <Area
                      type="monotone"
                      dataKey="production"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Production"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Add Weather Map */}
          <div className="grid gap-4 md:grid-cols-2">
            <WeatherMap />
            <Card>
              <CardHeader>
                <CardTitle>Website visits</CardTitle>
                <CardDescription>
                  Your website visits over the last 30 days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="production" fill="#8884d8" />
                    <Bar dataKey="usage" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics">Analytics Content</TabsContent>
        <TabsContent value="reports">Reports Content</TabsContent>
        <TabsContent value="settings">Settings Content</TabsContent>
      </Tabs>

      {/* Alert Analysis Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Alarm analysis</CardTitle>
          <CardDescription>
            Recent system alerts and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <div className="flex gap-4">
                <span>Today 0</span>
                <span>Yesterday 0</span>
                <span>Month-on-month %</span>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  serious
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  important
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  warn
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  remind
                </span>
              </div>
            </div>

            {/* Alert Rows */}
            <div className="space-y-2">
              {[
                {
                  type: "Power failure",
                  message: "Power failure alarm occurred 2024-12-18 08:59:33",
                  severity: "serious"
                },
                {
                  type: "Power failure",
                  message: "Power failure alarm occurred 2024-12-18 08:58:04",
                  severity: "serious"
                },
                {
                  type: "Power failure",
                  message: "Power failure alarm occurred 2024-12-16 13:19:28",
                  severity: "serious"
                },
                {
                  type: "Conjugation",
                  message: "Ajinan Integrated Data Fusion Management Platform,Longqiuji Station Longqiuji-Weichai start-stop status, split-transfer-combination event occurred 2024-12-13 10:06:22",
                  severity: "warn"
                },
                {
                  type: "Conjugation",
                  message: "Ajinan Integrated Data Fusion Management Platform,Longqiuji Station Longqiuji-Weichai manual and automatic status, split-transfer-combination event occurred 2024-12-13 10:05:38",
                  severity: "warn"
                }
              ].map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg border animate-slide-up"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    {
                      "bg-red-500": alert.severity === "serious",
                      "bg-yellow-500": alert.severity === "important",
                      "bg-orange-500": alert.severity === "warn",
                      "bg-blue-500": alert.severity === "remind"
                    }
                  )} />
                  <div className="flex-1">
                    <div className="font-medium">{alert.type}</div>
                    <div className="text-sm text-muted-foreground">{alert.message}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">confirm</Button>
                    <Button variant="outline" size="sm">Dispatch</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
