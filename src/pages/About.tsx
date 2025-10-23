import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Target, Eye, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 gradient-earth">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-foreground mb-6 tracking-tight">
            About <span className="text-primary">Snacklery</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">Who We Are</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            At Snacklery, we're revolutionizing the way the world thinks about cutlery by creating 
            edible solutions that are delicious, sustainable, and innovative. Our products don't just 
            replace plastic—they enhance the dining experience while protecting the planet.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="group hover:shadow-green transition-smooth animate-fade-in-up">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 gradient-sustainable rounded-full flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  To eliminate single-use plastic cutlery by designing delicious, edible alternatives 
                  that never compromise on functionality or taste. We believe sustainability should be 
                  accessible, enjoyable, and beneficial for both people and the planet.
                </p>
                <p className="text-muted-foreground font-medium mb-4">Our mission in action:</p>
                <ul className="space-y-3">
                  {[
                    "Reduce plastic waste in the food industry",
                    "Create nutritious and tasty edible products",
                    "Make sustainability simple and accessible for everyone",
                    "Support global environmental conservation efforts"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-green transition-smooth animate-fade-in-up">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 gradient-sustainable rounded-full flex items-center justify-center mr-4">
                    <Eye className="h-6 w-6 text-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  A world where every piece of cutlery is edible, sustainable, and delicious. 
                  We envision a future where disposable doesn't mean wasteful, and where 
                  innovation serves both human needs and environmental protection.
                </p>
                <p className="text-muted-foreground font-medium mb-4">Our vision for tomorrow:</p>
                <ul className="space-y-3">
                  {[
                    "Global adoption of edible cutlery solutions",
                    "Zero plastic waste from food service",
                    "Enhanced dining experiences worldwide",
                    "A healthier planet for future generations"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-20 gradient-earth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything we do is guided by our commitment to sustainability, innovation, and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "People-First",
                description: "We prioritize the health and satisfaction of our customers while considering our impact on communities worldwide."
              },
              {
                icon: Award,
                title: "Quality Excellence",
                description: "Every product meets the highest standards for taste, functionality, and safety through rigorous testing and food innovation."
              },
              {
                icon: Target,
                title: "Environmental Responsibility",
                description: "We're committed to reducing environmental impact through sustainable practices and circular economy principles."
              }
            ].map((value, index) => (
              <Card key={index} className="group hover:shadow-green transition-smooth text-center animate-fade-in-up">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 gradient-sustainable rounded-full mb-6 group-hover:scale-110 transition-bounce">
                    <value.icon className="h-8 w-8 text-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Story
            </h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <p className="text-lg text-primary font-semibold mb-4">
                Snacklery was born from a simple but profound question:<br />
                "What if our cutlery could also be part of the meal?"
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded by a team of food innovators and sustainability advocates, we saw an opportunity 
                to tackle one of the most overlooked sources of plastic waste. After years of research 
                and development, we created a range of edible cutlery made from natural, organic 
                ingredients—designed to complement a wide variety of foods and beverages.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Today, Snacklery partners with restaurants, cafés, events, corporates, railways, hospitals, 
                and individuals who share our vision of a sustainable future. Each spoon, straw, and stirrer 
                we create is not just a product—it's a step toward eliminating plastic waste while adding 
                joy to everyday dining experiences.
              </p>
              
              <div className="text-center mt-8">
                <Button variant="hero" size="xl" className="px-10 py-4" asChild>
                  <Link to="/products">
                    👉 Discover Our Products
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors & Advisors Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h3 className="text-2xl font-bold text-foreground text-center mb-12">Mentors & Advisors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Mr. Narayana Rao Peesapaty",
                  image: "/images/narayana.jpg",
                  title: "Founder, Bakey's – Edible Cutlery Pioneer",
                  bio: "A trailblazer in sustainable food solutions, Narayana founded India's first edible cutlery startup, inspiring Snacklery's mission to merge innovation with eco-conscious design."
                },
                {
                  name: "Mr. Mitesh Kadakia",
                  image: "/images/mitesh.jpg",
                  title: "Marketing Advisor – Startups & FMCG Strategy",
                  bio: "With 30+ years in corporate marketing and academia, Mitesh guides Snacklery in scaling its market presence and driving growth in B2B and sustainability-focused sectors."
                }
              ].map((member, index) => (
                <Card key={index} className="group hover:shadow-green transition-smooth text-center animate-fade-in-up">
                  <CardContent className="p-6">
                    <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-primary/20">
                      <AvatarImage src={member.image} alt={`${member.name}`} />
                      <AvatarFallback className="text-lg font-medium bg-primary/10">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="text-lg font-semibold text-foreground mb-1">{member.name}</h4>
                    <p className="text-sm text-primary font-medium mb-3">{member.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;