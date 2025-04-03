
import React, { useState } from 'react';
import { TouristSpot, TravelMode, TripPlan } from '@/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateTripPlan, getTravelModes } from '@/data/mockData';
import TouristSpotCard from './TouristSpotCard';
import TripItinerary from './TripItinerary';
import { toast } from 'sonner';

interface TripPlannerSectionProps {
  cityId: string;
  spots: TouristSpot[];
}

const TripPlannerSection: React.FC<TripPlannerSectionProps> = ({ cityId, spots }) => {
  const [selectedSpots, setSelectedSpots] = useState<TouristSpot[]>([]);
  const [selectedTravelMode, setSelectedTravelMode] = useState<TravelMode>(getTravelModes()[0]);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [activeTab, setActiveTab] = useState('spots');
  
  const travelModes = getTravelModes();
  
  const handleSpotSelect = (spot: TouristSpot, selected: boolean) => {
    if (selected) {
      setSelectedSpots([...selectedSpots, spot]);
    } else {
      setSelectedSpots(selectedSpots.filter(s => s.id !== spot.id));
    }
  };
  
  const handlePlanTrip = () => {
    if (selectedSpots.length === 0) {
      toast.error("Please select at least one tourist spot to plan your trip.");
      return;
    }
    
    const plan = generateTripPlan(
      cityId,
      selectedSpots.map(spot => spot.id),
      selectedTravelMode.id
    );
    
    setTripPlan(plan);
    setActiveTab('itinerary');
    
    toast.success(`Trip plan created with ${selectedSpots.length} destinations!`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Plan Your Perfect Trip</h2>
            <p className="text-gray-600 mb-4 sm:mb-0">Select attractions to visit and we'll create an optimized itinerary</p>
          </div>
          
          <TabsList className="bg-gray-100">
            <TabsTrigger value="spots" className="data-[state=active]:bg-white">
              1. Select Spots
            </TabsTrigger>
            <TabsTrigger 
              value="itinerary" 
              className="data-[state=active]:bg-white"
              disabled={!tripPlan}
            >
              2. View Itinerary
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="spots" className="mt-0">
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-medium mb-1">Travel mode:</h3>
                <div className="flex flex-wrap gap-2">
                  {travelModes.map((mode) => (
                    <Button
                      key={mode.id}
                      variant={selectedTravelMode.id === mode.id ? "default" : "outline"}
                      className={`rounded-full ${
                        selectedTravelMode.id === mode.id ? 'bg-india-blue text-white' : 'bg-white'
                      }`}
                      onClick={() => setSelectedTravelMode(mode)}
                    >
                      <span className="mr-1">{mode.icon}</span> {mode.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handlePlanTrip}
                disabled={selectedSpots.length === 0}
                className="bg-india-green hover:bg-india-green/90 text-white rounded-full px-6"
              >
                Plan My Trip ({selectedSpots.length} selected)
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spots.map((spot) => (
              <TouristSpotCard
                key={spot.id}
                spot={spot}
                isSelected={selectedSpots.some(s => s.id === spot.id)}
                onSelect={handleSpotSelect}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="itinerary" className="mt-0">
          {tripPlan ? (
            <TripItinerary tripPlan={tripPlan} />
          ) : (
            <div className="text-center py-12">
              <p>Please select tourist spots and generate a trip plan first.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TripPlannerSection;
