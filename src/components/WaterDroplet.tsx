import { useEffect, useRef } from 'react';

export default function WaterDroplet() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="relative w-[300px] h-[400px] overflow-hidden">
      {/* SVG Mask for droplet shape */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="dropletMask">
            <path d="M150 0 C150 0 0 225 0 300 C0 355.23 67.16 400 150 400 C232.84 400 300 355.23 300 300 C300 225 150 0 150 0 Z" />
          </clipPath>
        </defs>
      </svg>
      
      {/* Container with droplet shape */}
      <div className="relative w-full h-full" style={{ clipPath: 'url(#dropletMask)' }}>
        {/* Video background */}
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          className="absolute w-full h-full object-cover scale-150"
        >
          <source src="https://ro3water.co.na/wp-content/uploads/2023/08/backvideowater_1.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary/10" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
      </div>
      
      {/* Animated ripple effect */}
      <div className="absolute inset-0" style={{ clipPath: 'url(#dropletMask)' }}>
        <div className="absolute inset-0 animate-ripple border-4 border-white/20 rounded-full scale-0" />
        <div className="absolute inset-0 animate-ripple border-4 border-white/20 rounded-full scale-0 animation-delay-1000" />
      </div>
    </div>
  );
}
