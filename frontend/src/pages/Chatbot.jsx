// import { useState } from "react";

// export default function Chatbot() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = input.trim();
//     setMessages(prev => [...prev, { role: "user", text: userMessage }]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userMessage })
//       });

//       const data = await res.json();
//       setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
//     } catch (err) {
//       setMessages(prev => [...prev, { role: "bot", text: "Server error" }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "500px", margin: "auto" }}>
//       <h2>🌾 Farmer AI Chatbot (DeepSeek)</h2>
//       <div style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
//         {messages.map((m, i) => (
//           <p key={i} style={{ textAlign: m.role === "user" ? "right" : "left" }}>
//             <b>{m.role === "user" ? "You: " : "Bot: "}</b> {m.text}
//           </p>
//         ))}
//         {loading && <p>⏳ Soch raha hoon...</p>}
//       </div>

//       <input
//         type="text"
//         value={input}
//         onChange={e => setInput(e.target.value)}
//         placeholder="Farming sawal likho..."
//         style={{ width: "70%", padding: "5px" }}
//         onKeyDown={e => e.key === "Enter" && sendMessage()}
//       />
//       <button onClick={sendMessage} style={{ padding: "5px 10px", marginLeft: "5px" }}>Send</button>
//     </div>
//   );
// }



import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import Navbar from "../components/Navbar";

export default function ChatWithNavbar() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setResponse(data.reply);
    } catch (error) {
      console.error(error);
      setResponse("Error occurred!");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--body-bg)] transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      {/* Chat Container */}
      <div className="flex-1 flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-4xl">
          <div className="bg-[var(--chat-bg)] rounded-3xl shadow-2xl border border-[var(--border-color)] overflow-hidden flex flex-col">
            {/* Messages Area */}
            <div className="p-6 space-y-4 flex-1 overflow-y-auto min-h-[400px] max-h-[500px]">
              {/* User Message */}
              {input && (
                <div className="flex gap-3 justify-end">
                  <div
                    className="rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]"
                    style={{
                      backgroundColor: "var(--chat-msg-user-bg)",
                      color: "var(--chat-msg-user-text)",
                    }}
                  >
                    <p>{input}</p>
                  </div>
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--user-bg)" }}
                  >
                    <User className="w-4 h-4" style={{ color: "var(--user-text)" }} />
                  </div>
                </div>
              )}

              {/* Loading */}
              {loading && (
                <div className="flex gap-3">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--bot-bg)" }}
                  >
                    <Bot className="w-4 h-4" style={{ color: "var(--bot-text)" }} />
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3"
                    style={{ backgroundColor: "var(--chat-msg-bot-bg)", color: "var(--chat-msg-bot-text)" }}
                  >
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bot Response */}
              {response && !loading && (
                <div className="flex gap-3">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--bot-bg)" }}
                  >
                    <Bot className="w-4 h-4" style={{ color: "var(--bot-text)" }} />
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]"
                    style={{ backgroundColor: "var(--chat-msg-bot-bg)", color: "var(--chat-msg-bot-text)" }}
                  >
                    <p className="whitespace-pre-wrap">{response}</p>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!response && !loading && !input && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-[var(--chat-text)]/50">Start a conversation with AI</p>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t px-4 py-3 flex gap-3" style={{ backgroundColor: "var(--chat-input-bg)" }}>
              <textarea
                rows="1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 rounded-xl px-4 py-3 resize-none focus:outline-none"
                style={{ backgroundColor: "var(--chat-input-bg)", color: "var(--chat-text)" }}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-4 py-3 rounded-xl"
                style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)" }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
