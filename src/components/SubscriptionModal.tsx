import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubscriptionModal = ({ open, onOpenChange }: SubscriptionModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <DialogTitle className="text-2xl">Unlock Unlimited Chats! 💖</DialogTitle>
          <DialogDescription className="text-base">
            Subscribe now to continue your conversations with your AI Girlfriend without any limits!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
            <h3 className="text-xl font-bold mb-2">Premium Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Unlimited messages
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Priority responses
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Advanced personality
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Voice features
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <Button className="w-full" size="lg">
              Subscribe Now - $9.99/month
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => onOpenChange(false)}>
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
