
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const clubs = [
  {
    id: "northoxfordshire",
    name: "North Oxfordshire",
    description: "Community energy club in North Oxfordshire",
    members: 248,
    image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "bethesda",
    name: "Bethesda",
    description: "Community energy club in Bethesda",
    members: 176,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "crickhowell",
    name: "Crickhowell",
    description: "Community energy club in Crickhowell",
    members: 124,
    image: "https://images.unsplash.com/photo-1604009506606-fd4989d50e0d?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "bridport",
    name: "Bridport",
    description: "Community energy club in Bridport",
    members: 203,
    image: "https://images.unsplash.com/photo-1534705867302-2a41394d2a3b?q=80&w=300&auto=format&fit=crop"
  }
];

const ClubsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectClub = (clubId: string) => {
    navigate(`/dashboard?club=${clubId}`);
  };

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Select Your Energy Unit</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Join your local energy community to save money and reduce your carbon footprint
        </p>
      </div>

      <div className="relative mb-8 max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search for your club..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <Card key={club.id} className="overflow-hidden transition-all hover:shadow-md hover:scale-[1.01]">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={club.image} 
                alt={club.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{club.name}</CardTitle>
              <CardDescription>{club.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{club.members} community members</p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleSelectClub(club.id)}
              >
                Select This Club
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">Can't find your community energy club?</p>
        <Button variant="outline">Request to Join a New Club</Button>
      </div>
    </div>
  );
};

export default ClubsPage;
