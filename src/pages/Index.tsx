
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CITIES, getCities } from '@/data/mockData';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CitySelector from '@/components/CitySelector';
import CityCard from '@/components/CityCard';
import { City } from '@/types';
import { Button } from '@/components/ui/button';
import { MapPin, Star, User } from 'lucide-react';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);
  const navigate = useNavigate();
  const cities = getCities();
  
  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };
  
  const handleExploreClick = () => {
    if (selectedCity) {
      navigate(`/explore?city=${selectedCity.id}`);
    }
  };
  
  const topCities = cities.sort((a, b) => b.popularity - a.popularity).slice(0, 6);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Discover Your Perfect Indian Adventure</h2>
            <p className="text-gray-600">
              Select a city to start planning your journey through India's most beautiful and culturally rich destinations.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mb-12">
            <CitySelector onCitySelect={handleCitySelect} selectedCity={selectedCity} />
            
            {selectedCity && (
              <div className="mt-6 flex justify-center">
                <Button 
                  onClick={handleExploreClick}
                  className="bg-india-green hover:bg-india-green/90 text-white rounded-full px-8 py-2"
                >
                  Explore {selectedCity.name}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Top Destinations in India</h2>
              <p className="text-gray-600">Explore the most popular cities loved by travelers from around the world</p>
            </div>
            <Button asChild variant="link" className="text-india-blue hover:text-india-green transition-colors">
              <a href="/explore">View All Destinations →</a>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topCities.map((city) => (
              <CityCard 
                key={city.id} 
                city={city} 
                onClick={() => navigate(`/explore?city=${city.id}`)} 
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-india-saffron/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Choose IndiaTourScribe?</h2>
            <p className="text-gray-600">
              We make exploring India simple, personalized, and memorable with our smart planning tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-india-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-india-saffron" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Optimized Routes</h3>
              <p className="text-gray-600">
                Our smart algorithm creates the most efficient route to visit all your selected attractions, saving you time and energy.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-india-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-india-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Plans</h3>
              <p className="text-gray-600">
                Create custom itineraries based on your interests, time constraints, and travel preferences.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-india-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-india-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Authentic Reviews</h3>
              <p className="text-gray-600">
                Access genuine reviews and ratings from fellow travelers to make informed decisions about your trip.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
