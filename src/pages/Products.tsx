import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

const Products = () => {
  const shapes = [
    {
      name: "Spork",
      image: "/images/products/Spork.png",
      tagline: "The all-rounder for meals on the go",
      useCases: ["Rice bowls", "Noodles", "Pasta", "Salads", "Snacks"]
    },
    {
      name: "Spoon",
      image: "/images/products/Spoon.png",
      tagline: "Perfect for sipping, scooping & savoring",
      useCases: ["Soups", "Yogurt", "Ice cream", "Puddings", "Breakfast cereals"]
    },
    {
      name: "Dessert Spoon",
      image: "/images/products/Dessert Spoon.png",
      tagline: "Made for sweet moments",
      useCases: ["Ice cream", "Cakes", "Brownies", "Mousses", "Traditional Indian sweets"]
    }
  ];

  const flavors = [
    {
      name: "Peri Peri",
      image: "/images/products/Peri Peri.png",
      description: "Bold, Zesty & Fiery"
    },
    {
      name: "Simply Classic",
      image: "/images/products/Simply Classic.png",
      description: "The authentic taste of golden wheat"
    },
    {
      name: "Chocolate",
      image: "/images/products/Chocolate.png",
      description: "Rich, Smooth & Indulgent"
    }
  ];

  const specialProducts = [
    {
      name: "Edible Stirrers",
      image: "/images/products/Stirrer.png",
      description: "Versatile edible stirrers available in all three flavors. Perfect for beverages and mixing.",
      features: ["All three flavor variants", "Optimal for hot and cold beverages", "Dissolves at perfect pace", "Multi-purpose functionality"]
    },
    {
      name: "Pixy",
      image: "/images/products/Pixy.png",
      description: "Our signature compact edible utensil. A unique innovation combining functionality with delightful taste experience.",
      features: ["Compact and portable design", "Available in all flavors", "Multi-functional usage", "Premium food-grade ingredients"]
    }
  ];

  const upcomingProducts = [
    {
      name: "Soup-o-Spoon",
      description: "An edible spoon coated with soup mix that dissolves in hot water to create an instant, delicious soup.",
      features: ["Creates soup in 15-20 seconds", "Withstands temperatures up to 90°C", "Dual purpose: utensil + meal"],
      image: "🍲"
    },
    {
      name: "Coffee Stirrer",
      description: "Edible stirrer infused with premium coffee compounds. Perfect for instant coffee preparation.",
      features: ["Premium coffee extract integration", "Dissolves at optimal temperature", "Multi-functional beverage enhancer"],
      image: "☕"
    },
    {
      name: "Mocktail Straw",
      description: "Flavorful edible straw that transforms regular drinks into exciting mocktails.",
      features: ["Multiple fruit flavors", "20-30 minute stability", "Perfect for events and parties"],
      image: "🥤"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 gradient-earth">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-foreground mb-6 tracking-tight">
            Product <span className="text-primary">Solutions</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-4">
            <strong>Edible cutlery that customers actually enjoy eating.</strong>
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Available in multiple shapes and flavors, designed for restaurants, caterers, hospitality brands, and conscious consumers.
          </p>
        </div>
      </section>

      {/* Shapes Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4 tracking-tight">
              Choose Your <span className="text-primary">Shape</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Every shape is designed for different meals and moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shapes.map((shape, index) => (
              <Card key={index} className="group hover:shadow-green transition-smooth animate-fade-in-up">
                <CardContent className="p-6 sm:p-8 space-y-6">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-lg overflow-hidden bg-white flex items-center justify-center flex-shrink-0 mx-auto">
                    <img 
                      src={shape.image} 
                      alt={shape.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2 text-center">{shape.name}</h3>
                    <p className="text-center text-muted-foreground italic">{shape.tagline}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-3">Perfect for:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {shape.useCases.map((useCase, idx) => (
                        <Badge key={idx} variant="secondary">{useCase}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Flavors Section */}
      <section className="py-20 gradient-earth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4 tracking-tight">
              Select Your <span className="text-primary">Flavor</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Each flavor is crafted to complement your culinary experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {flavors.map((flavor, index) => (
              <Card key={index} className="group hover:shadow-green transition-smooth animate-fade-in-up">
                <CardContent className="p-6 sm:p-8 space-y-6">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-lg overflow-hidden bg-white flex items-center justify-center flex-shrink-0 mx-auto">
                    <img 
                      src={flavor.image} 
                      alt={flavor.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2 text-center">{flavor.name}</h3>
                    <p className="text-center text-muted-foreground font-medium">{flavor.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expanding the Edible Experience Section */}
      <section className="py-20 gradient-earth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4 tracking-tight">
              Expanding the <span className="text-primary">Edible Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Building a complete ecosystem of sustainable edible alternatives for food and beverage service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialProducts.map((product, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-green transition-smooth animate-fade-in-up"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto mb-4 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">{product.name}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed text-center">{product.description}</p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-center">Available in:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {flavors.map((flavor, idx) => (
                        <Badge key={idx} variant="outline">{flavor.name}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-center text-sm font-semibold text-primary">
                      Available on Request for Large-Scale Orders
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 gradient-earth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4 tracking-tight">
              Why Choose Snacklery Products?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every product is crafted to deliver the perfect balance of functionality, taste, and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Premium Quality",
                description: "Made from safe, natural, and food-grade ingredients",
                icon: "⭐"
              },
              {
                title: "Durable",
                description: "Holds shape during meals and dissolves at the right pace",
                icon: "⏰"
              },
              {
                title: "Delicious",
                description: "Each product adds flavor while reducing waste",
                icon: "😋"
              },
              {
                title: "Eco-Friendly",
                description: "100% edible and biodegradable, leaving no trace behind",
                icon: "🌱"
              }
            ].map((benefit, index) => (
              <Card key={index} className="text-center group hover:shadow-green transition-smooth animate-fade-in-up">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4 animate-float">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Products Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4 tracking-tight">
              Coming Soon
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Exciting new products in development. Be the first to experience our latest innovations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingProducts.map((product, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-green transition-smooth animate-fade-in-up opacity-75"
              >
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4 animate-float">{product.image}</div>
                  <CardTitle className="text-2xl font-bold text-foreground">{product.name}</CardTitle>
                  <div className="text-sm text-primary font-semibold mt-2">Coming Soon</div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Key Features:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-muted-foreground">
                          <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full opacity-60 cursor-not-allowed"
                      disabled
                    >
                      Notify Me
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Food Service?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the edible cutlery revolution and help us create a more sustainable future, 
            one delicious bite at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton 
              message="Hi! I'm interested in shopping for Snacklery's edible cutlery products. Can you help me with the available options?"
              variant="outline" 
              size="xl" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Shop All Products
            </WhatsAppButton>
            <WhatsAppButton 
              message="Hi! I'd like to request samples of Snacklery's edible cutlery products to try them out."
              variant="outline" 
              size="xl" 
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Request Samples
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;