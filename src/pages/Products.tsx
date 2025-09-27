import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

const Products = () => {
  const products = [
    {
      name: "Vanilla Spoon",
      description: "A delightfully sweet edible spoon with natural vanilla flavor. Perfect for desserts, yogurt, and sweet treats.",
      features: ["Natural vanilla flavoring", "15-20 minute structural integrity", "Food-grade edible polymer", "Enhances dessert experience"],
      popular: true,
      image: "/images/vanilla-spoon.png"
    },
    {
      name: "Chocolate Spoon",
      description: "Rich chocolate-flavored edible spoon designed specifically for desserts. Adds an extra layer of indulgence to your sweet treats.",
      features: ["Rich chocolate flavor", "Perfect for desserts and ice cream", "Maintains structure for 15-20 minutes", "Premium cocoa ingredients"],
      popular: false,
      image: "/images/chocolate-spoon.png"
    },
    {
      name: "Pepper Spoon",
      description: "Savory edible spoon with a hint of black pepper. Ideal for soups, curries, and main course meals.",
      features: ["Subtle pepper seasoning", "Heat-resistant construction", "Complements savory dishes", "Natural spice integration"],
      popular: false,
      image: "/images/pepper-spoon.png"
    },
    {
      name: "Stirrer Collection",
      description: "Versatile edible stirrers available in three variants: Normal, Chocolate, and Vanilla. Perfect for beverages and mixing.",
      features: ["Three flavor variants available", "Optimal for hot and cold beverages", "Dissolves at perfect pace", "Multi-purpose functionality"],
      popular: false,
      image: "/images/stirrer.png"
    },
    {
      name: "Pepper Fork",
      description: "Innovative edible fork with pepper seasoning. Designed for main courses and savory dishes requiring fork utensils.",
      features: ["Pepper-infused edible material", "Fork design for versatility", "Maintains strength during meals", "Adds flavor to every bite"],
      popular: false,
      image: "/lovable-uploads/ef0d98dc-96e9-459b-9125-27190b0059fd.png"
    },
    {
      name: "Pixy",
      description: "Our signature compact edible utensil. A unique innovation combining functionality with delightful taste experience.",
      features: ["Compact and portable design", "Unique flavor profile", "Multi-functional usage", "Premium food-grade ingredients"],
      popular: false,
      image: "/images/pixy.png"
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
          <p className="text-xl text-muted-foreground leading-relaxed">
            Advanced edible cutlery technology engineered for commercial food service, 
            hospitality, and consumer applications. Delivering sustainability without compromise.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <Card 
                key={index} 
                className={`group hover:shadow-green transition-smooth animate-fade-in-up relative ${
                  product.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {product.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="gradient-hero text-primary-foreground px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="h-32 w-32 mx-auto mb-4 animate-float flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">{product.name}</CardTitle>
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
            Ready to Make the Switch?
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