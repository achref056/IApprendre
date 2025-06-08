
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant IA pour l'enseignement du français. Comment puis-je vous aider aujourd'hui ?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    grammaire: "Pour la grammaire française, je recommande Antidote, LanguageTool et Bon Patron. Ces outils excellent dans la correction grammaticale et l'analyse syntaxique.",
    orthographe: "Pour l'orthographe, utilisez Scribens, Reverso ou Le Robert Correcteur. Ils offrent une correction précise et des explications détaillées.",
    vocabulaire: "Pour enrichir le vocabulaire, essayez Wordreference, Larousse en ligne, ou encore Quizlet pour créer des exercices interactifs.",
    conjugaison: "Le Conjugueur, Bescherelle en ligne et Reverso Conjugaison sont parfaits pour maîtriser les conjugaisons françaises.",
    expression: "Pour l'expression écrite, utilisez Hemingway Editor (adapté au français), Antidote ou encore Grammarly Premium avec support français.",
    lecture: "Pour la compréhension de lecture, essayez Lalilo, 1000 mots ou encore les ressources de TV5Monde Apprendre.",
    default: "Je peux vous aider avec la grammaire, l'orthographe, le vocabulaire, la conjugaison, l'expression écrite et la lecture. Quel domaine vous intéresse ?"
  };

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('grammaire') || message.includes('grammatical')) {
      return botResponses.grammaire;
    } else if (message.includes('orthographe') || message.includes('faute')) {
      return botResponses.orthographe;
    } else if (message.includes('vocabulaire') || message.includes('mot')) {
      return botResponses.vocabulaire;
    } else if (message.includes('conjugaison') || message.includes('verbe')) {
      return botResponses.conjugaison;
    } else if (message.includes('expression') || message.includes('écrire') || message.includes('rédaction')) {
      return botResponses.expression;
    } else if (message.includes('lecture') || message.includes('compréhension') || message.includes('lire')) {
      return botResponses.lecture;
    } else if (message.includes('bonjour') || message.includes('salut')) {
      return "Bonjour ! Ravi de vous rencontrer. Je suis là pour vous guider dans le choix des meilleurs outils IA pour l'enseignement du français. Que recherchez-vous ?";
    } else if (message.includes('merci')) {
      return "De rien ! N'hésitez pas si vous avez d'autres questions sur les outils d'IA pour l'enseignement du français.";
    } else {
      return botResponses.default;
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 h-96"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <span className="font-semibold">Assistant IA Français</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 p-4 chat-container">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isBot 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {message.isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </div>
                      <div className={`chat-bubble p-3 rounded-lg ${
                        message.isBot 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    className="mb-4 flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tapez votre message..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
