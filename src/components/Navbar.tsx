import React from "react";
import TokenIcon from "../assets/icons/token_icon.svg";

import WalletConnectButton from "./common/WalletConnectButton";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-[64px] flex items-center justify-between px-4 lg:px-6 z-50 bg-[#212124]">
      {/* Left Icon */}
     <div className="flex items-center gap-3">
      <img src={TokenIcon} alt="Token Icon" className="cursor-pointer w-8 h-8 lg:w-10 lg:h-10" />
      <p className="font-semibold text-base lg:text-xl leading-[24px]">Token Portfolio</p>
</div>
      {/* Right Button */}
  <WalletConnectButton />
 
    </nav>
  );
};

export default Navbar;
