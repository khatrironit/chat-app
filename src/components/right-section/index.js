import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { useChatsContext } from "@contexts/chats";
import { getCurrentTime } from "@helpers/time";

const RightSection = () => {
  const { query, push } = useRouter();
  const { chatId } = query;

  const { conversations, setConversations } = useChatsContext();

  const currentChat = useMemo(
    () =>
      conversations?.find((convo) => convo?.id?.toString() === chatId) || {},
    [chatId, conversations]
  );

  const { id, avatar, name, messages } = currentChat;

  const [message, setMessage] = useState("");

  const handleDeleteChat = () => {
    push("/");
    setConversations(
      conversations.filter((convo) => convo.id.toString() !== chatId)
    );
  };

  const handleAddMessage = () => {
    if (!message) return;
    const updatedConversations = conversations.map((convo) => ({
      ...convo,
      ...(convo.id.toString() === chatId && {
        messages: [
          ...convo.messages,
          {
            id: `${id}message${conversations.length}`,
            text: message,
            time: getCurrentTime(),
          },
        ],
      }),
    }));
    setMessage("");
    setConversations(updatedConversations);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleAddMessage();
  };

  const renderHeader = () =>
    chatId && (
      <div className="header">
        <div className="img-text">
          <div className="user-img">
            <Image
              className="dp"
              src={avatar || "/no-profile.svg"}
              alt=""
              height={100}
              width={100}
            />
          </div>
          <h4>
            {name}
            <br />
            <span>Online</span>
          </h4>
        </div>
        <div className="nav-icons">
          <Image
            src="/trash.svg"
            alt="delete chat"
            height={25}
            width={25}
            onClick={handleDeleteChat}
          />
        </div>
      </div>
    );

  const renderMessage = ({ id, text, time }) => {
    return (
      <div key={id} className="message-box my-message">
        <p>
          {text}
          <br />
          <span>{time}</span>
        </p>
      </div>
    );
  };

  const renderChatContainer = () => (
    <div className="chat-container">{messages?.map(renderMessage)}</div>
  );

  const renderFooter = () =>
    chatId && (
      <div className="chatbox-input">
        <input
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={handleKeyDown}
        />
        <Image
          src="/send.png"
          height={50}
          width={50}
          alt="send"
          onClick={handleAddMessage}
        />
      </div>
    );

  return (
    <div className="right-container">
      {renderHeader()}
      {renderChatContainer()}
      {renderFooter()}
    </div>
  );
};

export default RightSection;
