import { createContext, useContext, useMemo, useState } from "react";

import { INIT_CONVOS } from "@constants/chats";

export const ChatsContext = createContext({});

export const useChatsContext = () => useContext(ChatsContext);

const ChatsProvider = ({ children }) => {
  const [conversations, setConversations] = useState(INIT_CONVOS);

  const value = useMemo(
    () => ({
      conversations,
      setConversations,
    }),
    [conversations, setConversations]
  );

  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
};
export default ChatsProvider;
