
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Thermometer, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const WeatherMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    if (!mapRef.current) return;
    
    // Set up the map container with the dark blue background
    const mapContainer = document.createElement("div");
    mapContainer.className = "w-full h-full rounded-lg relative overflow-hidden bg-[#0a2947]";
    
    // Create canvas for drawing animated connections
    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 w-full h-full";
    canvas.width = mapRef.current.clientWidth || 600;
    canvas.height = mapRef.current.clientHeight || 350;
    
    // Append elements to the container
    mapContainer.appendChild(canvas);
    
    // Clear previous content and append new map
    mapRef.current.innerHTML = "";
    mapRef.current.appendChild(mapContainer);
    
    // Define city locations
    const cities = [
      { x: 265, y: 270, name: "Jinan" }, // Central/highlighted city
      { x: 100, y: 170, name: "Beijing" },
      { x: 475, y: 200, name: "Shanghai" },
      { x: 120, y: 330, name: "Tianjin" },
      { x: 360, y: 150, name: "Xian" },
      { x: 240, y: 370, name: "Urumqi" },
      { x: 410, y: 280, name: "Wuhan" },
      { x: 80, y: 240, name: "Chengdu" },
      { x: 515, y: 385, name: "Guangzhou" },
    ];
    
    // Define connections between cities
    const connections = [
      { from: 0, to: 1 }, // Jinan to Beijing
      { from: 0, to: 2 }, // Jinan to Shanghai
      { from: 0, to: 3 }, // Jinan to Tianjin
      { from: 0, to: 4 }, // Jinan to Xian
      { from: 0, to: 5 }, // Jinan to Urumqi
      { from: 0, to: 6 }, // Jinan to Wuhan
      { from: 0, to: 7 }, // Jinan to Chengdu
      { from: 0, to: 8 }, // Jinan to Guangzhou
    ];
    
    // Animation function to draw the connections
    let animationProgress = 0;
    
    const drawConnections = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set the transform based on zoom level
      ctx.save();
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      ctx.translate(centerX, centerY);
      ctx.scale(zoomLevel, zoomLevel);
      ctx.translate(-centerX, -centerY);
      
      // Scale coordinates based on actual canvas size
      const scaleX = canvas.width / 600;
      const scaleY = canvas.height / 500;
      
      // Draw connections between cities
      connections.forEach(connection => {
        const fromCity = cities[connection.from];
        const toCity = cities[connection.to];
        
        const fromX = fromCity.x * scaleX;
        const fromY = fromCity.y * scaleY;
        const toX = toCity.x * scaleX;
        const toY = toCity.y * scaleY;
        
        // Draw line path with a subtle glow effect
        ctx.beginPath();
        ctx.strokeStyle = "rgba(100, 210, 255, 0.2)";
        ctx.lineWidth = 1 / zoomLevel;
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        
        // Draw moving dots along the connection
        const dotPosition = (animationProgress * 0.01) % 1;
        const dotX = fromX + (toX - fromX) * dotPosition;
        const dotY = fromY + (toY - fromY) * dotPosition;
        
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 150, 0.9)";
        ctx.arc(dotX, dotY, 1.5 / zoomLevel, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw cities (points)
      cities.forEach((city, index) => {
        ctx.beginPath();
        
        // Main city (Jinan) gets a larger, glowing point
        if (index === 0) {
          ctx.fillStyle = "rgba(255, 255, 150, 0.9)";
          ctx.arc(city.x * scaleX, city.y * scaleY, 6 / zoomLevel, 0, Math.PI * 2);
          
          // Add glow effect
          ctx.shadowColor = "rgba(255, 255, 150, 0.6)";
          ctx.shadowBlur = 12 / zoomLevel;
          ctx.fill();
          ctx.shadowBlur = 0;
          
          // Add pulsing circle
          ctx.beginPath();
          ctx.strokeStyle = "rgba(255, 255, 150, 0.2)";
          ctx.lineWidth = 1.5 / zoomLevel;
          const pulseSize = (15 + Math.sin(animationProgress * 0.05) * 5) / zoomLevel;
          ctx.arc(city.x * scaleX, city.y * scaleY, pulseSize, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Regular cities
          ctx.fillStyle = "rgba(255, 255, 150, 0.7)";
          ctx.arc(city.x * scaleX, city.y * scaleY, 3 / zoomLevel, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      ctx.restore();
      animationProgress++;
      animationRef.current = requestAnimationFrame(drawConnections);
    };
    
    // Start animation
    drawConnections();
    
    // Cleanup function to stop animation
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mapRef.current) {
        mapRef.current.innerHTML = "";
      }
    };
  }, [zoomLevel]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleZoomChange = (value: number[]) => {
    setZoomLevel(value[0]);
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardHeader className="pb-2 bg-[#0a2947] text-cyan-100 border-b border-cyan-800/30">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium text-cyan-100">Location Overview</CardTitle>
          <Badge variant="outline" className="font-normal text-cyan-200 border-cyan-700 bg-[#0a2947]">
            Friday, March 21, 17:35:49
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2 text-cyan-200">
          <span className="bg-cyan-900/50 px-2 py-0.5 rounded">Jinan City</span>
          <span className="flex items-center gap-1 bg-cyan-900/50 px-2 py-0.5 rounded">
            <Thermometer className="h-3 w-3" />
            12℃~25℃
          </span>
          <span className="flex items-center gap-1 bg-cyan-900/50 px-2 py-0.5 rounded">
            <Sun className="h-3 w-3 text-yellow-400" />
            Sunny to sunny
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="relative">
            <div ref={mapRef} className="w-full h-[320px] bg-[#0a2947] flex items-center justify-center text-cyan-200">
              Loading map...
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-cyan-900/50 text-cyan-200 border-cyan-700/30 hover:bg-cyan-800/50"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-cyan-900/50 text-cyan-200 border-cyan-700/30 hover:bg-cyan-800/50"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 w-32">
              <Slider 
                min={0.5} 
                max={2.5} 
                step={0.1} 
                value={[zoomLevel]} 
                onValueChange={handleZoomChange}
                className="h-2"
              />
            </div>
          </div>
          <div className="flex justify-between items-center text-sm p-3 bg-[#0a2947] text-cyan-200">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span>Safe operation</span>
              <div className="flex space-x-1 ml-2">
                {[2, 5, 2, 4].map((num, index) => (
                  <span key={index} className="bg-cyan-900/50 font-medium w-6 h-6 flex items-center justify-center rounded">
                    {num}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Sun className="h-4 w-4 text-yellow-400" />
              <span>sky</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherMap;
