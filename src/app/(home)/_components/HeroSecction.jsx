"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { Github, Linkedin, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const TECH_LOGOS = [
  { src: "/animatelgo/WordPress.svg", alt: "WordPress", size: 40 },
  { src: "/animatelgo/react.png", alt: "React", size: 45 },
  { src: "/animatelgo/nodejs-logo-white.png", alt: "Node.js", size: 50 },
  { src: "/animatelgo/mongo.png", alt: "MongoDB", size: 40 },
  { src: "/animatelgo/next.svg", alt: "Next.js", size: 35 },
  { src: "/animatelgo/django.png", alt: "Django", size: 45 },
];

const GREETINGS = ["HELLO!", "NAMASTE!", "Jojolapa!"];
const ROLES = ["Full Stack Developer", "WordPress Developer", "UI/UX Designer"];

const SOCIAL_LINKS = [
  { Icon: Facebook, href: "https://www.facebook.com/biswas.achaju.me/" },
  { Icon: Instagram, href: "https://www.instagram.com/biswas.achaju.me/" },
  { Icon: Github, href: "https://github.com/SumanPoU" },
  { Icon: Twitter, href: "https://x.com/Suman_Ac186" },
];

const CTA_BUTTONS = [
  { text: "Projects", variant: "default", href: "/projects" },
  { text: "Resume", variant: "outline", href: "/Biswas Achaju.pdf", download: true },
];


const FloatingLogo = ({ src, alt, size, initialPosition }) => (
  <motion.div
    className="absolute"
    style={{ top: initialPosition.y, left: initialPosition.x }}
    animate={{
      x: [0, 50, 0],
      y: [0, 50, 0],
      rotate: [0, 360],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear",
    }}
  >
    <Image src={src} alt={alt} width={size} height={size} />
  </motion.div>
);

const TypewriterEffect = ({ texts, className }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentTextIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < text.length) {
            setCurrentText(text.slice(0, currentText.length + 1));
          } else {
            setIsDeleting(true);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(text.slice(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentTextIndex((currentTextIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 150
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts]);

  return <span className={className}>{currentText}</span>;
};

export default function HeroSection() {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const controls = useAnimation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPositions(
        TECH_LOGOS.map(() => ({
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 100),
        }))
      );
    }
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden flex items-center justify-center min-h-screen transition-colors duration-300 bg-background text-foreground"
    >
      {/* Floating Logos */}
      {positions.length > 0 &&
        TECH_LOGOS.map((logo, index) => (
          <FloatingLogo
            key={index}
            {...logo}
            initialPosition={positions[index]}
          />
        ))}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mt-5 md:mt-0 flex flex-col md:flex-row items-center justify-between mx-auto">
          {/* Profile Image */}
          <motion.div
            className="relative mb-8 md:mb-0 md:mr-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden relative glow-effect">
              <div className="absolute inset-0 opacity-50 animate-pulse rounded-full" />
              <Image
                src="/Biswas.jpg"
                alt="Profile"
                width={320}
                height={320}
                className="rounded-full"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="text-center md:text-left max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="font-playpen text-2xl font-bold mb-4 tracking-wider h-12">
              <TypewriterEffect texts={GREETINGS} className="inline-block" />
            </h2>
            <h1 className="font-playpen text-5xl font-bold mb-4 tracking-tight">
              I'm{" "}
              <span className="font-silkscreen text-[#FF014F] bg-clip-text text-transparent bg-gradient-to-r from-[#FF014F] to-[#FF6B6B]">
                SUMAN ACHARYA
              </span>
            </h1>
            <h3 className="font-josefin text-2xl mb-6 font-semibold tracking-wide h-10">
              <TypewriterEffect
                texts={ROLES}
                className="text-orange-500 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500"
              />
            </h3>
            <motion.p
              className="font-josefin text-lg mb-8 leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              I create dynamic and responsive full-stack web applications using
              MongoDB, Express, React, and Node.js, while also specializing in
              WordPress development and UI/UX design.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex space-x-6 mb-8 justify-center md:justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {SOCIAL_LINKS.map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="text-foreground hover:text-[#FF014F] transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-7 h-7" />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex space-x-6 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              {CTA_BUTTONS.map(({ text, variant, href, download }, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href={href} download={download || false}>
                    <Button
                      className={`${
                        variant === "default"
                          ? "bg-gradient-to-r from-[#FF014F] to-[#FF6B6B] text-white"
                          : "border-[#FF014F] text-[#FF014F] hover:bg-[#FF014F] hover:text-white"
                      } px-8 py-3 rounded-full text-lg font-semibold glow-effect`}
                      variant={variant}
                    >
                      {text}
                    </Button>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
