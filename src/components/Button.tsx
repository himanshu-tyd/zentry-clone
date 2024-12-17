import React from "react";

interface buttonProps {
  id: string;
  title: string;
  rightIcon?: React.ReactElement;
  leftIcon?: React.ReactElement;
  containerClass?: string;
}

const Button = ({
  title,
  id,
  rightIcon,
  leftIcon,
  containerClass,
}: buttonProps) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black ${containerClass} `}
      >
      <span>{leftIcon}</span>
      <span className="relative incline-flex overlfow-hidden font-general text-xs uppercase ">
        <div>{title}</div>
      </span>
      <span>{rightIcon}</span>
    </button>
  );
};

export default Button;
