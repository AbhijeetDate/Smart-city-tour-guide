
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-[85vh] overflow-hidden gradient-overlay">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071" 
          alt="India Tourism" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-2xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Discover the Magic of <span className="text-india-saffron">Incredible India</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Personalized travel experiences through India's most beautiful destinations. 
            Plan your perfect trip with smart recommendations and local insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-india-saffron hover:bg-india-orange text-white font-medium px-6 py-3 rounded-full">
              <Link to="/explore">
                Start Exploring
              </Link>
            </Button>
            <Button variant="outline" asChild className="bg-white/10 border-white text-white hover:bg-white/20 font-medium px-6 py-3 rounded-full">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
