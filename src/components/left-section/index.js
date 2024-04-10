import Image from "next/image";

import ChatsListing from "@components/left-section/listing";

const LeftSection = () => {
  return (
    <div className="left-container">
      <div className="header">
        <div className="user-img">
          <Image
            className="dp"
            src="/user.svg"
            alt=""
            height={100}
            width={100}
          />
        </div>
      </div>
      <ChatsListing />
    </div>
  );
};

export default LeftSection;
