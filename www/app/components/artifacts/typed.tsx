import { useState, useEffect } from "react";

const TypedText = ({
  texts,
  typingSpeed = 150,
  backspaceSpeed = 25,
  pause = 500,
  cursorBlinkSpeed = 2000,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorOpacity, setCursorOpacity] = useState(1);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentIndex];
      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1));
      } else {
        setCurrentText((prev) => fullText.slice(0, prev.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const speed = isDeleting ? backspaceSpeed : typingSpeed;
    const typingTimeout = setTimeout(handleTyping, speed);

    return () => clearTimeout(typingTimeout);
  }, [
    currentText,
    isDeleting,
    texts,
    currentIndex,
    typingSpeed,
    backspaceSpeed,
    pause,
  ]);

  useEffect(() => {
    const cursorTimeout = setInterval(() => {
      setCursorOpacity((prev) => (prev === 1 ? 0 : 1));
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorTimeout);
  }, [cursorBlinkSpeed]);

  return (
    <span className="block text-jgo-primary font-bold drop-shadow-md text-5xl">
      {currentText}
      <span
        style={{
          opacity: cursorOpacity,
          transition: `opacity ${cursorBlinkSpeed / 2}ms ease-in-out`,
          marginLeft: 2,
          color: "gold",
        }}
      >
        &#124;
      </span>
    </span>
  );
};

export default TypedText;
