import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import Image from "next/image";

import { useChatsContext } from "@contexts/chats";

const ChatsListing = () => {
  const { query, push } = useRouter();
  const { chatId } = query;
  const { conversations, setConversations } = useChatsContext();

  const handleChatSelect = (id) => {
    const updatedConversations = conversations.map((convo) => ({
      ...convo,
      hasUnread: convo.id === id ? false : convo.hasUnread,
    }));

    setConversations(updatedConversations);
    push(`/${id}`);
  };

  const renderChat = ({ id, avatar, name, messages, hasUnread }) => {
    const hasMessages = !isEmpty(messages);
    const lastMessage = hasMessages && messages[messages.length - 1];
    const isActive = chatId === id?.toString();

    return (
      <div
        key={id}
        className={`chat-box ${isActive ? "active" : ""}`}
        onClick={() => handleChatSelect(id)}
      >
        <div className="img-box">
          <Image
            className="img-cover"
            src={avatar || "/no-profile.svg"}
            alt=""
            height={50}
            width={50}
          />
        </div>
        <div className="chat-details">
          <div className="text-head">
            <h4>{name}</h4>
            {hasMessages && (
              <p className={`time ${hasUnread ? "unread" : ""}`}>
                {lastMessage.time}
              </p>
            )}
          </div>
          {hasMessages && (
            <div className="text-message">
              <p>"{lastMessage.text}"</p>
              {hasUnread && <b>1</b>}
            </div>
          )}
        </div>
      </div>
    );
  };

  return <div className="chat-list">{conversations.map(renderChat)}</div>;
};

export default ChatsListing;
