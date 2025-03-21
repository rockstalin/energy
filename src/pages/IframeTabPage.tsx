
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const externalPages = [
  {
    id: "da8aba12_6_4_8_",
    name: "Dashboard 1",
    url: "http://cloud.pumg.com.cn:9000/kanbanPage/da8aba12_6_4_8_"
  },
  {
    id: "c84543a3_e_4_8_",
    name: "Dashboard 2",
    url: "http://cloud.pumg.com.cn:9000/kanbanPage/c84543a3_e_4_8_"
  },
  {
    id: "71682bc3_c_4_8_",
    name: "Dashboard 3",
    url: "http://cloud.pumg.com.cn:9000/kanbanPage/71682bc3_c_4_8_"
  },
  {
    id: "9a661bd9_3_4_8_",
    name: "Dashboard 4",
    url: "http://cloud.pumg.com.cn:9000/kanbanPage/9a661bd9_3_4_8_"
  }
];

interface IframeLoaderProps {
  url: string;
}

const IframeLoader = ({ url }: IframeLoaderProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-[calc(100vh-12rem)]">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <iframe
        src={url}
        className="w-full h-full border-0"
        onLoad={() => setLoading(false)}
        title="External content"
      />
    </div>
  );
};

const IframeTabPage = () => {
  const [activeTab, setActiveTab] = useState(externalPages[0].id);

  useEffect(() => {
    // Get tab from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && externalPages.some(page => page.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Update URL with tab parameter without refreshing page
    const url = new URL(window.location.href);
    url.searchParams.set('tab', value);
    window.history.pushState({}, '', url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">External Dashboards</h1>
        <p className="text-muted-foreground">
          Access external dashboard systems from within this application.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full grid grid-cols-4">
          {externalPages.map((page) => (
            <TabsTrigger key={page.id} value={page.id} className="flex-1">
              {page.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {externalPages.map((page) => (
          <TabsContent key={page.id} value={page.id} className="mt-4">
            <IframeLoader url={page.url} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default IframeTabPage;
