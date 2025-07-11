import { useEffect, useRef, useState } from "react";
import { FaUser, FaRobot } from "react-icons/fa";
import axios from "axios";

function ChatBox({ extractedText }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    const userMsg = {
      sender: "user",
      text: userInput,
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsTyping(true);

    // 🧪 Backend placeholder
    try {
      // const response = await axios.post("http://localhost:8000/chat", {
      //   question: userInput,
      //   context: extractedText,
      // });
      // const botReply = response.data.answer;

      const botReply = "🤖 (This is a placeholder response. Backend will reply soon!)";

      const botMsg = {
        sender: "bot",
        text: botReply,
        time: new Date().toLocaleTimeString(),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 600); // fake delay
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Error connecting to chatbot. Try again later.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const MessageBubble = ({ sender, text, time }) => (
    <div
      className={`flex items-end gap-2 mb-3 ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {sender === "bot" && (
        <FaRobot className="text-green-600 text-xl bg-white rounded-full p-1" />
      )}
      <div
        className={`rounded-xl p-3 shadow max-w-sm text-sm ${
          sender === "user"
            ? "bg-blue-100 text-right"
            : "bg-green-100 text-left"
        }`}
      >
        <p className="whitespace-pre-wrap">{text}</p>
        <div className="text-xs text-gray-500 mt-1">{time}</div>
      </div>
      {sender === "user" && (
        <FaUser className="text-blue-600 text-xl bg-white rounded-full p-1" />
      )}
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-6 mt-10 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-white">
        💬 Invoice Chat Assistant
      </h2>

      <div className="h-80 overflow-y-auto bg-gray-50 dark:bg-gray-700 p-4 rounded border mb-4 scroll-smooth">
        {messages.length === 0 && (
          <p className="text-gray-400 italic text-sm">
            Start the conversation above your invoice...
          </p>
        )}

        {messages.map((msg, idx) => (
          <MessageBubble key={idx} {...msg} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-sm text-gray-500 italic">
            <FaRobot />
            <span>Bot is typing</span>
            <span className="animate-pulse">...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2">
        <textarea
          rows={1}
          className="flex-1 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
          placeholder="Ask something like 'What is the tax amount?'"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
