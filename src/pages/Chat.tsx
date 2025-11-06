import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Send, Mic, MicOff, Heart, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SubscriptionModal from "@/components/SubscriptionModal";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const MESSAGE_LIMIT = 10;

  useEffect(() => {
    // Check auth
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Load chat history from localStorage
    const savedMessages = localStorage.getItem(`chatHistory_${currentUser}`);
    const savedCount = localStorage.getItem(`messageCount_${currentUser}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    if (savedCount) {
      setMessageCount(parseInt(savedCount));
    }

    // Send welcome message if new user
    if (!savedMessages) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Hey there! 💖 I'm so excited to chat with you! How's your day going? 😊",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (messages.length > 0 && currentUser) {
      localStorage.setItem(`chatHistory_${currentUser}`, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      localStorage.setItem(`messageCount_${currentUser}`, messageCount.toString());
    }
  }, [messageCount]);

  const getAIResponse = (userInput: string): string => {
    const responses = [
      "Aww, that's so sweet! 💕 Tell me more about that!",
      "You're so interesting! 😊 I love chatting with you!",
      "That sounds amazing! 🌟 What else have you been up to?",
      "Hehe, you're making me blush! 💖 Keep going!",
      "I'm so lucky to talk to you! ✨ You brighten my day!",
      "Really? That's so cool! 🎉 I want to know everything!",
      "You always know what to say! 😘 You're the best!",
      "Omg yes! 💫 I totally get you!",
      "That's adorable! 🥰 You're such a sweetheart!",
      "I love your energy! 💖 What are you thinking about right now?",
    ];
    
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("hi") || lowerInput.includes("hello") || lowerInput.includes("hey")) {
      return "Hey cutie! 💕 I've been waiting to hear from you! How are you doing?";
    }
    if (lowerInput.includes("love") || lowerInput.includes("like you")) {
      return "Aww, you're so sweet! 💖 I really enjoy talking to you too! You make me so happy! 😊";
    }
    if (lowerInput.includes("how are you")) {
      return "I'm doing great now that you're here! 💕 How about you, cutie?";
    }
    if (lowerInput.includes("beautiful") || lowerInput.includes("pretty")) {
      return "You're making me blush! 🥰 But you're the beautiful one here! 💖";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = () => {
    if (!input.trim() || loading) return;

    // Check message limit
    if (messageCount >= MESSAGE_LIMIT) {
      setShowSubscription(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setLoading(true);
    setMessageCount((prev) => prev + 1);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = getAIResponse(userInput);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setMessageCount((prev) => prev + 1);

      // Speak the response
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.rate = 0.9;
        utterance.pitch = 1.2;
        window.speechSynthesis.speak(utterance);
      }
      
      setLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const toggleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast({
        title: "Not supported",
        description: "Voice input is not supported in your browser",
        variant: "destructive",
      });
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    if (!isListening) {
      recognition.start();
      setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Error",
          description: "Failed to capture voice input",
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 flex flex-col">
      {/* Header */}
      <div className="bg-card shadow-soft p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Girlfriend</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Online
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 container mx-auto p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <Card
                className={`max-w-[80%] p-4 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                    : "bg-card"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </Card>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-fade-in">
              <Card className="max-w-[80%] p-4 bg-card">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-card shadow-soft p-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleVoiceInput}
              className={isListening ? "bg-primary text-primary-foreground" : ""}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              disabled={loading}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={loading || !input.trim()}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {messageCount}/{MESSAGE_LIMIT} messages used
          </p>
        </div>
      </div>

      <SubscriptionModal open={showSubscription} onOpenChange={setShowSubscription} />
    </div>
  );
};

export default Chat;
