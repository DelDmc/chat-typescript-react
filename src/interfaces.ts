export interface MessageProps {
  key: number;
  message: Message,
  allMessages: Message[]
}

export interface Message{
  messageID: number;
  user: User,
  text: string
}

export interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface SendMessageProps {
  scroll: React.RefObject<HTMLSpanElement>,
  messages: Message[],
  users: User[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

export interface SendMessage {

}

