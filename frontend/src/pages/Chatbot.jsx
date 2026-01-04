import React, { useState } from "react";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔴 OpenAI API KEY (demo only – frontend me unsafe hoti hai)
  const OPENAI_API_KEY = "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";
  const OPENAI_MODEL = "gpt-4o-mini";

  const sendToOpenAI = async (msg) => {
    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          input: `Tum agriculture expert ho. Simple Urdu me jawab do.\nUser: ${msg}`,
        }),
      });

      const data = await response.json();
      console.log("OpenAI response:", data);

      if (!response.ok) {
        return `Error: ${data.error?.message || "Request failed"}`;
      }

      return (
        data?.output_text ||
        "Samajh nahi aaya, dobara likho."
      );
    } catch (error) {
      console.error("Network error:", error);
      return "Network error — Internet ya API key check karo.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    const reply = await sendToOpenAI(userMsg);
    setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    setLoading(false);
  };

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-emerald-800/60 to-green-900/70"></div>

      {/* Chat Container */}
      <div className="relative z-10 w-full max-w-lg p-6 rounded-3xl backdrop-blur-xl bg-white/15 border border-white/20 shadow-2xl">
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          🌾 Farmer AI Chatbot
        </h2>

        {/* Messages */}
        <div className="h-96 overflow-y-auto mb-4 p-4 rounded-2xl bg-white/10 border border-white/20">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`mb-3 ${
                m.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-2xl ${
                  m.role === "user"
                    ? "bg-emerald-400/30 text-white border border-emerald-300/30"
                    : "bg-white/20 text-emerald-100 border border-white/30"
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}

          {loading && (
            <p className="text-emerald-200 italic">
              ⏳ Soch raha hoon...
            </p>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Farming sawal likho..."
            className="flex-1 px-4 py-2 rounded-2xl bg-white/20 text-white placeholder-emerald-200 border border-white/30 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="px-5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
