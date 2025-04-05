import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './PlantChatBot.scss';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

interface PlantChatBotProps {
  showChatBot: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const PlantChatBot: React.FC<PlantChatBotProps> = ({ showChatBot, onClose, onOpen }) => {
  // Загрузка истории из localStorage
  const loadHistory = (): Message[] => {
    const saved = localStorage.getItem('plantChatHistory');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        text: 'Здравствуйте! Я эксперт по растениям. Задайте ваш вопрос, и мы ответим вам в ближайшее время!',
        sender: 'bot',
        time: getCurrentTime()
      }
    ];
  };

  const [messages, setMessages] = useState<Message[]>(loadHistory());
  const [inputMessage, setInputMessage] = useState('');
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatIdRef = useRef<string>(`user_${Date.now()}`);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Сохранение истории при изменении
  useEffect(() => {
    localStorage.setItem('plantChatHistory', JSON.stringify(messages));
  }, [messages]);

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const pollForResponse = async () => {
      if (!isWaitingResponse) return;
      
      try {
        const response = await axios.get(
          `http://localhost:5001/chat/get_response?chat_id=${chatIdRef.current}`
        );
        
        if (response.data.response) {
          addBotMessage(response.data.response);
          setIsWaitingResponse(false);
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    pollingIntervalRef.current = setInterval(pollForResponse, 2000);
    
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [isWaitingResponse]);

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: text,
      sender: 'bot',
      time: getCurrentTime()
    }]);
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === '' || isWaitingResponse) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      time: getCurrentTime()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsWaitingResponse(true);

    try {
      await axios.post('http://localhost:5001/chat/send', {
        chat_id: chatIdRef.current,
        text: inputMessage
      });
      addBotMessage('Ваше сообщение отправлено. Ожидайте ответа...');
    } catch (error) {
      console.error('Send error:', error);
      addBotMessage('Ошибка соединения с сервером');
      setIsWaitingResponse(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  };

  const clearHistory = () => {
    setMessages([{
      id: 1,
      text: 'Здравствуйте! Я эксперт по растениям. Задайте ваш вопрос, и мы ответим вам в ближайшее время!',
      sender: 'bot',
      time: getCurrentTime()
    }]);
  };

  if (!showChatBot) {
    return (
      <div className="chatbot-button-container">
        <button
          onClick={onOpen}
          className="chatbot-toggle-button"
          aria-label="Открыть чат"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="ai-badge">AI</span>
        </button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="chatbot-minimized" onClick={() => setIsMinimized(false)}>
        <div className="chatbot-avatar">🌿</div>
        <div className="chatbot-notification"></div>
      </div>
    );
  }

  return (
    <div className="plant-chatbot-window">
      <div className="chatbot-header">
        <div className="header-content">
          <h3>Эксперт по растениям</h3>
          <p>Онлайн-консультация</p>
        </div>
        <div className="header-actions">
          <button className="minimize-btn" onClick={() => setIsMinimized(true)}>
            &minus;
          </button>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.sender === 'bot' && <div className="avatar">🌿</div>}
            <div className="message-content">
              <p className="message-text">{msg.text}</p>
              <span className="message-time">{msg.time}</span>
            </div>
          </div>
        ))}
        {isWaitingResponse && (
          <div className="message bot typing">
            <div className="avatar">🌿</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-footer">
        <div className="quick-questions">
          <button onClick={() => setInputMessage('Как ухаживать за орхидеей?')}>Орхидея</button>
          <button onClick={() => setInputMessage('Почему желтеют листья?')}>Желтеют листья</button>
          <button onClick={() => setInputMessage('Какие удобрения использовать?')}>Удобрения</button>
        </div>
        
        <div className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Спросите о растениях..."
            disabled={isWaitingResponse}
          />
          
          <div className="action-buttons">
            <button 
              className="send-button" 
              onClick={sendMessage} 
              disabled={isWaitingResponse || inputMessage.trim() === ''}
            >
              Отправить
            </button>
            <button 
              className="clear-button" 
              onClick={clearHistory}
            >
              Очистить историю
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantChatBot;