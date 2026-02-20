import { useMemo, useState } from "react";
import { IoChatbubbleEllipsesOutline, IoClose } from "react-icons/io5";
import { sendChatMessage } from "../../services/chatService";
import "./Chatbot.css";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "bot",
  text: "Hi! I am NovaCart assistant. Ask about products, shipping, returns, payments, or your order flow.",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);

  const canSend = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading],
  );

  const addMessage = (nextMessage) => {
    setMessages((prev) => [...prev, nextMessage]);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    addMessage({
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
    });

    setInput("");
    setLoading(true);

    try {
      const data = await sendChatMessage(trimmed);
      addMessage({
        id: `b-${Date.now()}`,
        role: "bot",
        text:
          data?.reply || "Sorry, I could not generate a response right now.",
      });
    } catch (error) {
      addMessage({
        id: `e-${Date.now()}`,
        role: "bot",
        text:
          error?.response?.data?.message ||
          "Chat is temporarily unavailable. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-root">
      {isOpen ? (
        <div className="chatbot-panel card">
          <div className="chatbot-header">
            <h4>NovaCart Assistant</h4>
            <button
              type="button"
              className="chatbot-icon-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <IoClose />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message ${message.role === "user" ? "user" : "bot"}`}
              >
                {message.text}
              </div>
            ))}
            {loading ? (
              <div className="chatbot-message bot">Typing...</div>
            ) : null}
          </div>

          <div className="chatbot-input-row">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about NovaCart..."
              rows={2}
              maxLength={500}
            />
            <button
              type="button"
              className="button"
              onClick={handleSend}
              disabled={!canSend}
            >
              Send
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className="chatbot-fab button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open chat"
      >
        <IoChatbubbleEllipsesOutline />
      </button>
    </div>
  );
};

export default Chatbot;
