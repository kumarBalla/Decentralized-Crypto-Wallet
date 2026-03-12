import React, { useState } from "react";
import "./Faqs.css";

const faqData = [
  { question: "What is MetaMask?", answer: "MetaMask is a crypto wallet and gateway to blockchain apps." },
  { question: "How do I create a wallet?", answer: "You can create a wallet by downloading MetaMask and following the setup instructions." },
  { question: "Is MetaMask secure?", answer: "MetaMask encrypts your private keys locally on your device to keep your assets safe." },
  { question: "Can I use MetaMask on mobile?", answer: "Yes, MetaMask is available on iOS and Android devices." },
  { question: "How do I restore my wallet?", answer: "Use your seed phrase to restore your wallet on any device." },
  { question: "What networks does MetaMask support?", answer: "MetaMask supports Ethereum, Polygon, Linea, and other EVM-compatible networks." },
  { question: "Can I swap tokens in MetaMask?", answer: "Yes, you can swap supported tokens directly in the wallet." },
  { question: "Is MetaMask free?", answer: "Installing and using MetaMask is free, but network fees may apply." },
];

function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const toggleAnswer = (index) => setOpenIndex(openIndex === index ? null : index);

  const sendMessage = (msg) => {
    if (!msg.trim()) return;

    // Add user message
    setChatMessages((prev) => [...prev, { text: msg, sender: "user" }]);

    // Bot reply logic
    setTimeout(() => {
      let answer = "Sorry, I don't have an answer for that. Please contact support.";
      for (let faq of faqData) {
        if (faq.question.toLowerCase().includes(msg.toLowerCase()) || faq.answer.toLowerCase().includes(msg.toLowerCase())) {
          answer = faq.answer;
          break;
        }
      }
      setChatMessages((prev) => [...prev, { text: answer, sender: "bot" }]);
    }, 500);
  };

  const handleSendMessage = () => {
    sendMessage(chatInput);
    setChatInput("");
  };

  const handleFaqClick = (question) => {
    sendMessage(question);
  };

  return (
    <div className="faqs-page">
      <div className="faqs-left">
        <h1>FAQs</h1>
        <p>Answers to the most commonly asked questions about MetaMask. Click on a question to view the answer.</p>
      </div>

      <div className="faqs-right">
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`}>
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <span>{item.question}</span>
              <span className="faq-toggle">{openIndex === index ? "−" : "+"}</span>
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}

        {/* Chatbot */}
        <div className={`chatbot-container ${chatOpen ? "open" : ""}`}>
          <div className="chatbot-header" onClick={() => setChatOpen(!chatOpen)}>
            <span>💬 Chat with us</span>
            <span>{chatOpen ? "−" : "+"}</span>
          </div>

          {chatOpen && (
            <div className="chatbot-body">
              <div className="chat-messages">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`chat-message ${msg.sender}`}>{msg.text}</div>
                ))}
              </div>

              {/* Suggested FAQ questions */}
              <div className="chat-faq-suggestions">
                {faqData.map((faq, idx) => (
                  <button key={idx} onClick={() => handleFaqClick(faq.question)}>
                    {faq.question}
                  </button>
                ))}
              </div>

              <div className="chat-input">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a question..."
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Faqs;
