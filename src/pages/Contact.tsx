import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import WhatsAppButton from "@/components/WhatsAppButton";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  shapes: z.array(z.string()).min(1, "Please select at least one shape"),
  flavors: z.array(z.string()).min(1, "Please select at least one flavor"),
  specialProducts: z.array(z.string()).optional(),
  quantity: z.string().min(1, "Please specify quantity needed"),
  message: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

const shapes = [
  { id: "spork", label: "Spork" },
  { id: "spoon", label: "Spoon" },
  { id: "dessert-spoon", label: "Dessert Spoon" }
];

const flavors = [
  { id: "peri-peri", label: "Peri Peri", description: "Bold, Zesty & Fiery" },
  { id: "simply-classic", label: "Simply Classic", description: "The authentic taste of golden wheat" },
  { id: "chocolate", label: "Chocolate", description: "Rich, Smooth & Indulgent" }
];

const specialProducts = [
  { id: "edible-stirrers", label: "Edible Stirrers" },
  { id: "pixy", label: "Pixy" }
];

const Contact = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      shapes: [],
      flavors: [],
      specialProducts: [],
      quantity: "",
      message: ""
    }
  });

  const selectedShapes = form.watch("shapes");
  const selectedFlavors = form.watch("flavors");
  
  const getQuantityPlaceholder = () => {
    return "e.g., 1000 pieces";
  };

  const generateWhatsAppMessage = (data: FormData) => {
    const shapeNames = data.shapes.map(id => 
      shapes.find(s => s.id === id)?.label
    ).join(", ");
    
    const flavorNames = data.flavors.map(id => 
      flavors.find(f => f.id === id)?.label
    ).join(", ");

    const specialProductNames = data.specialProducts && data.specialProducts.length > 0
      ? data.specialProducts.map(id => 
          specialProducts.find(p => p.id === id)?.label
        ).join(", ")
      : null;

    let message = `Hi! I'm excited to bite Snacklery's edible cutlery products.

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}${data.company ? `\nCompany: ${data.company}` : ''}
Shapes: ${shapeNames}
Flavors: ${flavorNames}`;

    if (specialProductNames) {
      message += `\nSpecial Products: ${specialProductNames}`;
    }

    message += `\nQuantity Needed: ${data.quantity}${data.message ? `\n\nMessage: ${data.message}` : ''}

Looking forward to hearing from you!`;

    return message;
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 gradient-earth">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-foreground mb-6 tracking-tight">
            Connect With Our Team
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Ready to explore sustainable food technology solutions?<br />
            Our team is here to discuss partnerships, product specifications, and implementation strategies.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 animate-fade-in-up">
            {/* Contact Details */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">📍 Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gradient-sustainable rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">📧 Email</div>
                    <div className="text-muted-foreground">hello@snacklery.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gradient-sustainable rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">📞 Phone</div>
                    <div className="text-muted-foreground">+91-8374155974</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gradient-sustainable rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">📍 Address</div>
                    <div className="text-muted-foreground">
                      Uppal, Hyderabad, India
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              📝 Send us an Enquiry
            </h2>
            <p className="text-xl text-muted-foreground">
              Fill out the form below and we'll get back to you with a personalized quote
            </p>
          </div>

          <Card className="shadow-soft animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">Business Enquiry Form</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 9876543210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name (optional)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="shapes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shapes *</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                          {shapes.map((shape) => (
                            <div key={shape.id} className="flex items-center space-x-3">
                              <Checkbox
                                id={shape.id}
                                checked={field.value?.includes(shape.id)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  if (checked) {
                                    field.onChange([...current, shape.id]);
                                  } else {
                                    field.onChange(current.filter((id) => id !== shape.id));
                                  }
                                }}
                              />
                              <Label htmlFor={shape.id} className="text-sm font-medium">
                                {shape.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="flavors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flavors *</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                          {flavors.map((flavor) => (
                            <div key={flavor.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors">
                              <Checkbox
                                id={flavor.id}
                                checked={field.value?.includes(flavor.id)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  if (checked) {
                                    field.onChange([...current, flavor.id]);
                                  } else {
                                    field.onChange(current.filter((id) => id !== flavor.id));
                                  }
                                }}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <Label htmlFor={flavor.id} className="text-sm font-medium cursor-pointer">
                                  {flavor.label}
                                </Label>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {flavor.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialProducts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Products (Optional)</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          {specialProducts.map((product) => (
                            <div key={product.id} className="flex items-center space-x-3">
                              <Checkbox
                                id={product.id}
                                checked={field.value?.includes(product.id)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  if (checked) {
                                    field.onChange([...current, product.id]);
                                  } else {
                                    field.onChange(current.filter((id) => id !== product.id));
                                  }
                                }}
                              />
                              <Label htmlFor={product.id} className="text-sm font-medium">
                                {product.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity Needed *</FormLabel>
                        <FormControl>
                          <Input placeholder={getQuantityPlaceholder()} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide more details about your requirements, intended use, timeline, or any specific questions... (optional)"
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <WhatsAppButton
                    message={generateWhatsAppMessage(form.getValues())}
                    variant="sustainable"
                    size="lg"
                    className="w-full"
                  >
                    Send Enquiry
                  </WhatsAppButton>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 gradient-earth">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ❓ Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Q: How long do Snacklery utensils last during a meal?",
                answer: "A: Our edible cutlery stays firm for 15–20 minutes in hot or cold foods and beverages — plenty of time to enjoy your meal."
              },
              {
                question: "Q: Are the products safe for people with allergies?",
                answer: "A: Yes! We offer gluten-free options and clearly label all ingredients. For specific allergy concerns, reach out to our support team."
              },
              {
                question: "Q: What is the minimum order quantity for businesses?",
                answer: "A: We cater to both small and large needs. Businesses can order as low as 100 pieces for trials, and bulk pricing starts from 5000+ units."
              },
              {
                question: "Q: How should I store edible cutlery?",
                answer: "A: Store in a cool, dry place away from sunlight. Shelf life is up to 12 months when sealed in original packaging."
              }
            ].map((faq, index) => (
              <Card key={index} className="animate-fade-in-up">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;