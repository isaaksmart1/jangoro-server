import { useEffect, useRef, useState } from "react";

export default function Section({
  title,
  description,
  fade = true,
  backgroundColor = "bg-jgo-primary",
  children = <></>,
  customVerticalPadding = "pb-4 pt-8",
  customCSSStyles = "",
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if the section or any child is in view
      let isInView =
        rect.top < viewportHeight * 0.75 && rect.bottom > viewportHeight * 0.25;

      // Check children individually if section itself is not visible
      if (!isInView) {
        for (const child of section.children) {
          const childRect = child.getBoundingClientRect();
          if (
            childRect.top < viewportHeight * 0.75 &&
            childRect.bottom > viewportHeight * 0.25
          ) {
            isInView = true;
            break;
          }
        }
      }

      setIsVisible(isInView);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bgColor = customCSSStyles ? customCSSStyles : 'bg-jgo-primary';
  const fadeSection = `section ${isVisible ? "fade-in" : "fade-out"} ${bgColor}`;
  const section = `section ${bgColor}`;

  return (
    <div ref={sectionRef} className={fade ? fadeSection : section}>
      <div
        className={`relative ${bgColor} md:w-full md:flex lg:flex-col sm:flex-row justify-center ${customVerticalPadding} px-4 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-10 lg:pt-8 overflow-hidden`}
      >

        <div className="mx-auto text-center">
          <h1 className="p-6 font-bold text-4xl text-jgo-accent">{title}</h1>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-8">
          <p className="w-8/12 md:w-1/3 text-center text-white text-2xl">
            {description}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
