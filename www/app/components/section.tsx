import { useEffect, useRef, useState } from "react";

export default function Section({
  children,
  title,
  description,
  email,
  emailRef,
  setEmail,
  backgroundColor = "bg-oe-primary",
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 },
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`section ${isVisible ? "fade-in" : "fade-out"}`}
    >
      <div
        className={`relative ${backgroundColor} md:w-full md:flex lg:flex-col sm:flex-row justify-center px-4 pb-4 pt-8 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-10 lg:pt-8`}
      >
        <div className="mx-auto text-center">
          <h1 className="p-6 font-bold text-4xl text-oe-accent">{title}</h1>
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
