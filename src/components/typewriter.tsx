"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  initialDelay?: number;
}

export default function Typewriter({
  texts,
  typingSpeed = 60,
  deletingSpeed = 40,
  pauseTime = 3000,
  initialDelay = 3000,
}: TypewriterProps) {
  const [textIndex, setTextIndex] = useState(0);

  // Show first text immediately
  const [displayText, setDisplayText] = useState(texts[0] ?? "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  // Wait before starting the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
      setIsDeleting(true); // Start by deleting the first text
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  useEffect(() => {
    if (!started) return;

    const currentText = texts[textIndex];

    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    started,
    displayText,
    isDeleting,
    textIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}