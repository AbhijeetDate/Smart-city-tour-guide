
import React, { useState } from 'react';
import { TripPlan } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, IndianRupee, MapPin, Bed, Utensils } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TripItineraryProps {
  tripPlan: TripPlan;
}

interface DayPlan {
  day: number;
  spots: string[];
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  accommodation?: string;
  costs: {
    transport: number;
    food: number;
    accommodation: number;
    activities: number;
    total: number;
  };
}

const TripItinerary: React.FC<TripItineraryProps> = ({ tripPlan }) => {
  const { spots, totalCost, totalDuration, selectedTravelMode } = tripPlan;
  const [selectedItinerary, setSelectedItinerary] = useState<'1-day' | '3-day' | '7-day'>('1-day');
  
  // Generate optimized day plans based on selection
  const generateDayPlans = (): DayPlan[] => {
    const spotNames = spots.map(spot => spot.name);
    
    // Basic daily plans - this would be more sophisticated in a real app
    const oneDayPlan: DayPlan[] = [
      {
        day: 1,
        spots: spotNames,
        meals: {
          breakfast: "Local breakfast at popular café",
          lunch: "Quick lunch near attractions",
          dinner: "Traditional dinner experience"
        },
        costs: {
          transport: totalCost.transportation,
          food: 800, // Average daily food cost
          accommodation: 0, // No accommodation for 1-day
          activities: totalCost.tickets,
          total: totalCost.transportation + 800 + totalCost.tickets
        }
      }
    ];
    
    // For longer stays, we'd split spots across days
    const threeDayPlan: DayPlan[] = Array.from({ length: 3 }, (_, i) => {
      const daySpots = spotNames.filter((_, index) => index % 3 === i);
      return {
        day: i + 1,
        spots: daySpots,
        meals: {
          breakfast: `Day ${i+1} breakfast at recommended restaurant`,
          lunch: `Day ${i+1} local cuisine lunch`,
          dinner: `Day ${i+1} authentic dinner experience`
        },
        accommodation: i < 2 ? "Hotel/Guesthouse accommodation" : undefined,
        costs: {
          transport: Math.round(totalCost.transportation / 3),
          food: 1200, // More elaborate meals for multi-day
          accommodation: i < 2 ? 2500 : 0, // Hotel costs for nights
          activities: Math.round(totalCost.tickets / 3 * daySpots.length),
          total: Math.round(totalCost.transportation / 3) + 1200 + (i < 2 ? 2500 : 0) + Math.round(totalCost.tickets / 3 * daySpots.length)
        }
      };
    });
    
    const sevenDayPlan: DayPlan[] = Array.from({ length: 7 }, (_, i) => {
      const daySpots = spotNames.filter((_, index) => index % 7 === i);
      return {
        day: i + 1,
        spots: daySpots.length > 0 ? daySpots : ["Free exploration day"],
        meals: {
          breakfast: `Day ${i+1} breakfast option`,
          lunch: `Day ${i+1} recommended lunch`,
          dinner: `Day ${i+1} dinner experience`
        },
        accommodation: i < 6 ? "Recommended accommodation" : undefined,
        costs: {
          transport: Math.round(totalCost.transportation / 7),
          food: 1500, // More varied food options for longer stay
          accommodation: i < 6 ? 2200 : 0, // Hotel costs for nights
          activities: daySpots.length > 0 ? Math.round(totalCost.tickets / 7 * daySpots.length) : 500, // Some activity cost for free days
          total: Math.round(totalCost.transportation / 7) + 1500 + (i < 6 ? 2200 : 0) + (daySpots.length > 0 ? Math.round(totalCost.tickets / 7 * daySpots.length) : 500)
        }
      };
    });
    
    switch(selectedItinerary) {
      case '1-day': return oneDayPlan;
      case '3-day': return threeDayPlan;
      case '7-day': return sevenDayPlan;
      default: return oneDayPlan;
    }
  };
  
  const dayPlans = generateDayPlans();
  const totalItineraryCost = dayPlans.reduce((sum, day) => sum + day.costs.total, 0);
  
  return (
    <div className="space-y-8">
      <Card className="bg-white">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">Trip Summary</CardTitle>
          <div className="flex items-center gap-2">
            <Badge className="bg-india-green text-white font-normal px-3 py-1">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              {Math.floor(totalDuration)} hrs {Math.round((totalDuration % 1) * 60)} mins
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-500 mb-1">Total Ticket Cost</div>
              <div className="text-xl font-semibold flex items-center">
                <IndianRupee className="h-4 w-4 mr-1" />
                {totalCost.tickets}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-500 mb-1">Transport Cost</div>
              <div className="text-xl font-semibold flex items-center">
                <IndianRupee className="h-4 w-4 mr-1" />
                {totalCost.transportation}
              </div>
            </div>
            
            <div className="bg-india-saffron/10 rounded-lg p-4">
              <div className="text-gray-700 mb-1">Total Trip Cost</div>
              <div className="text-xl font-semibold flex items-center text-india-orange">
                <IndianRupee className="h-4 w-4 mr-1" />
                {totalCost.total}
              </div>
            </div>
          </div>
          
          <div className="mt-4 mb-2 flex items-center text-gray-700">
            <span className="text-gray-600 inline-flex items-center mr-3">
              <Badge className="mr-2 bg-gray-200 text-gray-800 border-0">
                <span className="mr-1">{selectedTravelMode.icon}</span>
                {selectedTravelMode.name}
              </Badge>
              mode selected
            </span>
            <span className="text-sm text-gray-500">
              (₹{selectedTravelMode.costPerKm}/km | {selectedTravelMode.speedKmPerHour} km/h)
            </span>
          </div>
        </CardContent>
      </Card>
      
      {/* Itinerary Duration Selector */}
      <div className="bg-white p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Choose Your Itinerary Plan</h3>
        <Tabs value={selectedItinerary} onValueChange={(v) => setSelectedItinerary(v as '1-day' | '3-day' | '7-day')}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="1-day">1 Day Trip</TabsTrigger>
            <TabsTrigger value="3-day">3 Day Trip</TabsTrigger>
            <TabsTrigger value="7-day">7 Day Trip</TabsTrigger>
          </TabsList>
          
          <TabsContent value="1-day">
            <div className="text-gray-600 mb-4">
              <p>Perfect for a quick visit - see the main highlights in one day!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="3-day">
            <div className="text-gray-600 mb-4">
              <p>Explore at a comfortable pace with our 3-day recommended plan.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="7-day">
            <div className="text-gray-600 mb-4">
              <p>Immerse yourself fully with our week-long experience, allowing time to truly appreciate the city.</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="p-3 bg-india-blue/5 rounded-md mb-4">
          <div className="flex justify-between items-center">
            <div className="font-medium">Estimated Total Cost:</div>
            <div className="text-xl font-semibold text-india-blue flex items-center">
              <IndianRupee className="h-4 w-4 mr-1" />
              {totalItineraryCost}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Includes transportation, accommodation, food, and activities
          </div>
        </div>
      </div>
      
      {/* Daily Itinerary Cards */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Your {selectedItinerary} Itinerary</h3>
        
        {dayPlans.map((day) => (
          <Card key={day.day} className="bg-white overflow-hidden">
            <div className="bg-india-green text-white px-4 py-2 font-semibold">
              Day {day.day}
            </div>
            
            <CardContent className="p-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="font-semibold mb-3">Places to Visit</h4>
                  <ul className="space-y-3">
                    {day.spots.map((spot, index) => (
                      <li key={index} className="flex items-start">
                        <Badge className="mt-0.5 mr-2 bg-india-saffron/20 text-india-saffron border-0">
                          {index + 1}
                        </Badge>
                        <div>
                          <div className="font-medium">{spot}</div>
                          <div className="text-sm text-gray-600">
                            Recommended time: {index === 0 ? "Morning" : index === day.spots.length - 1 ? "Evening" : "Afternoon"}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="font-semibold mt-5 mb-3">Meals</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-sm font-medium text-gray-600 mb-1">Breakfast</div>
                      <div>{day.meals.breakfast}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-sm font-medium text-gray-600 mb-1">Lunch</div>
                      <div>{day.meals.lunch}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-sm font-medium text-gray-600 mb-1">Dinner</div>
                      <div>{day.meals.dinner}</div>
                    </div>
                  </div>
                  
                  {day.accommodation && (
                    <>
                      <h4 className="font-semibold mt-5 mb-3">Accommodation</h4>
                      <div className="flex items-start">
                        <Bed className="h-5 w-5 mr-2 text-gray-500" />
                        <div>{day.accommodation}</div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Day {day.day} Expenses</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Transportation</span>
                      </div>
                      <div>₹{day.costs.transport}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Utensils className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Food</span>
                      </div>
                      <div>₹{day.costs.food}</div>
                    </div>
                    {day.costs.accommodation > 0 && (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-2 text-gray-500" />
                          <span>Accommodation</span>
                        </div>
                        <div>₹{day.costs.accommodation}</div>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Activities</span>
                      </div>
                      <div>₹{day.costs.activities}</div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center font-semibold">
                      <div>Total</div>
                      <div>₹{day.costs.total}</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Travel Tips</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Start early to avoid crowds at popular spots</li>
                      <li>• Carry water and stay hydrated</li>
                      <li>• Wear comfortable walking shoes</li>
                      {day.day === 1 && <li>• Consider a local guide for deeper cultural insights</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Original Spot Timeline */}
      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-bold">Detailed Attraction Itinerary</h3>
        
        <div className="relative">
          {/* Timeline connector */}
          <div className="absolute left-4 top-10 bottom-6 w-0.5 bg-gray-200 ml-3"></div>
          
          {spots.map((spot, index) => (
            <div key={spot.id} className="relative mb-6">
              <div className="flex items-start">
                <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center border-2 border-india-green text-india-green relative z-10">
                  {spot.visitOrder}
                </div>
                
                <div className="ml-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex-grow">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold">{spot.name}</h4>
                      <div className="text-gray-600 text-sm">
                        <span className="flex items-center gap-1 mt-1">
                          <Clock className="h-3.5 w-3.5" />
                          Recommended visit: {spot.recommendedTimeToVisit}
                        </span>
                      </div>
                    </div>
                    
                    <Badge className={`mt-2 md:mt-0 w-fit ${
                      spot.category === 'Historical' ? 'bg-amber-100 text-amber-800' :
                      spot.category === 'Religious' ? 'bg-purple-100 text-purple-800' :
                      spot.category === 'Nature' ? 'bg-green-100 text-green-800' :
                      spot.category === 'Beach' ? 'bg-blue-100 text-blue-800' :
                      spot.category === 'Museum' ? 'bg-indigo-100 text-indigo-800' :
                      spot.category === 'Adventure' ? 'bg-red-100 text-red-800' :
                      spot.category === 'Cultural' ? 'bg-pink-100 text-pink-800' :
                      spot.category === 'Shopping' ? 'bg-violet-100 text-violet-800' :
                      spot.category === 'Food' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {spot.category}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2 text-sm">
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-4 w-4 mr-1.5 text-gray-500" />
                      <span>{spot.openingTime} - {spot.closingTime}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-4 w-4 mr-1.5 text-gray-500" />
                      <span>~{spot.averageTimeSpent} hrs visit time</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <IndianRupee className="h-4 w-4 mr-1.5 text-gray-500" />
                      <span>
                        {spot.ticketPrice === 0 ? (
                          <span className="text-india-green">Free Entry</span>
                        ) : (
                          <span>₹{spot.ticketPrice} ticket price</span>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  {/* Show travel to next spot if not the last spot */}
                  {index < spots.length - 1 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-gray-600">
                          <span className="text-base mr-2">{selectedTravelMode.icon}</span>
                          <span className="text-sm">
                            {spot.timeToNextSpot} mins to next spot 
                            <span className="mx-1">•</span>
                            {spot.distanceToNextSpot} km
                          </span>
                        </div>
                        
                        {spot.transportationCostToNext > 0 && (
                          <div className="text-sm text-gray-700 font-medium">
                            ₹{spot.transportationCostToNext}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripItinerary;
