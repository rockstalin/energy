
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Map, 
  Home, 
  Users, 
  LightbulbOff, 
  ChevronLeft, 
  ChevronRight,
  ArrowDown,
  ArrowUp, 
  Zap,
  AlertTriangle
} from "lucide-react";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChartContainer } from "@/components/ui/chart";

interface EnergyData {
  time: string;
  energy: number;
  solar?: number;
  evening?: number;
  day?: number;
  late?: number;
  overnight?: number;
  bestTimes?: number;
}

const chartData: EnergyData[] = [
  { time: "March 10", energy: 4.5, solar: 1.2, evening: 2.5, day: 3.8, late: 2.1, overnight: 1.5, bestTimes: 4.9 },
  { time: "March 11", energy: 5.2, solar: 1.0, evening: 2.1, day: 3.5, late: 2.4, overnight: 1.6, bestTimes: 5.3 },
  { time: "March 12", energy: 4.8, solar: 1.5, evening: 2.8, day: 3.2, late: 2.2, overnight: 1.3, bestTimes: 4.7 },
  { time: "March 13", energy: 5.5, solar: 1.8, evening: 3.0, day: 3.9, late: 2.8, overnight: 1.7, bestTimes: 5.6 },
  { time: "March 14", energy: 4.2, solar: 1.3, evening: 2.3, day: 3.0, late: 2.0, overnight: 1.2, bestTimes: 4.5 },
  { time: "March 15", energy: 3.8, solar: 0.9, evening: 2.0, day: 2.7, late: 1.8, overnight: 1.0, bestTimes: 4.0 },
  { time: "March 16", energy: 4.0, solar: 1.1, evening: 2.2, day: 2.9, late: 1.9, overnight: 1.1, bestTimes: 4.2 },
  { time: "March 17", energy: 4.3, solar: 1.2, evening: 2.4, day: 3.1, late: 2.1, overnight: 1.2, bestTimes: 4.5 },
  { time: "March 18", energy: 4.7, solar: 1.4, evening: 2.6, day: 3.4, late: 2.3, overnight: 1.4, bestTimes: 4.8 },
  { time: "March 19", energy: 5.0, solar: 1.6, evening: 2.8, day: 3.6, late: 2.5, overnight: 1.5, bestTimes: 5.1 },
  { time: "March 20", energy: 5.3, solar: 1.7, evening: 3.0, day: 3.8, late: 2.7, overnight: 1.6, bestTimes: 5.4 },
];

const priceData = [
  { type: "Day Price", time: "7am - 4pm", solar: 12.50, other: 24.38 },
  { type: "Evening Price", time: "4pm - 7pm", solar: 12.50, other: 31.71 },
  { type: "Late Price", time: "7pm - 4am", solar: 12.50, other: 24.38 },
  { type: "Overnight Price", time: "4am - 7am", solar: 12.50, other: 17.07 },
];

const ForecastPage = () => {
  const [selectedWeek, setSelectedWeek] = useState("This week");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Energy Forecast</h1>
        <p className="text-muted-foreground">
          Check when renewable energy is cheapest and most available.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="bg-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              <h3 className="font-medium">North Oxfordshire Overview</h3>
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-medium">A good time to use it?</p>
              <div className="mt-3 flex justify-center gap-5">
                <div className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white">
                  <LightbulbOff className="h-5 w-5" />
                </div>
                <div className="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center">
                </div>
                <div className="bg-green-500 rounded-full w-10 h-10 flex items-center justify-center">
                </div>
              </div>
              <p className="mt-3 text-sm">There is currently no local solar available.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              <h3 className="font-medium">Your House</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <h3 className="font-medium">Your Club</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-teal-700 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-medium">Suggestions</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-green-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center">
            <h3 className="text-lg font-medium">High cost electricity</h3>
          </div>
          <ArrowUp className="h-5 w-5" />
        </CardHeader>
      </Card>

      <div className="relative">
        <Card className="bg-green-700 text-white rounded-b-none rounded-t-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Local Electricity</h3>
            </div>
            <div className="flex items-center gap-2">
              <ChevronLeft className="h-5 w-5 cursor-pointer" />
              <ChevronRight className="h-5 w-5 cursor-pointer" />
              <select
                className="bg-green-600 text-white rounded px-2 py-1 text-sm border-none"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
              >
                <option>This week</option>
                <option>Next week</option>
              </select>
              <ArrowDown className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="pb-10">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold uppercase">VERY LOW</h2>
              <p className="text-sm">Currently producing 0 kW</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-t-none rounded-b-lg">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 mb-4 justify-center">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-400"></div>
                <span className="text-xs">Day</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-600"></div>
                <span className="text-xs">In the Evening</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-900"></div>
                <span className="text-xs">Late</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-400"></div>
                <span className="text-xs">Over Night</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500"></div>
                <span className="text-xs">Solar</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-pink-500"></div>
                <span className="text-xs">Best times to use power (0-10)</span>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ChartContainer
                className="h-full"
                config={{
                  solar: { color: "#22c55e" },
                  day: { color: "#facc15" },
                  evening: { color: "#ca8a04" },
                  late: { color: "#1e3a8a" },
                  overnight: { color: "#60a5fa" },
                  bestTimes: { color: "#ec4899" },
                }}
              >
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="solar" stackId="1" stroke="#22c55e" fill="#22c55e" />
                  <Area type="monotone" dataKey="day" stackId="1" stroke="#facc15" fill="#facc15" />
                  <Area type="monotone" dataKey="evening" stackId="1" stroke="#ca8a04" fill="#ca8a04" />
                  <Area type="monotone" dataKey="late" stackId="1" stroke="#1e3a8a" fill="#1e3a8a" />
                  <Area type="monotone" dataKey="overnight" stackId="1" stroke="#60a5fa" fill="#60a5fa" />
                  <Area type="monotone" dataKey="bestTimes" stackId="2" stroke="#ec4899" fill="transparent" />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-green-600 text-white">
        <CardContent className="py-2 px-4">
          <div className="flex items-center justify-between">
            <span>Solar output is currently lower than club consumption</span>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" /> 
              <span className="text-sm font-medium">Best time to use power 10/10, worst time 0/10</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 bg-green-700 text-white rounded-t-lg">
          <h3 className="text-lg font-medium">Your prices for power</h3>
          <ArrowDown className="h-5 w-5" />
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Time Period</TableHead>
                <TableHead className="w-1/3 bg-yellow-300 text-center">Solar</TableHead>
                <TableHead className="w-1/3 text-center">The rest of the electricity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="font-semibold">{item.type}</div>
                    <div className="text-sm text-muted-foreground">{item.time}</div>
                  </TableCell>
                  <TableCell className="text-center bg-yellow-50">{item.solar}p</TableCell>
                  <TableCell className="text-center">{item.other}p</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-2 text-right text-sm text-muted-foreground">
            Prices here include VAT
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForecastPage;
