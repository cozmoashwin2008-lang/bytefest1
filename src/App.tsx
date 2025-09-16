import { useState, useEffect, useRef } from "react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <ByteFestLanding />
      <Toaster />
    </div>
  );
}

function ByteFestLanding() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isBitten, setIsBitten] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetDate = new Date('2025-11-18T00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setMousePosition({
          x: (e.clientX - centerX) / 30,
          y: (e.clientY - centerY) / 30
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogoClick = () => {
    setIsBitten(true);
    setTimeout(() => setIsBitten(false), 2000);
  };

  const events = [
    {
      name: "Hackrush",
      description: "Dive into a thrilling gamified hackathon spanning three escalating rounds. Start with 3 timed challenges testing speed and skill; advance by solving efficiently. In the Qualifying Round, tackle tougher problems under pressure. The Final Round unleashes open-ended innovation—choose your language and craft efficient solutions judged by our expert team.",
      icon: "🚀",
      voxelColor: "bg-red-600"
    },
    {
      name: "Circuit Riot",
      description: "Experience an adrenaline-pumping tournament where robots race, navigate mazes, and conquer line-following challenges. Test aerodynamics, physics, and strategy in head-to-head battles that push robotic limits.",
      icon: "🤖",
      voxelColor: "bg-blue-600"
    },
    {
      name: "GameGrid",
      description: "Compete in a high-energy tournament on rented PS5s featuring fan-favorite games like FC25 and Rocket League (subject to change). Show off your skills in a fast-paced, bracket-style competition.",
      icon: "🎮",
      voxelColor: "bg-green-600"
    },
    {
      name: "ByteBooth Pop-up Market",
      description: "Explore a vibrant marketplace where sponsors and students showcase and sell unique merchandise—connecting creativity with community.",
      icon: "🛍️",
      voxelColor: "bg-yellow-600"
    },
    {
      name: "VybeCode",
      description: "Form teams of three to solve real-world problems in just 2 hours using cutting-edge tools like Replit, Lovable, and V0. Innovate under pressure and present impactful solutions that matter.",
      icon: "💡",
      voxelColor: "bg-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 relative overflow-hidden">
      {/* Floating Voxel Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-voxel absolute top-20 left-10 w-8 h-8 bg-orange-500" style={{ animationDelay: '0s' }}></div>
        <div className="floating-voxel absolute top-40 right-20 w-6 h-6 bg-orange-400" style={{ animationDelay: '1s' }}></div>
        <div className="floating-voxel absolute bottom-40 left-20 w-10 h-10 bg-orange-600" style={{ animationDelay: '2s' }}></div>
        <div className="floating-voxel absolute bottom-20 right-10 w-4 h-4 bg-orange-300" style={{ animationDelay: '0.5s' }}></div>
        <div className="floating-voxel absolute top-1/2 left-1/4 w-5 h-5 bg-orange-500" style={{ animationDelay: '1.5s' }}></div>
        <div className="floating-voxel absolute top-1/3 right-1/3 w-7 h-7 bg-orange-400" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* 3D Voxel Logo */}
        <div className="text-center mb-16">
          <div
            ref={logoRef}
            className={`
              voxel-logo cursor-pointer select-none transition-all duration-500 ease-out
              ${isBitten ? 'bitten-state' : ''}
            `}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
            }}
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleLogoClick();
              }
            }}
            aria-label="BYTEFEST Interactive Voxel Logo"
          >
            <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl text-white voxel-text tracking-wider">
              BYTEFEST
            </h1>
            
            {/* Bite Effect Overlay */}
            <div className={`bite-overlay ${isBitten ? 'active' : ''}`}>
              <div className="bite-chunk-voxel"></div>
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-orange-400 font-pixel mt-8 max-w-2xl mx-auto leading-relaxed tracking-wide">
            The Ultimate Tech Fest Experience
          </p>
          <p className="text-sm md:text-base text-orange-300 font-pixel mt-4 tracking-wide">
            by Gems New Millennium School Dubai
          </p>
        </div>

        {/* Voxel Countdown Timer */}
        <div className="voxel-card p-8 mb-16">
          <h2 className="text-xl md:text-2xl font-pixel text-orange-400 text-center mb-8 tracking-wide">
            Event Countdown
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="voxel-timer-card">
                <div className="text-2xl md:text-3xl font-pixel text-white mb-2">
                  {value.toString().padStart(2, '0')}
                </div>
                <div className="text-xs text-orange-300 uppercase tracking-wider font-pixel">
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator-voxel">
          <div className="scroll-arrow-voxel"></div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-pixel text-orange-400 mb-6 tracking-wide">
              Event Highlights
            </h2>
            <div className="w-24 h-2 bg-orange-500 mx-auto voxel-divider"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <div
                key={index}
                className="voxel-event-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className={`voxel-event-icon ${event.voxelColor}`}>
                    <span className="text-xl">{event.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-pixel text-orange-400 mb-4 group-hover:text-orange-300 transition-colors tracking-wide">
                      {event.name}
                    </h3>
                    <p className="text-orange-200 leading-relaxed text-sm md:text-base">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-purple-800 bg-opacity-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-pixel text-orange-400 mb-8 tracking-wide">
            Get in Touch
          </h2>
          <div className="voxel-card p-8">
            <p className="text-base md:text-lg text-orange-200 mb-6 font-pixel tracking-wide">
              Ready to join the ultimate tech fest experience?
            </p>
            <a 
              href="mailto:bytefestgnms@gmail.com"
              className="voxel-contact-button"
            >
              bytefestgnms@gmail.com
            </a>
            <p className="text-orange-300 mt-6 font-pixel text-sm tracking-wide">
              November 18, 2025 • Gems New Millennium School Dubai
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
