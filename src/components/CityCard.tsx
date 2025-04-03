
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { City } from '@/types';
import { MapPin } from 'lucide-react';

interface CityCardProps {
  city: City;
  onClick: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, onClick }) => {
  return (
    <div 
      className="relative rounded-xl overflow-hidden cursor-pointer card-hover shadow-md group bg-white"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={city.imageUrl} 
          alt={city.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-70"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-semibold leading-tight">{city.name}</h3>
          <div className="flex items-center mt-1 text-sm text-white/80">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{city.state}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {city.description}
        </p>
        
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-india-green/10 text-india-green border-india-green/20">
            {city.popularity.toFixed(1)} Rating
          </Badge>
          <div className="text-xs text-gray-500">
            Explore now →
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
