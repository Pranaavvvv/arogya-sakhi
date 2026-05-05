"use client";
import { useState, useRef, useEffect } from "react";
import BottomNav from "../../components/BottomNav";
import ProtectedRoute from "../../components/ProtectedRoute";
import "./page.css";

const initialMessages = [
  {
    id: 1,
    type: "bot",
    text: "Hello! I am your Sakhi. 🪷 How can I help you today?",
    time: "10:00 AM",
  },
  {
    id: 2,
    type: "user",
    text: "What foods help with anemia?",
    time: "10:01 AM",
  },
  {
    id: 3,
    type: "bot",
    text: "Great question! Here are some iron-rich foods that help combat anemia:\n\n🥬 **Spinach** — 2.7mg iron per serving\n🫘 **Lentils** — 3.3mg iron per serving\n🫒 **Beetroot** — Rich in folate & iron\n🥚 **Eggs** — 1.2mg iron per egg\n\n💡 **Tip:** Pair these with Vitamin C foods like lemon juice for better absorption!",
    time: "10:01 AM",
  },
];

const quickReplies = [
  "Iron-rich recipes",
  "My anemia risk",
  "Water reminder",
  "When to see doctor?",
  "Exercise tips",
];

function ChatPageContent() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [lang, setLang] = useState("en");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = {
      id: messages.length + 1,
      type: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botMsg = {
        id: messages.length + 2,
        type: "bot",
        text: "Thank you for your question! I'm here to help you with any concerns about your pregnancy health journey. Would you like to know more about nutrition, hydration, or anemia prevention? 🌸",
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="chat-bot-avatar">
            <span className="chat-bot-lotus">🪷</span>
          </div>
          <div>
            <h1 className="chat-header-title">Sakhi Chatbot</h1>
            <span className="chat-header-status">● Online</span>
          </div>
        </div>
        <div className="chat-header-right">
          <div className="chat-lang-toggle">
            <button
              className={`chat-lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={`chat-lang-btn ${lang === "hi" ? "active" : ""}`}
              onClick={() => setLang("hi")}
            >
              हिं
            </button>
          </div>
          <button className="header-icon-btn" aria-label="Notifications" style={{ background: "rgba(255,255,255,0.6)" }}>
            <span className="material-symbols-rounded">notifications</span>
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble-wrapper ${msg.type}`}>
            {msg.type === "bot" && (
              <div className="chat-bot-avatar-sm">
                <span>🪷</span>
              </div>
            )}
            <div className={`chat-bubble chat-bubble-${msg.type}`}>
              <p className="chat-bubble-text" dangerouslySetInnerHTML={{
                __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
              }} />
              <span className="chat-bubble-time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Quick replies */}
      <div className="chat-quick-replies">
        <div className="chat-quick-scroll">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              className="chip"
              onClick={() => sendMessage(reply)}
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <form className="chat-input-bar" onSubmit={handleSubmit}>
        <button type="button" className="chat-mic-btn" aria-label="Voice input">
          <span className="material-symbols-rounded">mic</span>
        </button>
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          id="chat-input"
        />
        <button type="submit" className="chat-send-btn" aria-label="Send message" id="chat-send-btn">
          <span className="material-symbols-rounded icon-filled">send</span>
        </button>
      </form>

      <BottomNav />
    </div>
  );
}

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <ChatPageContent />
    </ProtectedRoute>
  );
}
