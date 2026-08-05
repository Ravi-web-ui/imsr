"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  text: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  variant?: "primary" | "secondary" | "accent" | "dark" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
  noColorChange?: boolean;
  noIconRotate?: boolean;
}

export default function Button({
  text,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  noColorChange = false,
  noIconRotate = false,
}: ButtonProps) {
  // Styles mapping based on variants
  const variantStyles = {
    primary: {
      bg: "bg-[#00629f] text-white border-transparent",
      hoverBg: "#00937e", // Teal/green fill on hover
    },
    secondary: {
      bg: "bg-[#00bcda] text-white border-transparent",
      hoverBg: "#00937e", // Teal/green fill on hover
    },
    accent: {
      bg: "bg-[#e1523d] text-white border-transparent",
      hoverBg: "#00629f", // Deep blue fill on hover
    },
    dark: {
      bg: "bg-[#111111] text-white border-transparent",
      hoverBg: "#e1523d", // Orange fill on hover
    },
    outline: {
      bg: "bg-transparent text-zinc-800 border-zinc-350 hover:text-white hover:border-transparent",
      hoverBg: "#00937e", // Teal/green fill on hover
    },
  };

  const currentVariant = variantStyles[variant];

  // Only include btn-fill-effect if color change is allowed
  const buttonClasses = `
    ${noColorChange ? "" : "btn-fill-effect"} group inline-flex items-center justify-center 
    h-[45px] px-7 rounded-full border font-sans font-light text-[18px] 
    transition-all duration-[350ms] ease-out shadow-sm select-none active:scale-[0.98]
    ${currentVariant.bg} ${className}
  `.trim();

  const inlineStyle = {
    "--btn-hover-bg": noColorChange ? "transparent" : currentVariant.hoverBg,
  } as React.CSSProperties;

  const content = (
    <div className="relative z-10 flex items-center justify-center w-full h-full overflow-hidden">
      {/* Button Text */}
      <span className="transition-colors duration-[350ms] whitespace-nowrap">
        {text}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses} style={inlineStyle} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClasses} style={inlineStyle} onClick={onClick}>
      {content}
    </button>
  );
}
