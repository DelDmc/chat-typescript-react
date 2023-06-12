import { MessageProps } from "./interfaces";

const MessageComponent: React.FC<MessageProps> = ({ message, allMessages }) => {
  const lastMessage = allMessages[allMessages.length - 1];
  const isLastUser = message.user.id === lastMessage.user.id;
  const bubbleClassName = `chat-bubble ${isLastUser ? "right" : ""}`;
  const timestampClassName = `message-time ${isLastUser ? "right" : ""}`;
  // messageID is a timestamp and it is used to convert to readable date/time 
  const timestamp = new Date(message.messageID).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
    <div className={bubbleClassName}>
    <img
      className="chat-bubble__left"
      src={message.user.avatar}
      alt="user avatar"
    />
    <div className="chat-bubble__right">
      <p className="user-name">{message.user.name}</p>
      <p className="user-message">{message.text}</p>
    </div> 
  </div>
  <p className={timestampClassName}>{timestamp}</p>
  </>
    
  );
};

export default MessageComponent;