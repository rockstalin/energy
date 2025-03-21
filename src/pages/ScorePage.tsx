
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const ScorePage = () => {
  const [timeRange, setTimeRange] = useState("two-weeks");
  
  const score = 46;
  const savedAmount = "£88";
  
  const electricityData = [
    { name: "Overnight", value: 44, color: "#1E3A29" },
    { name: "Day", value: 35, color: "#F6C165" },
    { name: "Evening", value: 21, color: "#D86644" },
    { name: "Hydro", value: 9, color: "#1E9DE2" }
  ];
  
  const costData = [
    { name: "Overnight", value: 37, color: "#1E3A29", cost: "£197.45", rate: "16.5p/kWh", kwh: "7244.11" },
    { name: "Day", value: 33, color: "#F6C165", cost: "£1050.87", rate: "18.2p/kWh", kwh: "5758.22" },
    { name: "Evening", value: 30, color: "#D86644", cost: "£974.73", rate: "28.0p/kWh", kwh: "3476.23" },
    { name: "Hydro", value: 9, color: "#1E9DE2", cost: "£88.19", rate: "14.21p/kWh", kwh: "620.75" }
  ];
  
  const totalElectricity = "17099.30 kW hours";
  const totalCost = "£3311.25";
  const totalSavings = "£471.12";
  const averagePrice = "19.4 p/kWh";
  
  const renderStars = () => {
    const stars = [];
    const filledStars = Math.round(score / 20);
    
    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(
          <svg key={i} className="h-10 w-10 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="h-10 w-10 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        );
      }
    }
    
    return stars;
  };
  
  const renderBarChart = (data: any[]) => {
    return (
      <div className="w-full h-8 flex">
        {data.map((item) => (
          <div 
            key={item.name}
            className="h-full" 
            style={{ 
              backgroundColor: item.color,
              width: `${item.value}%`
            }}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="container mx-auto max-w-5xl py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Score and Club Savings</h1>
        <div className="w-36">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="two-weeks">Two weeks</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card className="mb-8 bg-amber-400 border-0 rounded-b-3xl text-white overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <p className="text-lg mb-2">In the last two weeks, it was scored:</p>
            <h2 className="text-5xl font-bold">{score}/100</h2>
          </div>
          
          <div className="flex justify-center mb-8">
            {renderStars()}
          </div>
          
          <div className="text-center mb-8">
            <p className="text-lg mb-2">
              We can do more to use electricity from the hydro and at cheaper times. Can we shift our usage from peak times
            </p>
            <p className="text-lg font-semibold mb-8">Together, you have saved</p>
            
            <div className="relative mx-auto w-40 h-40 rounded-full bg-amber-300 flex items-center justify-center mb-4">
              <span className="text-4xl font-bold">{savedAmount}</span>
            </div>
            
            <p className="text-lg">in the local area by using local hydro power!</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between bg-orange-500 text-white">
          <CardTitle>Club Analysis</CardTitle>
          <div className="w-36">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="border-white text-white">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="two-weeks">Two weeks</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="quarter">Quarter</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-orange-500">ELECTRICITY</h3>
              <p className="text-xl">{totalElectricity}</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-orange-500">COST</h3>
              <p className="text-xl">{totalCost}</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-orange-500">SAVINGS</h3>
              <p className="text-xl">{totalSavings}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={electricityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={1}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {electricityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {renderBarChart(electricityData)}
            </div>
            
            <div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={costData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={1}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {costData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {renderBarChart(costData)}
            </div>
            
            <div>
              <div className="space-y-4">
                {costData.map((item) => (
                  <div key={item.name} className="flex items-start gap-2">
                    <div className="w-5 h-5 mt-1 rounded-sm" style={{ backgroundColor: item.color }}></div>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm">{item.kwh} kWh @{item.rate}</p>
                      <p className="text-sm">Costing {item.cost}</p>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <p className="font-semibold">Average price:</p>
                  <p>{averagePrice}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScorePage;
