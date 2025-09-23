import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import WalletIcon from "../../assets/icons/wallet.svg";

interface WalletConnectButtonProps {
  radius?: string;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ radius = "rounded-full" }) => {
  return (
    <ConnectButton.Custom

>
      {({ account, chain, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: { opacity: 0, pointerEvents: "none" },
            })}
          >
            {!connected ? (
              <button
                onClick={openConnectModal}
                className={`flex items-center gap-[2px] lg:gap-[6px]
                  h-[36px]
                  ${radius}
                  px-[10px] py-[6px]
                  bg-[#A9E851]
                  shadow-[0_0_0_1px_#1F6619,0_1px_2px_0_#1F661966,0_0.75px_0_0_#FFFFFF33_inset]
                  cursor-pointer
                  transition-colors duration-200 hover:bg-[#91d742]`}
              >
                <img src={WalletIcon} alt="Wallet" className="w-[15px] h-[15px]" />
                <span className="text-text-primary font-medium leading-[20px] text-[13px]">
                  Connect Wallet
                </span>
              </button>
            ) : (
              // **Show RainbowKit default connected button inside your custom wrapper**
              <ConnectButton
                showBalance={true} // displays ETH balance
                accountStatus="address" // shows 0x5E…4B61
                chainStatus="icon" // shows Ethereum icon / network
              />
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnectButton;
