"use client";

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Clock, Gift, ChevronRight, Music, Pause, Cake, Calendar, Heart, PartyPopper } from 'lucide-react';

export default function BirthdayCard() {
  const [activeSection, setActiveSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Preparing something special...");
  
  // Funny loading messages
  const loadingMessages = [
    "Collecting virtual confetti...",
    "Wrapping digital gifts...",
    "Baking pixel cake...",
    "Finding the perfect GIF...",
    "Inflating party balloons...",
    "Writing sincere apology...",
    "Calculating how late this gift is...",
    "Making excuses for tardiness...",
    "Dusting off birthday candles...",
    "Setting up surprise...",
  ];
  
  interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showMessage, setShowMessage] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showApology, setShowApology] = useState(false);
  const [bounceEffect, setBounceEffect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFunFacts, setShowFunFacts] = useState(false);
  
  const sections = [
    {
      title: "Special Day",
      subtitle: "Celebrating a remarkable journey",
      icon: <Cake size={20} />
    },
    {
      title: "Gallery",
      subtitle: "Moments to cherish",
      icon: <Heart size={20} />
    },
    {
      title: "Wishes",
      subtitle: "For your future",
      icon: <PartyPopper size={20} />
    }
  ];
  
  const funnyWishes = [
    "May your life be as sweet as cake, but with fewer calories!",
    "May your coffee always be hot and your WiFi signal strong!",
    "May your selfies always be flattering and your notifications exciting!",
    "May your birthday be as special as finding a parking spot right in front of the building!"
  ];
  
  const sincereWishes = [
    "May your journey be filled with success and joy",
    "May you continue to inspire everyone around you",
    "May your dreams turn into achievements",
    "May this year bring you happiness beyond measure"
  ];
  
  const funFacts = [
    "Did you know? If you were born on a different planet, you'd have a completely different age!",
    "Fun fact: The 'Happy Birthday' song was first published in 1893, and is one of the most recognized songs in the world!",
    "Birthday tip: Make a wish before blowing out candles, but don't tell anyone or it won't come true!",
    "Birthday science: Celebrating birthdays releases endorphins that make you happier all year long!",
    "Birthday trivia: The world's largest birthday cake weighed over 58,000 pounds!"
  ];
  
  // Loading screen simulation
  useEffect(() => {
    let progress = 0;
    let messageIndex = 0;
    
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += Math.random() * 10;
        progress = Math.min(progress, 100);
        setLoadingProgress(Math.floor(progress));
        
        // Change loading message occasionally
        if (progress > messageIndex * 10) {
          setLoadingMessage(loadingMessages[messageIndex % loadingMessages.length]);
          messageIndex++;
        }
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          setShowMessage(true);
        }, 500);
      }
    }, 400);
    
    return () => clearInterval(interval);
  }, []);
  
  // Mouse movement effect - using less aggressive parallax for mobile
  useEffect(() => {
    interface MousePosition {
      x: number;
      y: number;
    }

    const handleMouseMove = (e: MouseEvent): void => {
      // Reduced parallax effect strength
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) - 0.5, 
        y: (e.clientY / window.innerHeight) - 0.5 
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Birthday countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      // Set birthday date - example: May 15
      const birthday = new Date(new Date().getFullYear(), 4, 17).getTime();
      const now = new Date().getTime();
      let difference = birthday - now;
      
      // If birthday has passed this year, set for next year
      if (difference < 0) {
        difference = new Date(new Date().getFullYear() + 1, 4, 15).getTime() - now;
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Reveal gift animation
  const revealGift = () => {
    setShowGift(true);
    // Start bounce effect
    setBounceEffect(true);
    setTimeout(() => setBounceEffect(false), 1000);
    
    // Show confetti - but fewer particles
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };
  
  // Toggle fun facts
  const toggleFunFacts = () => {
    setShowFunFacts(!showFunFacts);
  };
  
  // Audio controls (simulated)
  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
  };
  
  // Toggle apology message
  const toggleApology = () => {
    setShowApology(!showApology);
  };
  
  // Parallax effect values based on mouse position - reduced strength for mobile
const getParallaxStyle = (depth = 1) => {
  // Kurangi multiplier dari 10 ke 2 agar lebih halus dan tidak terlalu jauh
  return {
    transform: `translate(${mousePosition.x * depth * 2}px, ${mousePosition.y * depth * 2}px)`
  };
};

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
        {/* Fun loading animation */}
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <Cake size={64} className="text-pink-400 animate-pulse" />
          </div>
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="40" 
                fill="none" 
                stroke="#0f172a" 
                strokeWidth="8"
              />
              <circle 
                cx="50" cy="50" r="40" 
                fill="none" 
                stroke="#38bdf8" 
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * loadingProgress / 100)}
                transform="rotate(-90 50 50)"
                className="transition-all duration-300 ease-out"
              />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xl font-bold">{loadingProgress}%</span>
          </div>
        </div>
        
        <div className="text-center px-6 max-w-xs">
          <h3 className="text-blue-400 font-light animate-bounce mb-2">BIRTHDAY LOADING</h3>
          <p className="text-gray-300 text-sm h-8">{loadingMessage}</p>
        </div>
        
        {/* Reduced loading animation elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 15}s linear infinite`
              }}
            >
              {i % 3 === 0 ? (
                <Cake size={Math.random() * 20 + 10} className="text-pink-400" />
              ) : i % 3 === 1 ? (
                <Gift size={Math.random() * 20 + 10} className="text-blue-400" />
              ) : (
                <PartyPopper size={Math.random() * 20 + 10} className="text-yellow-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex justify-center items-center">
      {/* Background with subtle parallax */}
      <div 
        className="absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, #1a1a2e 0%, #16213e 50%, #0f172a 100%)",
          transform: `scale(1.05) translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`
        }}
      ></div>
      
      {/* Subtle particle effects - reduced for mobile */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 15}s linear infinite`
            }}
          ></div>
        ))}
      </div>
      
      {/* Reduced floating birthday elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-white/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`,
              animation: `float ${Math.random() * 20 + 25}s linear infinite`
            }}
          >
            {i % 4 === 0 ? (
              <Cake size={40} />
            ) : i % 4 === 1 ? (
              <Gift size={40} />
            ) : i % 4 === 2 ? (
              <PartyPopper size={40} />
            ) : (
              <span className="text-4xl">🎂</span>
            )}
          </div>
        ))}
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent z-0"></div>
      
      {/* Main content container */}
      <div className="relative z-10 w-full max-w-4xl h-full flex">
        {/* Side navigation */}
        <div className="w-16 md:w-24 h-full flex flex-col justify-center items-center border-r border-white/10">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div 
                key={index}
                onClick={() => setActiveSection(index)}
                className={`cursor-pointer transition-all duration-300 ${
                  activeSection === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-1 h-12 ${
                      activeSection === index ? 'bg-gradient-to-b from-pink-400 to-blue-500' : 'bg-white/20'
                    }`}
                  ></div>
                  <div 
                    className={`rounded-full p-2 mb-1 ${
                      activeSection === index ? 'bg-gradient-to-r from-pink-400 to-blue-500 text-white' : 'bg-white/5 text-white/50'
                    }`}
                  >
                    {section.icon}
                  </div>
                  <div className="text-xs mt-1 writing-vertical transform -rotate-90 origin-center whitespace-nowrap font-light tracking-widest">
                    {section.title.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Content area */}
        <div className="flex-1 h-full overflow-hidden">
          {/* Animated sections */}
          <div 
            className="h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateY(-${activeSection * 100}%)` }}
          >
            {/* Section 1: Birthday Greeting */}
            <section className="h-full w-full flex flex-col items-center justify-center px-6 relative">
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(56,189,248,0.1) 40%, rgba(0,0,0,0) 70%)",
                  ...getParallaxStyle(0.2)
                }}
              ></div>
              
              <div className="text-center max-w-lg z-10">
                <div className="mb-6 opacity-0 animate-fade-in flex justify-center items-center" style={{ animationDelay: "0.3s" }}>
                  <Cake size={24} className="text-pink-400 mr-2 animate-bounce" />
                  <h3 className="text-pink-400 font-light tracking-widest">
                    {showMessage && "HAPPY BIRTHDAY"}
                  </h3>
                  <Cake size={24} className="text-pink-400 ml-2 animate-bounce" style={{ animationDelay: "0.5s" }} />
                </div>
                
                <h1 
                  className="text-5xl md:text-7xl font-extralight text-white mb-6 opacity-0 animate-fade-in"
                  style={{ animationDelay: "0.8s" }}
                >
                  {showMessage && (
                    <span>
                      Salwa
                      <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500">
                        May Hanifah
                      </span>
                      <span className="block text-2xl mt-2 text-pink-300">🎂 Selamat Ulang Tahun! 🎂</span>
                    </span>
                  )}
                </h1>
                
                <p 
                  className="text-gray-300 font-light leading-relaxed mb-8 opacity-0 animate-fade-in"
                  style={{ animationDelay: "1.1s" }}
                >
                  {showMessage && "Celebrating the remarkable journey of an extraordinary person. May your day be as beautiful as the light you bring to those around you!"}
                </p>
                
                {/* Late apology button */}
                <div 
                  className="mb-8 opacity-0 animate-fade-in"
                  style={{ animationDelay: "1.3s" }}
                >
                  {showMessage && (
                    <button
                      onClick={toggleApology}
                      className="px-4 py-2 bg-pink-500/20 border border-pink-500/30 rounded-full text-sm font-medium text-white hover:bg-pink-500/30 transition-all duration-300"
                    >
                      <span className="animate-pulse">Click for an important message...</span>
                    </button>
                  )}
                </div>
                
                {/* Apology message */}
                {showApology && (
                  <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-pink-500/20 animate-bounce-once">
                    <h4 className="text-pink-400 mb-2 font-medium">Sorry I'm Late!</h4>
                    <p className="text-white/80 text-sm">
                      Maaf ya aku telat banget ngasih kadonya! 🙏 
                      Better late than never, right? Semoga masih bisa bikin kamu senyum!
                    </p>
                  </div>
                )}
                
                {showMessage && (
                  <div className="flex justify-center space-x-6 text-center opacity-0 animate-fade-in" style={{ animationDelay: "1.4s" }}>
                    <div>
                      <div className="text-3xl font-light text-white">{timeLeft.days}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Days</div>
                    </div>
                    <div>
                      <div className="text-3xl font-light text-white">{timeLeft.hours}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Hours</div>
                    </div>
                    <div>
                      <div className="text-3xl font-light text-white">{timeLeft.minutes}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Minutes</div>
                    </div>
                    <div>
                      <div className="text-3xl font-light text-white">{timeLeft.seconds}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Seconds</div>
                    </div>
                  </div>
                )}
                
                <div 
                  className="mt-12 opacity-0 animate-fade-in flex justify-center"
                  style={{ animationDelay: "1.7s" }}
                >
                  {showMessage && (
                    <button
                      onClick={() => setActiveSection(1)}
                      className="px-6 py-3 bg-gradient-to-r from-pink-400 to-blue-500 rounded-full text-sm font-medium text-white flex items-center space-x-2 hover:from-pink-500 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-pink-900/50 hover:shadow-pink-800/50"
                    >
                      <span>Explore</span>
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="absolute bottom-8 right-8 flex space-x-3">
                <button 
                  onClick={toggleAudio}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 hover:border-white/40 text-white/70 hover:text-white transition-all duration-300"
                >
                  {audioPlaying ? <Pause size={16} /> : <Music size={16} />}
                </button>
                <div className="text-xs text-white/40 flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
              
              <div 
                className="absolute bottom-6 left-6 text-xs text-white/30"
                style={getParallaxStyle(0.1)}
              >
                <PartyPopper size={16} className="inline mr-1 text-pink-400/50" />
                <span>A special celebration</span>
              </div>
            </section>
            
            {/* Section 2: Gallery */}
            <section className="h-full w-full flex flex-col items-center justify-center px-6 relative">
              <h2 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500 mb-2">
                Gallery
              </h2>
              <p className="text-gray-400 text-sm mb-8 text-center max-w-md">
                Beautiful moments captured in time (and some funny ones too!)
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="aspect-square overflow-hidden rounded-lg group relative cursor-pointer"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <img 
                      src={`/${i + 1}.jpg`} 
                      alt="Memory" 
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <span className="text-white font-light tracking-wider text-sm">
                        {i % 2 === 0 ? `Sweet Memory ${i + 1}` : `memorable moment ${i + 1}`}
                      </span>
                    </div>
                    {/* Simplified photo labels - no emoji overlays */}
                    <div className="absolute -rotate-12 top-4 right-4 bg-pink-500/70 px-3 py-1 rounded-sm text-xs text-white shadow-lg z-10">
                      {['Memories!', 'Great!', 'Good times!', 'Awesome day!', 'Champion moment!', 'Miss you!'][i]}
                    </div>
                  </div>
                ))}
              </div>
              
              <div 
                className="absolute bottom-6 left-6 text-xs text-white/30"
                style={getParallaxStyle(0.1)}
              >
                <Heart size={16} className="inline mr-1 text-pink-400/50" />
                <span>Memories to treasure forever</span>
              </div>
            </section>
            
            {/* Section 3: Wishes */}
            <section className="h-full w-full flex flex-col items-center justify-center px-6 relative">
              <h2 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500 mb-2">
                Birthday Wishes
              </h2>

              
              <div className="max-w-xl w-full space-y-4 mb-10">
                {/* Funny wishes */}
                <div className="flex flex-col space-y-4 mb-4">
                  <h3 className="text-center text-pink-400 text-sm font-medium">Funny Wishes 😄</h3>
                  {funnyWishes.map((wish, i) => (
                    <div 
                      key={i}
                      className="bg-white/5 backdrop-blur-sm border border-pink-500/10 rounded-lg p-4 transform transition-all duration-500 hover:border-pink-500/30 hover:bg-pink-500/5"
                    >
                      <p className="text-gray-300 font-light">{wish}</p>
                    </div>
                  ))}
                </div>
                
                {/* Sincere wishes */}
                <div className="flex flex-col space-y-4">
                  <h3 className="text-center text-blue-400 text-sm font-medium">Heartfelt Wishes ❤️</h3>
                  {sincereWishes.map((wish, i) => (
                    <div 
                      key={i}
                      className="bg-white/5 backdrop-blur-sm border border-blue-500/10 rounded-lg p-4 transform transition-all duration-500 hover:border-blue-500/30 hover:bg-blue-500/5"
                    >
                      <p className="text-gray-300 font-light">{wish}</p>
                    </div>
                  ))}
                </div>
              </div>
              
           <div
  className={`fixed top-1/2 right-6 z-40 transform -translate-y-1/2 transition-all duration-500 cursor-pointer ${bounceEffect ? 'animate-bounce-once' : ''}`}
  style={{
    filter: showGift ? 'drop-shadow(0 0 16px #f472b6)' : 'drop-shadow(0 0 8px #f472b6)',
    animation: 'float-static 3s ease-in-out infinite',
  }}
  onClick={revealGift}
  title="Open Your Gift!"
