import React from "react";
import TokenIcon from "../assets/icons/token_icon.svg";
import WalletIcon from "../assets/icons/wallet.svg";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between text-white px-4 py-3 z-50">
      {/* Left Icon */}
     <div className="flex items-center gap-3">
      <img src={TokenIcon} alt="Token Icon" className="cursor-pointer w-10 h-10" />
      <p>Token Portfolio</p>
</div>
      {/* Right Button */}
      <button
        className="
          flex items-center gap-[6px]
       h-[36px]
          rounded-full
          px-[10px] py-[6px]
          bg-[#A9E851] 
          shadow-[0_0_0_1px_#1F6619,0_1px_2px_0_#1F661966,0_0.75px_0_0_#FFFFFF33_inset]
          cursor-pointer
        "
      >
        <img src={WalletIcon} alt="Wallet Icon" className="cursor-pointer w-[15px] h-[15px]" />
        <span className="text-text-primary font-medium leading-[20px]">Connect Wallet</span>
      </button>
    </nav>
  );
};

export default Navbar;
