import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Recycle, Leaf, Globe, Users, ArrowRight, Calculator, Droplets, Zap, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";

const Impact = () => {
  const [mealsPerDay, setMealsPerDay] = useState<number | ''>(1000);
  const [daysPerMonth, setDaysPerMonth] = useState<number | ''>(26);
  const [cutleryPerMeal, setCutleryPerMeal] = useState<number | ''>(2);
  const [replacedMaterial, setReplacedMaterial] = useState("pp");
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  // Material data from comparison table
  const materialData = {
    pp: { name: "Polypropylene (PP)", energy: 0.208, water: 0.431, co2: 0.0168 },
    ps: { name: "Polystyrene (PS)", energy: 0.251, water: 1.728, co2: 0.0253 },
    wood: { name: "Wood", energy: 0.095, water: 0.153, co2: 0.0200 },
    pla: { name: "Bio-Plastic (PLA)", energy: 0.119, water: 0.697, co2: 0.0638 }
  };

  const snackleryData = { energy: 0.046, water: 0.120, co2: 0.0127 };

  const monthlyImpact = useMemo(() => {
    // Return zero values if any required field is empty
    if (!mealsPerDay || !daysPerMonth || !cutleryPerMeal || !replacedMaterial) {
      return {
        plastic: 0,
        energy: 0,
        water: 0,
        co2: 0
      };
    }

    const meals = Math.max(0, Number(mealsPerDay) || 0);
    const days = Math.max(0, Math.min(31, Number(daysPerMonth) || 0));
    const cutlery = Math.max(0, Number(cutleryPerMeal) || 0);
    
    // Return zero if any value is 0 after parsing
    if (meals === 0 || days === 0 || cutlery === 0) {
      return {
        plastic: 0,
        energy: 0,
        water: 0,
        co2: 0
      };
    }

    const totalCutlery = meals * days * cutlery;
    const material = materialData[replacedMaterial as keyof typeof materialData];
    
    // Additional safety check for material data
    if (!material) {
      return {
        plastic: 0,
        energy: 0,
        water: 0,
        co2: 0
      };
    }
    
    return {
      plastic: totalCutlery,
      energy: totalCutlery * (material.energy - snackleryData.energy),
      water: totalCutlery * (material.water - snackleryData.water),
      co2: totalCutlery * (material.co2 - snackleryData.co2)
    };
  }, [mealsPerDay, daysPerMonth, cutleryPerMeal, replacedMaterial]);

  const annualImpact = useMemo(() => ({
    plastic: monthlyImpact.plastic * 12,
    energy: monthlyImpact.energy * 12,
    water: monthlyImpact.water * 12,
    co2: monthlyImpact.co2 * 12
  }), [monthlyImpact]);

  // Helper function to get material name safely
  const getMaterialName = (materialKey: string) => {
    const material = materialData[materialKey as keyof typeof materialData];
    return material ? material.name : 'Select material';
  };

  const sdgGoals = [
    { 
      number: 3, 
      title: "Good Health & Well-Being", 
      description: "Offering safe, edible alternatives that reduce exposure to microplastics." 
    },
    { 
      number: 6, 
      title: "Clean Water & Sanitation", 
      description: "Preventing plastic and wooden cutlery waste from polluting rivers and oceans." 
    },
    { 
      number: 12, 
      title: "Responsible Consumption & Production", 
      description: "Encouraging sustainable dining practices with zero-waste products." 
    },
    { 
      number: 14, 
      title: "Life Below Water", 
      description: "Reducing single-use plastic waste that harms marine ecosystems." 
    },
    { 
      number: 15, 
      title: "Life on Land", 
      description: "Protecting soil and biodiversity by offering 100% biodegradable solutions." 
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 gradient-earth">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-foreground mb-6 tracking-tight">
            Our <span className="text-primary">Growing Impact</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Real change starts small — and grows with every spoon, straw, and stirrer we replace.
          </p>
        </div>
      </section>

      {/* Our Progress Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4 tracking-tight">
              Our Progress So Far
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Recycle, label: "Plastic cutlery pieces prevented from entering landfills", value: "1,00,000+", color: "text-primary" },
              { icon: Globe, label: "CO₂ emissions reduced (based on lifecycle data vs. plastic)", value: "4000+ kg", color: "text-secondary" },
              { icon: Users, label: "Consumers experienced Snacklery products through trials & pilots", value: "20000+", color: "text-accent" },
              { icon: Leaf, label: "Institutional partners onboarded (caterers, cafés, and events)", value: "10+", color: "text-primary" }
            ].map((stat, index) => (
              <Card key={index} className="text-center group hover:shadow-green transition-smooth animate-fade-in-up border-0 shadow-soft bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 gradient-sustainable rounded-full mb-6 group-hover:scale-110 transition-bounce`}>
                    <stat.icon className="h-8 w-8 text-foreground" />
                  </div>
                  <div className={`text-3xl font-bold mb-4 ${stat.color}`}>{stat.value}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Calculator */}
      <section className="py-20 gradient-earth">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4 tracking-tight">
              See Your Impact in Real-Time 🌍
            </h2>
            <p className="text-xl text-muted-foreground">
              Enter how many meals you serve per day and discover the positive change you can create by switching to Snacklery.
            </p>
          </div>

          <Card className="animate-fade-in-up border-0 shadow-earth bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif font-medium text-foreground flex items-center justify-center gap-3">
                <Calculator className="h-8 w-8 text-primary" />
                Snacklery Impact Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Calculator Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="meals" className="text-sm font-medium">Meals per day</Label>
                  <Input
                    id="meals"
                    type="number"
                    min="1"
                    value={mealsPerDay}
                    onChange={(e) => setMealsPerDay(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Enter meals per day"
                    className="text-center text-lg font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days" className="text-sm font-medium">Days per month</Label>
                  <Input
                    id="days"
                    type="number"
                    min="1"
                    max="31"
                    value={daysPerMonth}
                    onChange={(e) => setDaysPerMonth(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Enter days per month"
                    className="text-center text-lg font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cutlery" className="text-sm font-medium">Cutlery per meal</Label>
                  <Input
                    id="cutlery"
                    type="number"
                    min="1"
                    value={cutleryPerMeal}
                    onChange={(e) => setCutleryPerMeal(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Enter cutlery per meal"
                    className="text-center text-lg font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material" className="text-sm font-medium">Replacing material</Label>
                  <Select value={replacedMaterial} onValueChange={setReplacedMaterial}>
                    <SelectTrigger className="text-center">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pp">Polypropylene (PP)</SelectItem>
                      <SelectItem value="ps">Polystyrene (PS)</SelectItem>
                      <SelectItem value="wood">Wood</SelectItem>
                      <SelectItem value="pla">Bio-Plastic (PLA)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results Display */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t">
                <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    📊 Monthly Impact
                    <span className="text-sm text-muted-foreground font-normal">
                      vs {getMaterialName(replacedMaterial)}
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Recycle className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Cutlery</span>
                      </div>
                      <div className="text-2xl font-bold text-primary">{monthlyImpact.plastic.toLocaleString()}</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Zap className="h-4 w-4 text-accent" />
                        <span className="text-sm text-muted-foreground">Energy</span>
                      </div>
                      <div className="text-xl font-bold text-accent">{monthlyImpact.energy.toFixed(1)} kWh</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Droplets className="h-4 w-4 text-secondary" />
                        <span className="text-sm text-muted-foreground">Water</span>
                      </div>
                      <div className="text-xl font-bold text-secondary">{monthlyImpact.water.toFixed(1)} L</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Globe className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-muted-foreground">CO₂</span>
                      </div>
                      <div className="text-xl font-bold text-destructive">{monthlyImpact.co2.toFixed(2)} kg</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl border border-secondary/20">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    📈 Annual Impact
                    <span className="text-sm text-muted-foreground font-normal">12 months projection</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Recycle className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Cutlery</span>
                      </div>
                      <div className="text-2xl font-bold text-primary">{annualImpact.plastic.toLocaleString()}</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Zap className="h-4 w-4 text-accent" />
                        <span className="text-sm text-muted-foreground">Energy</span>
                      </div>
                      <div className="text-xl font-bold text-accent">{annualImpact.energy.toFixed(0)} kWh</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Droplets className="h-4 w-4 text-secondary" />
                        <span className="text-sm text-muted-foreground">Water</span>
                      </div>
                      <div className="text-xl font-bold text-secondary">{annualImpact.water.toFixed(0)} L</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-xl">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Globe className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-muted-foreground">CO₂</span>
                      </div>
                      <div className="text-xl font-bold text-destructive">{annualImpact.co2.toFixed(1)} kg</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  💡 <strong>Whether you're a café, corporate, or caterer</strong> — your switch to Snacklery creates a ripple effect of positive impact.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="xl" className="px-10 py-4" asChild>
                    <Link to="/business">Partner With Us</Link>
                  </Button>
                  <Button variant="outline" size="xl" className="px-10 py-4 border-2" asChild>
                    <Link to="/products">Get Snacklery Today</Link>
                  </Button>
                </div>
                
                {/* Subtle Calculator Disclaimers - positioned at bottom */}
                <div className="mt-8 pt-4 border-t border-muted/30 space-y-2">
                  <p className="text-xs text-muted-foreground/60">
                    *Estimates are indicative only and not suitable for certification or regulated reporting.
                  </p>
                  
                  <div className="flex justify-center">
                    <Collapsible open={isDisclaimerOpen} onOpenChange={setIsDisclaimerOpen}>
                      <CollapsibleTrigger className="text-xs text-muted-foreground/50 hover:text-muted-foreground/70">
                        Data sources
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2">
                        <div className="bg-muted/10 rounded p-2 text-xs text-muted-foreground/60 leading-relaxed max-w-2xl text-left">
                          Data from PlasticsEurope Eco-profiles, NatureWorks Ingeo PLA eco-profiles, EXIBA/PlasticsEurope polystyrene eco-profiles, Aspenware wooden cutlery ISO LCA, UNEP 2021 meta-analysis, and FRENVI EATlery website. Synthesized by Perplexity AI (Sep 2025). Indicative use only.
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Environmental Comparison */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4 tracking-tight">
              Environmental Impact Comparison
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how Snacklery's edible cutlery outperforms traditional materials in energy, water, and carbon footprint.
            </p>
          </div>

          <Card className="animate-fade-in-up border-0 shadow-earth bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left font-semibold text-foreground">Material</TableHead>
                      <TableHead className="text-center font-semibold text-foreground">Energy (kWh/spoon)</TableHead>
                      <TableHead className="text-center font-semibold text-foreground">Water (L/spoon)</TableHead>
                      <TableHead className="text-center font-semibold text-foreground">CO₂ (kg/spoon)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Polypropylene (PP)</TableCell>
                      <TableCell className="text-center">0.208</TableCell>
                      <TableCell className="text-center">0.431</TableCell>
                      <TableCell className="text-center">0.0168</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Polystyrene (PS)</TableCell>
                      <TableCell className="text-center">0.251</TableCell>
                      <TableCell className="text-center">1.728</TableCell>
                      <TableCell className="text-center">0.0253</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Wood</TableCell>
                      <TableCell className="text-center">0.095</TableCell>
                      <TableCell className="text-center">0.153</TableCell>
                      <TableCell className="text-center">0.0200</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bio-Plastic (PLA)</TableCell>
                      <TableCell className="text-center">0.119</TableCell>
                      <TableCell className="text-center">0.697</TableCell>
                      <TableCell className="text-center">0.0638</TableCell>
                    </TableRow>
                    <TableRow className="bg-primary/5 hover:bg-primary/10">
                      <TableCell className="font-bold text-primary">Snacklery (edible)</TableCell>
                      <TableCell className="text-center font-bold text-primary">0.046</TableCell>
                      <TableCell className="text-center font-bold text-primary">0.120</TableCell>
                      <TableCell className="text-center font-bold text-primary">0.0127</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-8 p-6 bg-primary/5 rounded-2xl">
                <h3 className="text-xl font-semibold text-foreground mb-4 text-center">🌱 Why Snacklery Leads</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">4.5x</div>
                    <p className="text-muted-foreground text-sm">less energy than plastics</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary mb-2">6x</div>
                    <p className="text-muted-foreground text-sm">less water than bio-plastics</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-2">Lowest</div>
                    <p className="text-muted-foreground text-sm">CO₂ emissions among alternatives</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SDG Goals */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4 tracking-tight">
              Supporting UN Sustainable Development Goals
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Snacklery directly contributes to key UN SDGs, aligning businesses with global sustainability commitments:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdgGoals.map((goal, index) => (
              <Card key={index} className="group hover:shadow-green transition-smooth animate-fade-in-up">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                      {goal.number}
                    </div>
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{goal.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 tracking-tight">
            Join the Sustainability Revolution
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Every choice matters. Every meal counts. Together, we can create a world without plastic waste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-10 py-4 border-2">
              <Link to="/products">Start Your Impact</Link>
            </Button>
            <Button variant="outline" size="xl" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-10 py-4">
              <Link to="/business">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;