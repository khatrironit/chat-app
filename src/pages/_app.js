import ChatsProvider from "@contexts/chats";
import "@styles/global.scss";

const App = ({ Component, pageProps }) => (
  <ChatsProvider>
    <Component {...pageProps} />
  </ChatsProvider>
);

export default App;
