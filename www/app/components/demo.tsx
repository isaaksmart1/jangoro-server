import { useEffect, useRef, useState } from "react";
import demoVideo from "../assets/video/jgo-demo.mp4";

export default function Demo() {
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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto text-center">
          <p className="p-6 font-bold text-4xl">How it works</p>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-8">
          <video
            className="mx-auto w-80 rounded-2xl border-4 border-jgo-primary" // Center the video
            playsInline
            autoPlay // Autoplay the video on load
            loop // Loop the video
            controls
          >
            <source src={demoVideo} type="video/mp4" />
            {/* Add additional source elements for other video formats if needed */}
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
