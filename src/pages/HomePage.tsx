
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, BarChart3, Zap } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-10 md:pt-16 pb-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4 animate-fade-in">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                North Oxfordshire
              </div>
              <h1 className="text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
                Track your energy use and <span className="text-primary">save money</span>
              </h1>
              <p className="text-muted-foreground md:text-xl">
                EnergyLocal helps you understand when energy is cheapest, greenest, and most local so you can save money and reduce your carbon footprint.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link to="/dashboard">
                    View Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-6">
                  <Link to="/forecast">Energy Forecast</Link>
                </Button>
              </div>
            </div>
            <div className="relative lg:ml-auto animate-fade-in animate-delay-300">
              <div className="glass-card p-6 md:p-8 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1470&auto=format&fit=crop"
                  alt="Energy dashboard visualization"
                  className="w-full h-auto rounded-lg object-cover shadow-md transition-transform hover:scale-[1.02]"
                />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-3 mb-12 md:mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl">
              Smart energy features
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Everything you need to understand and optimize your energy usage
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="glass-card p-6 animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="glass-card p-8 md:p-12">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                  Ready to optimize your energy usage?
                </h2>
                <p className="text-muted-foreground">
                  Get started with EnergyLocal today and join thousands of households saving money and reducing their carbon footprint.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button asChild size="lg" className="rounded-full px-6">
                    <Link to="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="lg:ml-auto">
                <img
                  src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=1470&auto=format&fit=crop"
                  alt="Solar panels on a house roof"
                  className="w-full h-auto rounded-lg object-cover shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    title: "Real-time Monitoring",
    description: "Track your energy consumption in real-time with intuitive and beautiful visualizations.",
    icon: BarChart3
  },
  {
    title: "Price Forecasting",
    description: "See when energy will be cheapest so you can plan your usage for maximum savings.",
    icon: Clock
  },
  {
    title: "Energy Efficiency",
    description: "Get personalized recommendations to improve your energy efficiency and reduce waste.",
    icon: Zap
  }
];

export default HomePage;
