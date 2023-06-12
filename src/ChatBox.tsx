import { useEffect, useRef, useState } from "react";
import MessageComponent from "./MessageComponent";
import SendMessage from "./SendMessage";
import man1Icon from './images/man_icon.png';
import man2Icon from './images/man_2_icon.png';
import { Message, User } from "./interfaces";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([
    {id:1, name:'John Doe', avatar:man1Icon},
    {id:2, name:'Carl Black', avatar:man2Icon},
  ]);
  const scroll = useRef<HTMLSpanElement>(null);
  const storedMessages: string | null = localStorage.getItem('chatMessages');
  localStorage.setItem('storedUsers', JSON.stringify(users));

  useEffect(() => {
    // Retrieve chat messages from localStorage
    if (storedMessages) {
      const parsedMessages: Message[] = JSON.parse(storedMessages);
      setMessages(parsedMessages);
    }
  }, []);
  
  useEffect(() => {
    // Store chat messages in localStorage whenever it changes
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages.map((message: Message) => (
          <MessageComponent 
            key={message.messageID}
            message={message} 
            allMessages={messages}/>
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage 
        scroll={scroll} 
        messages={messages} 
        setMessages={setMessages} 
        users={users}/>
    </main>
  );
};

export default ChatBox;