>
  <Gift size={56} className="text-pink-400 bg-white/10 rounded-full p-3 shadow-lg" />
              </div>
              
              <div 
                className="absolute bottom-6 left-6 text-xs text-white/30"
                style={getParallaxStyle(0.1)}
              >
                <Sparkles size={16} className="inline mr-1 text-pink-400/50" />
                                <Sparkles size={16} className="inline mr-1 text-pink-400/50" />
                <span>Wishing you all the best!</span>
              </div>
            </section>
           <div
  className={`fixed top-1/2 right-6 z-40 transform -translate-y-1/2 transition-all duration-500 cursor-pointer ${bounceEffect ? 'animate-bounce-once' : ''}`}
  style={{
    filter: showGift ? 'drop-shadow(0 0 16px #f472b6)' : 'drop-shadow(0 0 8px #f472b6)',
    animation: 'float-static 3s ease-in-out infinite',
  }}
  onClick={revealGift}
  title="Open Your Gift!"
>
  
</div>

{showGift && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="relative bg-gradient-to-br from-pink-500/20 to-blue-400/20 backdrop-blur-sm rounded-xl border border-white/10 p-8 w-[320px] text-center animate-fade-in">
      <Sparkles size={32} className="mx-auto mb-3 text-pink-400" />
      <h3 className="text-white font-bold mb-2">Surprise!</h3>
      <p className="text-white font-light mb-2">
        A special surprise is waiting for you in the real world!
      </p>
      <p className="text-white/60 text-sm mb-4">
        (And sorry again for being so late with it! ): 
      </p>

      <button
        onClick={() => setShowGift(false)}
        className="mt-4 px-4 py-2 bg-pink-400/80 rounded-full text-white font-medium hover:bg-pink-500 transition"
      >
        Close
      </button>
    </div>
  </div>
)}
          </div>
        </div>
      </div>
      {/* Custom styles for vertical writing and confetti animation */}

<style jsx>{`
  .writing-vertical {
    writing-mode: vertical-rl;
  }
  @keyframes float-static {
    0%, 100% { transform: translateY(0) scale(1);}
    50% { transform: translateY(-12px) scale(1.05);}
  }
  @keyframes confetti {
    0% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg);}
    100% { opacity: 0; transform: translateY(120px) scale(0.7) rotate(360deg);}
  }
  .animate-bounce-once {
    animation: bounce 1s;
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0);}
    50% { transform: translateY(-20px);}
  }
  .animate-fade-in {
    animation: fadeIn 1s forwards;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
`}</style>
    </div>
  );
}