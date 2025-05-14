import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Github, Home, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactSection: React.FC = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally send the form data to a backend
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
      <p className="mb-6 text-muted-foreground">
        Have a project in mind or just want to chat? Feel free to reach out!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your.email@example.com" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What's this about?" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Tell me about your project or inquiry..." 
                rows={5}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </Card>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
            <p className="text-muted-foreground mb-4">
              Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-3">
              <a 
                href="mailto:your.email@example.com" 
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <Mail size={20} />
                <span>mukul.kumar630@gmail.com</span>
              </a>
              
              <p className="flex items-center gap-2">
                <Home size={20} />
                <span>Location: Ayodhya, Uttar Pradesh, India</span>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Social Media</h3>
            <div className="flex gap-4">
              <a 
                href="https://github.com/imkool47" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-background transition-colors"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/mukul47" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-background transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://www.instagram.com/mukuwu._.69/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-background transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
