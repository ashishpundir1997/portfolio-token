import React from "react";

interface PrimaryButtonProps {
  text: string;
  icon?: string; // optional, in case some buttons don’t need icons
  onClick?: () => void;
  radius?: string; // optional, to allow different border-radius values
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, icon, onClick, radius }) => {
  return (
    <button
      onClick={onClick}
   className={`flex items-center gap-[2px] lg:gap-[6px] 
  h-[36px]
   ${radius}
  px-[10px] py-[6px]
  bg-[#A9E851] 
  shadow-[0_0_0_1px_#1F6619,0_1px_2px_0_#1F661966,0_0.75px_0_0_#FFFFFF33_inset]
  cursor-pointer`}
    >
      {icon && (
        <img
          src={icon}
          alt="Button Icon"
          className="w-[15px] h-[15px]"
        />
      )}
      <span className="text-text-primary font-medium leading-[20px] text-[13px]">
        {text}
      </span>
    </button>
  );
};

export default PrimaryButton;
