import { useEffect, useRef } from 'react';

interface WaterDropletVideoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function WaterDropletVideo({ 
  className = '', 
  width = 300, 
  height = 400 
}: WaterDropletVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div 
      className={`relative overflow-hidden water-droplet ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* SVG Mask for droplet shape */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="dropletPath">
            <path d={`M${width/2} 0 C${width/2} 0 0 ${height*0.6} 0 ${height*0.75} C0 ${height*0.9} ${width*0.22} ${height} ${width/2} ${height} C${width*0.78} ${height} ${width} ${height*0.9} ${width} ${height*0.75} C${width} ${height*0.6} ${width/2} 0 ${width/2} 0 Z`} />
          </clipPath>
        </defs>
      </svg>
      
      {/* Container with droplet shape */}
      <div 
        className="relative w-full h-full group"
        style={{ clipPath: 'url(#dropletPath)' }}
      >
        {/* Video background */}
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          className="absolute w-full h-full object-cover scale-150 group-hover:scale-[1.7] transition-transform duration-[2000ms]"
        >
          <source src="https://ro3water.co.na/wp-content/uploads/2023/08/backvideowater_1.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />
        
        {/* Shine effect */}
        <div className="absolute -inset-full bg-gradient-to-tr from-white/0 via-white/30 to-white/0 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out" />
      </div>
      
      {/* Animated ripple effects */}
      <div 
        className="absolute inset-0" 
        style={{ clipPath: 'url(#dropletPath)' }}
      >
        <div className="absolute inset-0 animate-ripple border-4 border-white/20 rounded-full scale-0" />
        <div className="absolute inset-0 animate-ripple animation-delay-500 border-4 border-white/20 rounded-full scale-0" />
        <div className="absolute inset-0 animate-ripple animation-delay-1000 border-4 border-white/15 rounded-full scale-0" />
      </div>
    </div>
  );
}
