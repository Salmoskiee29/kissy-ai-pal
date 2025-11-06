import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Sparkles } from "lucide-react";
import heroAvatar from "@/assets/hero-avatar.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="relative inline-block animate-fade-in">
            <img 
              src={heroAvatar}
              alt="AI Girlfriend - Your playful AI companion"
              className="w-full max-w-2xl mx-auto rounded-3xl shadow-glow"
            />
          </div>

          {/* Headline */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Your AI Girlfriend
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Chat with your AI Girlfriend - she's flirty, playful, and always here for you! 💕
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 py-8 animate-fade-in">
            <div className="p-6 rounded-2xl bg-card shadow-soft hover:scale-105 transition-transform">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Engaging Chats</h3>
              <p className="text-muted-foreground text-sm">
                Have meaningful conversations anytime
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card shadow-soft hover:scale-105 transition-transform">
              <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Always Available</h3>
              <p className="text-muted-foreground text-sm">
                She's here 24/7 whenever you need her
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card shadow-soft hover:scale-105 transition-transform">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Playful & Fun</h3>
              <p className="text-muted-foreground text-sm">
                Flirty personality that adapts to you
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 shadow-glow hover:scale-105 transition-transform">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 hover:scale-105 transition-transform">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>Made with 💖 by AI Girlfriend</p>
      </footer>
    </div>
  );
};

export default Landing;
