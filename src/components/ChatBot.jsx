import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Bonjour ! Pose-moi une question." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: updatedMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = response.data.choices[0].message.content.trim();
      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Erreur GPT-3 :", error);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Une erreur est survenue lors de l'appel à GPT-3.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white border rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Chat IA (GPT-3)</h2>
      <div className="h-80 overflow-y-auto space-y-2 p-2 border rounded bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg w-fit max-w-[75%] ${
              msg.role === "user"
                ? "ml-auto bg-blue-200"
                : "mr-auto bg-gray-200"
            }`}
          >
            <strong>{msg.role === "user" ? "Vous" : "IA"} :</strong>{" "}
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder="Écris ta question ici..."
          className="flex-grow border rounded p-2 resize-none"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "..." : "Envoyer"}
        </button>
      </div>
    </div>
  );
}
