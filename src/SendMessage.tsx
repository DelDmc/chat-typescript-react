import { useState } from "react";
import { User,SendMessageProps } from "./interfaces";

const SendMessage: React.FC<SendMessageProps> = ({ scroll, users, setMessages }) => {
  const defaultUser: User = { id: 0, name: "Select user", avatar: "no avatar" };
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [firstOptionHidden, setFirstOptionHidden] = useState<boolean>(false);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.options[event.target.selectedIndex] as HTMLOptionElement;
    console.log(selectedOption)
    const selectedUserId= +selectedOption.getAttribute('data-user')!;
    console.log("selectedUserId",selectedUserId)
    if (!isNaN(selectedUserId)) {
      const user = users.find((user) => user.id === selectedUserId);
      console.log("user", user)
      if (user !== undefined) {
        setCurrentUser(user);
      } else {
        throw new Error('User not found');
      }
    } else {
      throw new Error('Invalid selected user ID');
    }
    setFirstOptionHidden(true);
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    if (currentUser.id === 0) {
      alert("Select the proper role");
      return;
    }
    setMessages((prevMessages) => [...prevMessages, {messageID: Date.now(), user:{id:currentUser.id, name:currentUser.name, avatar:currentUser.avatar}, text:message}])
    setMessage('');
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <select value={typeof currentUser !== 'string'?currentUser.name:"Select role"} onChange={handleRoleChange} className="form-input__select">
        {!firstOptionHidden && <option value="">Choose a role</option>}
        {users.map((user) => (<option key={user.id} data-user ={user.id} >{user.name}</option>))}
      </select>
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;