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

const faqResponses = {
  "iron-rich recipes": "Here's a quick recipe: **Palak Dal** (Spinach & Lentils). Boil 1 cup lentils with turmeric. In a pan, sauté cumin, onions, garlic, and 2 cups chopped spinach. Mix with lentils and add a dash of lemon juice for Vitamin C! 🍲",
  "my anemia risk": "Your last scan showed a **Moderate Risk**. It's important to continue logging your meals and drinking plenty of water. If you feel dizzy or unusually tired, please consult your doctor. 🩺",
  "water reminder": "Staying hydrated is crucial! You should aim for about 2.5 to 3 liters of water a day during pregnancy. I can send you a reminder every 2 hours if you'd like! 💧",
  "when to see doctor?": "You should contact your doctor immediately if you experience: severe headaches, vision changes, sudden swelling in your hands/face, decreased fetal movement, or vaginal bleeding. For regular checkups, please follow your scheduled appointments. 🏥",
  "exercise tips": "Light exercises like walking, prenatal yoga, and swimming are great! Avoid activities with a high risk of falling or abdominal trauma. Always listen to your body and consult your doctor before starting any new routine. 🧘‍♀️",
  "default": "Thank you for sharing! I'm here to help you with any concerns about your pregnancy health journey. Would you like to know more about nutrition, hydration, or anemia prevention? 🌸"
};

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
      const lowerText = text.trim().toLowerCase();
      let responseText = faqResponses["default"];
      
      for (const [key, answer] of Object.entries(faqResponses)) {
        if (key !== "default" && lowerText.includes(key)) {
          responseText = answer;
          break;
        }
      }

      const botMsg = {
        id: messages.length + 2,
        type: "bot",
        text: responseText,
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
