// app/components/ClickableWrapper.tsx
"use client";

import { useRouter } from "next/navigation";
import { ReactNode, MouseEvent } from "react";

interface ClickableWrapperProps {
  children: ReactNode;
  href: string;
   className?: string; 
}

export default function ClickableWrapper({ children, href,className }: ClickableWrapperProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    // Prevents text selection clicks or child links from behaving strangely
    e.preventDefault();
    router.push(href);
  };

  return (
    <div 
      onClick={handleClick} 
      className={className}
      style={{ cursor: "pointer" }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          router.push(href);
        }
      }}
    >
      {children}
    </div>
  );
}
