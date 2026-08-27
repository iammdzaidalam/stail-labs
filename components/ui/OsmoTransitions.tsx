"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export function ShutterPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Only desktop
    if (window.innerWidth < 1024) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
        end: "top 20%", 
        scrub: 1,
      }
    });

    tl.to(".shutter-blade", {
      scaleY: 0,
      stagger: 0.1,
      ease: "power3.inOut"
    });
    
    tl.fromTo(".shutter-content", {
      scale: 1.05,
      filter: "blur(4px)"
    }, {
      scale: 1,
      filter: "blur(0px)",
      ease: "power2.out"
    }, "<");
  }, { scope: container });

  return (
    <div ref={container} className={`relative overflow-hidden ${className}`}>
      <div className="shutter-content w-full h-full">
        {children}
      </div>
      <div className="absolute inset-0 z-20 hidden lg:flex pointer-events-none" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="shutter-blade flex-1 bg-bg origin-top" />
        ))}
      </div>
    </div>
  );
}

export function PixelatedImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (window.innerWidth < 1024) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new window.Image();
    img.src = src;
    
    const animationState = { pixelFactor: 0.01 }; 

    function render() {
        if (!ctx || !canvas) return;
        const w = canvas.width * animationState.pixelFactor;
        const h = canvas.height * animationState.pixelFactor;

        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (animationState.pixelFactor > 0.99) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            return;
        }

        if (w > 0 && h > 0) {
            ctx.drawImage(img, 0, 0, w, h);
            ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
        }
    }

    img.onload = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * 2; 
        canvas.height = rect.height * 2;
        render();

        gsap.to(animationState, {
            pixelFactor: 1, 
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
                end: "center center",
                scrub: true
            },
            onUpdate: render 
        });
    };
  }, { scope: containerRef });

  return (
    <>
      {/* Mobile fallback (native image) */}
      <Image src={src} alt={alt} fill className={`lg:hidden ${className}`} quality={85} sizes="(max-width: 1024px) 100vw, 600px" />
      {/* Desktop canvas */}
      <div ref={containerRef} className="hidden lg:block absolute inset-0 z-0">
        <canvas ref={canvasRef} className={`w-full h-full ${className}`} aria-label={alt} />
      </div>
    </>
  );
}
