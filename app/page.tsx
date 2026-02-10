"use client"
import Image from "next/image";
import { useState, useEffect, useMemo, useRef } from "react";
import confetti from "canvas-confetti";

const phrases = [
  "No", "Are you sure?", "Really sure?", "Pookie pleasee",
  "I'll buy you food <3", "and flowers...", "and cake...",
  "Okay... You sure?", "Sure sure?", "Sure sure sure?",
  "Sure sure sure sure?", "Sure sure sure sure sure?",
  "Sure sure sure sure sure sure?", "Sure sure sure sure sure sure sure?",
  "Change of heart yet?"
]

export default function Home() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 10 + 16;
  const noButtonSize = 16;

  const [showHey, setShowHey] = useState(true);
  const [showValentines, setShowValentines] = useState(false);

// confecti animation

  useEffect(()=>{
    if (yesPressed) {
    
    confetti({
    particleCount: 400,
    spread: 80,
    origin: { y: 0.6 },
  });
  }

  },[yesPressed])


  // Generate 7 balloons
  const balloonConfigs = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => ({
      id: i,
      
      left: `${(i * 14) + 5}%`, 
      
      duration: `${5 + (Math.random() * 1.5)}s`, 
      scale: 0.6 + Math.random() * 0.4,
      rot: `${Math.random() * 20 - 10}deg`,
    }));
  }, []);

  useEffect(() => {
    // Show "Hey" for 2 seconds
    const heyTimer = setTimeout(() => {
      setShowHey(false);
      setShowValentines(true);
    }, 2000);

    // Show "Valentine's" screen for 6 seconds  
    const valentinesTimer = setTimeout(() => {
      setShowValentines(false);
    }, 6500); 

    return () => {
      clearTimeout(heyTimer);
      clearTimeout(valentinesTimer);
    };
  }, []);

  function handleNoClick() {
    setNoCount(noCount + 1);
  }

  return (
    <div className="flex h-screen items-center justify-center font-sans overflow-hidden
      bg-[radial-gradient(ellipse_at_40%_40%,#dd706c_0%,#db4c47_25%,#a82526_100%)]">

      <div className='valentine-container w-full flex flex-col items-center justify-center'>
        
        {/* PHASE 1: HEY */}
        {showHey && (
          <div className='text-center animate-in fade-in zoom-in duration-700'>
            <div className='text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] md:text-[50px] text-[40px]' >
              <strong>Hey</strong>...
              <br></br>
              <strong>Suman </strong>
            </div>
          </div>
        )}

        {/* PHASE 2: BALLOON FLOAT */}
        {showValentines && (
          <div className="relative w-full h-screen overflow-hidden">
          {balloonConfigs.map((config) => (
            <img key={config.id} src="3d-balloon.png" alt="Balloon"
              className="balloon-smooth z-0 w-80 md:w-105 h-auto"
              style={{
                left: config.left,
                '--duration': config.duration,
                '--scale': config.scale,
                '--rot': config.rot,
              } as React.CSSProperties}
            />
          ))}

          
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white text-center px-4 pointer-events-none">
            <h1 className="text-4xl font-bold drop-shadow-2xl">
              Valentine&apos;s is around the corner.
            </h1>
            <p className="text-2xl mt-4 font-semibold opacity-90">
              So I wanted to ask you Something !!
            </p>
          </div>
          </div>
        )}

        {/* PHASE 3: THE QUESTION */}
        {!showHey && !showValentines && (
          <div className="animate-in fade-in zoom-in duration-1000 flex flex-col items-center">
            {yesPressed ?  (
              <div className='flex flex-col items-center'>
                
                <img alt='love hug' className="h-64" src='https://media.tenor.com/8DHkW1uWDHsAAAAj/milk-and-mocha.gif' />
                <div className='text-white drop-shadow-md mt-4 md:text-[40px] text-[20px]' > 
                  <strong>YAYE!!!</strong> ✨🌹🥰❤️💐💝 
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center'>
                <img className='h-48 mb-6' alt='bears with hearts' src='https://media.tenor.com/hpgCwxnBaK8AAAAi/milk-and-mocha.gif' />
                <div className='text-white drop-shadow-md mb-8 md:text-[40px] text-[20px]' > 
                  Will you be my <strong>Valentine?</strong> 🥺 
                </div>
                <div className="flex gap-4 items-center justify-center">
                  <button 
                    className='bg-white text-[#a82526] font-bold px-8 py-2 rounded-full shadow-lg hover:scale-110 transition-transform' 
                    onClick={() => setYesPressed(true)} 
                    style={{ fontSize: `${yesButtonSize}px` }}
                  >
                    Yes
                  </button>
                  <button 
                    className='bg-black/20 text-white border border-white/40 px-4 py-2 rounded-full hover:bg-black/40' 
                    onClick={handleNoClick} 
                    style={{ fontSize: `${noButtonSize}px` }}
                  >
                    {phrases[Math.min(noCount, phrases.length - 1)]}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

