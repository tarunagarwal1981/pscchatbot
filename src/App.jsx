import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Text, VStack, Input, Button, useToast } from '@chakra-ui/react';
import MessageList from './components/MessageList';
import { API_URL } from './config';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/v1/chat`, {
        question: input,
        conversation_id: Date.now().toString()
      });

      const botMessage = {
        type: 'bot',
        content: response.data.answer,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get response from the server',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        height="90vh"
        display="flex"
        flexDirection="column"
      >
        {/* Header */}
        <Box p={4} borderBottomWidth="1px" bg="blue.500" color="white">
          <Text fontSize="xl" fontWeight="bold">PSC Chatbot</Text>
        </Box>

        {/* Messages Area */}
        <Box flex="1" overflowY="auto" p={4} bg="gray.50">
          <MessageList messages={messages} />
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box p={4} borderTopWidth="1px" bg="white">
          <VStack spacing={4}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about PSC deficiencies..."
              size="lg"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <Button
              colorScheme="blue"
              onClick={handleSend}
              isLoading={isLoading}
              width="full"
              size="lg"
            >
              Send
            </Button>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
}

export default App;