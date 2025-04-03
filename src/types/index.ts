
export interface City {
  id: string;
  name: string;
  state: string;
  description: string;
  imageUrl: string;
  popularity: number;
}

export interface TouristSpot {
  id: string;
  cityId: string;
  name: string;
  description: string;
  imageUrl: string;
  ticketPrice: number;
  openingTime: string;
  closingTime: string;
  averageTimeSpent: number; // in hours
  rating: number;
  reviews: Review[];
  category: SpotCategory;
  location: {
    latitude: number;
    longitude: number;
  };
}

export type SpotCategory = 
  | 'Historical'
  | 'Religious'
  | 'Nature'
  | 'Beach'
  | 'Museum'
  | 'Adventure'
  | 'Cultural'
  | 'Shopping'
  | 'Food'
  | 'Entertainment';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface TravelMode {
  id: string;
  name: 'Walking' | 'Auto' | 'Taxi' | 'Metro' | 'Bus';
  icon: string;
  costPerKm: number;
  speedKmPerHour: number;
}

export interface TripPlan {
  id: string;
  cityId: string;
  spots: TripSpot[];
  totalCost: {
    tickets: number;
    transportation: number;
    total: number;
  };
  totalDuration: number; // in hours
  selectedTravelMode: TravelMode;
}

export interface TripSpot extends TouristSpot {
  visitOrder: number;
  recommendedTimeToVisit: string;
  timeToNextSpot: number; // in minutes
  distanceToNextSpot: number; // in km
  transportationCostToNext: number;
}

export interface DailyItinerary {
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
  travelTips: string[];
}
