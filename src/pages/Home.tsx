import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Leaf, Utensils, Recycle, Globe, Award, Trophy, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import productsImage from "@/assets/soup-with-edible-spoons.jpg";
import LogoCarousel from "@/components/LogoCarousel";

interface HomeProps {
  onContactClick?: () => void;
}

const Home = ({ onContactClick }: HomeProps) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 gradient-earth overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-foreground mb-8 leading-[1.1] tracking-tight">
                <span className="text-foreground">🌍 "What if your cutlery could also be your meal?"</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed font-light max-w-xl">
                Snacklery makes edible spoons, stirrers, and straws that dissolve into coffee, soups, or mocktails—and can be eaten afterward.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button variant="hero" size="xl" className="px-10 py-4" asChild>
                  <Link to="/products">
                    Try Snacklery <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" className="px-10 py-4 border-2" asChild>
                  <Link to="/business">Partner With Us</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 gradient-hero rounded-3xl opacity-20 blur-3xl"></div>
              <div className="relative z-10 grid grid-cols-2 gap-6 rounded-3xl overflow-visible shadow-green">
                <div className="space-y-6">
                  <img 
                    src="/lovable-uploads/9006b285-dd78-4414-8339-2d321841ef37.png" 
                    alt="Young girl with thumbs up enjoying smoothie with edible straw" 
                    className="w-full h-64 object-contain bg-gradient-to-br from-muted/20 to-muted/40 rounded-2xl animate-float shadow-lg backdrop-blur-sm"
                  />
                  <img 
                    src="/lovable-uploads/10c5d88e-1b4c-4fb9-b5c4-8179a2053e45.png" 
                    alt="Woman eating with edible spoon" 
                    className="w-full h-64 object-contain bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl animate-float delay-100 shadow-lg backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-6">
                  <img 
                    src="/lovable-uploads/afaecac5-8bb7-4005-80d3-52fe1d66914e.png" 
                    alt="Businessman drinking coffee with edible stirrer" 
                    className="w-full h-64 object-contain bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-2xl animate-float delay-200 shadow-lg backdrop-blur-sm"
                  />
                  <img 
                    src="/lovable-uploads/ec625d05-7d6b-454f-998d-a76fdcd7db37.png" 
                    alt="School child eating with edible spoon" 
                    className="w-full h-64 object-contain bg-gradient-to-br from-accent/10 to-accent/20 rounded-2xl animate-float delay-300 shadow-lg backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Snacklery Section */}
      <section className="py-24 bg-gradient-to-br from-muted/40 to-muted/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-foreground mb-12 tracking-tight">
              Why Snacklery?
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              <div className="group p-8 bg-card/80 backdrop-blur-sm rounded-3xl shadow-elegant hover:shadow-green transition-smooth border border-muted">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-smooth">🌍</div>
                <div className="text-2xl font-bold text-destructive mb-4">500B+</div>
                <p className="text-lg font-semibold text-muted-foreground leading-relaxed">
                  Single-use utensils pollute our planet every year
                </p>
              </div>
              
              <div className="group p-8 bg-card/80 backdrop-blur-sm rounded-3xl shadow-elegant hover:shadow-green transition-smooth border border-muted">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-smooth">🌳</div>
                <div className="text-2xl font-bold text-secondary mb-4">Not Enough</div>
                <p className="text-lg font-semibold text-muted-foreground leading-relaxed">
                  Wooden alternatives still have high water & energy footprints
                </p>
              </div>
              
              <div className="group p-8 bg-card/80 backdrop-blur-sm rounded-3xl shadow-elegant hover:shadow-green transition-smooth border border-muted">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-smooth">✨</div>
                <div className="text-2xl font-bold text-primary mb-4">The Solution</div>
                <p className="text-lg font-semibold text-muted-foreground leading-relaxed">
                  Edible, functional cutlery that tastes great too
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 gradient-hero rounded-3xl opacity-10 blur-2xl"></div>
              <div className="relative bg-primary/10 backdrop-blur-sm rounded-3xl p-12 border border-primary/20">
                <p className="text-3xl md:text-4xl font-serif font-medium text-primary leading-relaxed">
                  "You don't just throw it away—you <span className="text-secondary">enjoy</span> it."
                </p>
                <div className="flex items-center justify-center gap-6 mt-8">
                  <Leaf className="h-8 w-8 text-primary animate-bounce" />
                  <Utensils className="h-8 w-8 text-secondary animate-bounce delay-100" />
                  <Recycle className="h-8 w-8 text-primary animate-bounce delay-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted & Recognized Section */}
      <section className="py-16 bg-background border-b border-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4 tracking-tight">
              Industry Recognition & Awards
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recognized by leading innovation ecosystems and sustainability organizations through prestigious competitions and strategic partnerships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="group text-center animate-fade-in-up border-0 shadow-soft bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <Trophy className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">🥇 Competition Winner</h3>
                <p className="text-muted-foreground">COWE 2024</p>
              </CardContent>
            </Card>
            
            <Card className="group text-center animate-fade-in-up border-0 shadow-soft bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">🥇 Best Startup Award</h3>
                <p className="text-muted-foreground">Pitch Battle by Badruka College of Commerce and Arts</p>
              </CardContent>
            </Card>
            
            <Card className="group text-center animate-fade-in-up border-0 shadow-soft bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <Award className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">🥈 Innovation Runner-up</h3>
                <p className="text-muted-foreground">Startupedia 2024<br/>IPE, Hyderabad</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Strategic Partnerships Section */}
          <div className="pt-8 border-t border-muted">
            <h3 className="text-xl font-semibold text-foreground text-center mb-8">Incubated & Supported By</h3>
            <LogoCarousel />
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-6 tracking-tight">
              Who It's For
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Snacklery serves diverse markets with sustainable, edible cutlery solutions tailored to specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "✈",
                title: "Mass Service Providers",
                description: "Airlines, Railways & Hospitals – delivering zero-waste solutions for millions of meals served daily."
              },
              {
                icon: "🏢",
                title: "Corporate Leaders", 
                description: "Corporate Catering & CSR-driven firms – aligning with SDGs & Net Zero goals."
              },
              {
                icon: "🌱",
                title: "Conscious Consumers",
                description: "Eco-conscious individuals – making sustainable dining simple, tasty, and guilt-free."
              },
              {
                icon: "🥾",
                title: "Travelers & Hikers",
                description: "Portable, lightweight, and waste-free dining – perfect for outdoor adventures and on-the-go meals."
              }
            ].map((segment, index) => (
              <Card key={index} className="group hover:shadow-green transition-smooth cursor-pointer animate-fade-in-up border-0 shadow-soft bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-bounce">
                    {segment.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 font-serif">{segment.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{segment.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12 animate-fade-in-up">
            <Button variant="hero" size="xl" className="px-10 py-4" asChild>
              <Link to="/business">
                Partner with Us <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24 gradient-earth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 gradient-hero rounded-3xl opacity-10 blur-2xl transform rotate-3"></div>
              <img 
                src={productsImage} 
                alt="Snacklery product range" 
                className="relative z-10 w-full h-auto rounded-3xl shadow-earth leaf-wave"
              />
            </div>
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-8 tracking-tight">
                Product Portfolio
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Comprehensive edible cutlery solutions engineered for diverse food service applications and consumer markets.
              </p>
              <ul className="space-y-5 mb-10">
                {[
                  "Edible Utility Spoons – Multi-purpose cutlery for food service operations",
                  "Soup-infused Stirrers – Instant soup delivery system with edible vessel",
                  "Beverage Dissolution Sticks – Coffee/tea preparation with consumable stirrer",
                  "Flavored Beverage Straws – Enhanced drinking experience with edible components"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-muted-foreground text-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="xl" className="px-10 py-4" asChild>
                <Link to="/products">
                  View All Products <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Environmental Impact Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-8 tracking-tight">
              Lifecycle Impact Analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Comprehensive environmental assessment demonstrates significant resource efficiency gains over conventional alternatives. 
              Our technology delivers measurable reductions across key sustainability metrics:
            </p>
          </div>

          {/* Impact Table */}
          <div className="overflow-x-auto mb-12 animate-fade-in-up">
            <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Material (per 1,000 kg)</th>
                    <th className="px-6 py-4 text-center font-semibold">Energy Consumption</th>
                    <th className="px-6 py-4 text-center font-semibold">Water Consumption</th>
                    <th className="px-6 py-4 text-center font-semibold">CO₂ Emissions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted">
                  <tr>
                    <td className="px-6 py-4 font-medium">Plastic (PP)</td>
                    <td className="px-6 py-4 text-center">20,760 kWh</td>
                    <td className="px-6 py-4 text-center">43,079 L</td>
                    <td className="px-6 py-4 text-center">1,680 kg</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Plastic (PS)</td>
                    <td className="px-6 py-4 text-center">50,520 kWh</td>
                    <td className="px-6 py-4 text-center">172,780 L</td>
                    <td className="px-6 py-4 text-center">2,530 kg</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Wood</td>
                    <td className="px-6 py-4 text-center">9,520 kWh</td>
                    <td className="px-6 py-4 text-center">22,100 L</td>
                    <td className="px-6 py-4 text-center">2,000 kg</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Bio-Plastic (PLA)</td>
                    <td className="px-6 py-4 text-center">11,930 kWh</td>
                    <td className="px-6 py-4 text-center">69,730 L</td>
                    <td className="px-6 py-4 text-center">6,380 kg</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="px-6 py-4 font-bold text-primary">Snacklery Edible Cutlery</td>
                    <td className="px-6 py-4 text-center font-bold text-primary">4,600 kWh</td>
                    <td className="px-6 py-4 text-center font-bold text-primary">12,000 L</td>
                    <td className="px-6 py-4 text-center font-bold text-primary">1,270 kg</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground/60 italic text-center mt-2">
              *Impact figures are estimates from third-party lifecycle data for informational purposes only.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
            <div className="text-center p-6 bg-card rounded-2xl shadow-soft">
              <div className="text-3xl font-bold text-primary mb-2">4.5x</div>
              <div className="text-muted-foreground">less energy than plastics</div>
            </div>
            <div className="text-center p-6 bg-card rounded-2xl shadow-soft">
              <div className="text-3xl font-bold text-primary mb-2">6x</div>
              <div className="text-muted-foreground">less water than bio-plastics</div>
            </div>
            <div className="text-center p-6 bg-card rounded-2xl shadow-soft">
              <div className="text-3xl font-bold text-primary mb-2">Lowest</div>
              <div className="text-muted-foreground">CO₂ emissions among alternatives</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-8 tracking-tight">
            Scale Your Sustainability Impact
          </h2>
          <p className="text-xl mb-12 opacity-90 leading-relaxed max-w-3xl mx-auto">
            Partner with industry leaders adopting next-generation food technology solutions. 
            Drive measurable environmental impact while enhancing operational efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="outline" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-10 py-4 border-2">
              <Link to="/business">Partner With Us</Link>
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-10 py-4"
              onClick={onContactClick}
            >
              Request Samples
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;