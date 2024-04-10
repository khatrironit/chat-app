import { useRouter } from "next/router";

import useIsMobile from "@hooks/use-is-mobile";

import LeftSection from "@components/left-section";
import RightSection from "@components/right-section";

const ChatsHome = () => {
  const { query } = useRouter();
  const { chatId } = query;
  const isMobileDevice = useIsMobile();

  const renderContainer = () => {
    if (!isMobileDevice)
      return (
        <>
          <LeftSection />
          <RightSection />
        </>
      );

    if (!chatId) return <LeftSection />;
    return <RightSection />;
  };
  return (
    <div>
      <div className="background-green"></div>
      <div className="main-container">{renderContainer()}</div>
    </div>
  );
};

export default ChatsHome;
