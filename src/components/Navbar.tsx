import React from "react";
import TokenIcon from "../assets/icons/token_icon.svg";
import WalletIcon from "../assets/icons/wallet.svg";
import PrimaryButton from "./common/PrimaryButton";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-[64px] flex items-center justify-between px-6 z-50 bg-[#212124]">
      {/* Left Icon */}
     <div className="flex items-center gap-3">
      <img src={TokenIcon} alt="Token Icon" className="cursor-pointer w-10 h-10" />
      <p className="font-semibold text-xl leading-[24px]">Token Portfolio</p>
</div>
      {/* Right Button */}
   <PrimaryButton text="Conect wallet" icon={WalletIcon} radius="rounded-full" onClick={() => { /* Handle click */ }} />
    </nav>
  );
};

export default Navbar;
