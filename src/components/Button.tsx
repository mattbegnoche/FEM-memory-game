import React from "react";
import style from "./Button.module.css";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "selection" | "big";
}

function Button({ children, variant = "primary" }: ButtonProps) {
  return (
    <button className={clsx(style.button, style[variant])}>{children}</button>
  );
}

export default Button;
