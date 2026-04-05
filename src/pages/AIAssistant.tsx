import { useState, useRef, useEffect } from "react";
import { Bot, Send, User } from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";
import { useAppContext } from "../context/AppContext";
import { INTERACTIONS } from "../data/interactions";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AIAssistant() {
  const { medications } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Etma'en AI assistant. I can only answer questions based on your uploaded medical records and medication data. I have no internet access and will not generate diagnoses.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "What medications am I currently taking?",
    "Are there any drug interactions?",
    "Show my recent lab results",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI response based on app state
    setTimeout(() => {
      let responseContent = "I can only answer questions based on your uploaded records.";
      const lowerText = text.toLowerCase();

      if (lowerText.includes("medication") || lowerText.includes("taking")) {
        const activeMeds = medications.filter((m) => m.status === "active");
        if (activeMeds.length > 0) {
          responseContent = `You are currently taking:\n${activeMeds.map((m) => `- ${m.name} (${m.dosage})`).join("\n")}`;
        } else {
          responseContent = "You currently have no active medications listed.";
        }
      } else if (lowerText.includes("interaction")) {
        const activeMeds = medications.filter((m) => m.status === "active").map((m) => m.name.toLowerCase());
        const activeInteractions = INTERACTIONS.filter(
          (interaction) => activeMeds.includes(interaction.drug1) && activeMeds.includes(interaction.drug2)
        );
        if (activeInteractions.length > 0) {
          responseContent = `I found ${activeInteractions.length} potential interaction(s):\n${activeInteractions
            .map((i) => `- ${i.drug1} and ${i.drug2}: ${i.description}`)
            .join("\n")}`;
        } else {
          responseContent = "I did not find any known interactions among your active medications.";
        }
      } else if (lowerText.includes("lab")) {
        responseContent = "You have a 'Blood Test Results.pdf' uploaded on 2025-03-12. Would you like me to summarize the key metrics from it?";
      }

      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: responseContent };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <PageHeader
        title="AI Assistant"
        subtitle={
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            Offline · Your records only · No internet access
          </div>
        }
      />

      <div className="px-4 py-3 border-b border-gray-100 bg-white">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-full text-xs font-medium whitespace-nowrap hover:bg-[var(--color-primary)]/20 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === "assistant" ? "bg-[var(--color-primary)] text-white" : "bg-gray-200 text-gray-600"
            }`}>
              {msg.role === "assistant" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
              msg.role === "assistant" 
                ? "bg-white border border-gray-200 text-[var(--color-text-primary)] rounded-tl-none" 
                : "bg-[var(--color-primary)] text-white rounded-tr-none"
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Ask about your health records..."
            className="w-full pl-4 pr-12 py-3 bg-gray-100 border-transparent rounded-full focus:bg-white focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full disabled:opacity-50 disabled:bg-gray-400 transition-colors"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
