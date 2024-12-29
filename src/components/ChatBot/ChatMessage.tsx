interface Message {
  type: 'user' | 'bot';
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.type === 'bot';
  
  // Ensure message content is always a string
  const content = typeof message.content === 'string' 
    ? message.content 
    : JSON.stringify(message.content, null, 2);

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap break-words
          ${isBot 
            ? 'bg-gray-100 text-gray-800' 
            : 'bg-[#002B5B] text-white'
          }`}
      >
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
}
