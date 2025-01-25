import React from 'react';
import { VStack } from '@chakra-ui/react';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <VStack spacing={4} align="stretch">
      {messages.map((message, index) => (
        <Message key={`${message.timestamp}-${index}`} message={message} />
      ))}
    </VStack>
  );
};

export default MessageList;
