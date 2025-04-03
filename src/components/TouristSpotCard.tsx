
import React from 'react';
import { TouristSpot } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, IndianRupee, Star } from 'lucide-react';

interface TouristSpotCardProps {
  spot: TouristSpot;
  isSelected: boolean;
  onSelect: (spot: TouristSpot, selected: boolean) => void;
}

const TouristSpotCard: React.FC<TouristSpotCardProps> = ({ 
  spot, 
  isSelected, 
  onSelect 
}) => {
  return (
    <Card className={`overflow-hidden card-hover ${isSelected ? 'ring-2 ring-india-green' : ''}`}>
      <div className="aspect-video w-full relative overflow-hidden">
        <img 
          src={spot.imageUrl} 
          alt={spot.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-white/90 text-gray-800 hover:bg-white/95">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
            {spot.rating.toFixed(1)}
          </Badge>
        </div>
        <div className="absolute top-2 left-2">
          <Badge className={`
            ${spot.category === 'Historical' ? 'bg-amber-100 text-amber-800' :
              spot.category === 'Religious' ? 'bg-purple-100 text-purple-800' :
              spot.category === 'Nature' ? 'bg-green-100 text-green-800' :
              spot.category === 'Beach' ? 'bg-blue-100 text-blue-800' :
              spot.category === 'Museum' ? 'bg-indigo-100 text-indigo-800' :
              spot.category === 'Adventure' ? 'bg-red-100 text-red-800' :
              spot.category === 'Cultural' ? 'bg-pink-100 text-pink-800' :
              spot.category === 'Shopping' ? 'bg-violet-100 text-violet-800' :
              spot.category === 'Food' ? 'bg-orange-100 text-orange-800' :
              'bg-gray-100 text-gray-800'
            }
          `}>
            {spot.category}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pt-4 pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{spot.name}</span>
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => onSelect(spot, checked as boolean)}
            className="h-5 w-5 border-2 data-[state=checked]:bg-india-green data-[state=checked]:text-white"
          />
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {spot.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3 pt-0">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center text-gray-700">
            <IndianRupee className="h-4 w-4 mr-2" />
            <span>
              {spot.ticketPrice === 0 ? (
                <span className="text-india-green font-medium">Free Entry</span>
              ) : (
                <span>₹{spot.ticketPrice} per person</span>
              )}
            </span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Clock className="h-4 w-4 mr-2" />
            <span>
              {spot.openingTime} - {spot.closingTime} | ~{spot.averageTimeSpent} hrs visit
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <div className="w-full flex justify-between items-center">
          <div className="text-xs text-gray-500">
            {spot.reviews.length} reviews
          </div>
          <div>
            <button 
              className="text-xs text-india-blue hover:text-india-green transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Future implementation for detailed view
              }}
            >
              View details
            </button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TouristSpotCard;
