import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Truck, HeadphonesIcon, TrendingUp, Award, Plane, MapPin, PartyPopper } from "lucide-react";
import { Link } from "react-router-dom";
import WhatsAppButton from "@/components/WhatsAppButton";

interface BusinessProps {
  onContactClick?: () => void;
}

const Business = ({ onContactClick }: BusinessProps) => {
  const benefits = [
    {
      icon: Building,
      title: "ESG Compliance",
      description: "Meet environmental, social, and governance objectives with measurable sustainability metrics and reporting."
    },
    {
      icon: Users,
      title: "Enhanced Customer Engagement",
      description: "Deliver differentiated dining experiences that drive brand loyalty and social media amplification."
    },
    {
      icon: TrendingUp,
      title: "Operational Efficiency",
      description: "Competitive unit economics with integrated sustainability benefits and supply chain optimization."
    },
    {
      icon: Award,
      title: "Market Leadership",
      description: "Position as industry innovator in sustainable food technology and circular economy practices."
    }
  ];

  const solutions = [
    {
      icon: Plane,
      title: "Transportation & Healthcare Food Service",
      description: "High-volume applications with stringent safety and logistics requirements. Zero-waste compliance for regulated environments."
    },
    {
      icon: MapPin,
      title: "Corporate & Institutional Catering",
      description: "Large-scale deployment supporting organizational sustainability initiatives and carbon footprint reduction targets."
    },
    {
      icon: PartyPopper,
      title: "Hospitality & Event Management",
      description: "Premium service applications emphasizing brand differentiation and memorable customer experiences."
    }
  ];

  const products = [
    {
      name: "Edible Spoon",
      icon: "🥄",
      price: "₹4 per unit"
    },
    {
      name: "Soup-o-Spoon",
      icon: "🍲",
      price: "₹8 per unit"
    },
    {
      name: "Coffee Stick",
      icon: "☕",
      price: "₹5 per unit"
    },
    {
      name: "Mocktail Straw",
      icon: "🥤",
      price: "₹30 per unit"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Consultation",
      description: "We assess your needs and recommend the right product mix.",
      icon: HeadphonesIcon
    },
    {
      step: "2",
      title: "Samples & Trials",
      description: "Test Snacklery products with your customers.",
      icon: Users
    },
    {
      step: "3",
      title: "Bulk Supply",
      description: "Get products delivered to your location with reliable logistics.",
      icon: Truck
    },
    {
      step: "4",
      title: "Ongoing Support",
      description: "Marketing, sustainability reporting, and partnership support.",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 gradient-earth">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-foreground mb-6 tracking-tight">
            Enterprise <span className="text-primary">Solutions</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Comprehensive edible cutlery systems for commercial food service operations. 
            Drive sustainability goals while maintaining operational excellence and customer satisfaction.
          </p>
          <WhatsAppButton 
            message="Hi! I'm interested in scheduling a demo for Snacklery's enterprise solutions for my business. Can we arrange a meeting?"
            variant="hero" 
            size="xl"
          >
            Schedule a Demo
          </WhatsAppButton>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4 tracking-tight">
              Strategic Business Advantages
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Proven value drivers across operational efficiency, brand differentiation, 
              and environmental compliance objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-green transition-smooth animate-fade-in-up">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-sustainable rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-bounce">
                      <benefit.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Solutions Section */}
      <section className="py-20 gradient-earth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Business Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Snacklery offers flexible supply models to suit businesses of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="group hover:shadow-green transition-smooth animate-fade-in-up">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 gradient-sustainable rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-bounce">
                    <solution.icon className="h-8 w-8 text-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{solution.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Process Section */}
      <section className="py-20 gradient-earth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <Card key={index} className="text-center group hover:shadow-green transition-smooth animate-fade-in-up">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 gradient-sustainable rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-bounce">
                      <step.icon className="h-8 w-8 text-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <Button 
            variant="outline" 
            size="xl" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            onClick={onContactClick}
          >
            Partner With Us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Business;