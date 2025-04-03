
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCities, getTouristSpotsByCity } from '@/data/mockData';
import { City, TouristSpot } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CitySelector from '@/components/CitySelector';
import TripPlannerSection from '@/components/TripPlannerSection';
import ReviewSection from '@/components/ReviewSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);
  const [spots, setSpots] = useState<TouristSpot[]>([]);
  const [activeTab, setActiveTab] = useState<string>('trip');
  const navigate = useNavigate();
  const toast = useToast();
  
  useEffect(() => {
    const cityId = searchParams.get('city');
    if (cityId) {
      const city = getCities().find(c => c.id === cityId);
      if (city) {
        setSelectedCity(city);
        setSpots(getTouristSpotsByCity(cityId));
      } else {
        // City not found, redirect to home
        toast.toast({
          title: "City not found",
          description: "The selected city could not be found.",
          variant: "destructive",
        });
        navigate('/');
      }
    }
  }, [searchParams, navigate]);
  
  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setSpots(getTouristSpotsByCity(city.id));
    setSearchParams({ city: city.id });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* City Header */}
      <div className="relative h-64 overflow-hidden">
        {selectedCity ? (
          <>
            <div className="absolute inset-0 z-0">
              <img 
                src={selectedCity.imageUrl} 
                alt={selectedCity.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
            </div>
            
            <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Explore {selectedCity.name}
              </h1>
              <p className="text-white/90 max-w-2xl">
                {selectedCity.description}
              </p>
            </div>
          </>
        ) : (
          <div className="bg-gray-200 h-full w-full flex items-center justify-center">
            <h1 className="text-2xl text-gray-500">Select a city to explore</h1>
          </div>
        )}
      </div>
      
      {/* City Selection Area */}
      {!selectedCity && (
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4 text-center">Choose a city to start exploring</h2>
            <CitySelector onCitySelect={handleCitySelect} selectedCity={selectedCity} />
          </div>
        </div>
      )}
      
      {/* City Content */}
      {selectedCity && (
        <div className="flex-grow bg-gray-50">
          {/* City selector in a smaller form */}
          <div className="border-b bg-white">
            <div className="container mx-auto px-4 md:px-6 py-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-medium">Planning your trip to {selectedCity.name}</h2>
                <div className="w-full md:w-auto max-w-xs">
                  <CitySelector onCitySelect={handleCitySelect} selectedCity={selectedCity} />
                </div>
              </div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b bg-white">
              <div className="container mx-auto px-4 md:px-6">
                <TabsList className="w-full max-w-md h-14 bg-transparent border-b-0 justify-start gap-8">
                  <TabsTrigger 
                    value="trip" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-india-saffron data-[state=active]:text-india-saffron data-[state=active]:shadow-none rounded-none px-0 font-medium"
                  >
                    Trip Planner
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-india-saffron data-[state=active]:text-india-saffron data-[state=active]:shadow-none rounded-none px-0 font-medium"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <div className="py-8">
              <TabsContent value="trip" className="mt-0">
                <TripPlannerSection cityId={selectedCity.id} spots={spots} />
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-0">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                  <ReviewSection 
                    spotId={selectedCity.id} 
                    reviews={[]} 
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Explore;
