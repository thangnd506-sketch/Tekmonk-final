
export enum Region {
  NORTH = 'North',
  CENTRAL = 'Central',
  SOUTH = 'South'
}

export type Language = 'vi' | 'en';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface NearbyFood {
  name: string;
  dish: string;
  image?: string;
  rating: number;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  rating: number;
  category: 'History' | 'Nature' | 'Food' | 'Entertainment';
  goldenHours?: string;
  goldenHourReason?: string;
  bestYearTime?: string;
  travelNotes?: string[];
  nearbyRestaurants?: { name: string; dish: string; rating: number }[];
  nearbyAttractions?: { name: string; distance: string; significance: string }[];
  activities?: string[];
}

export interface Place {
  id: string;
  name: string;
  region: Region;
  description: string;
  lat: number;
  lng: number;
  zoom: number;
  image: string;
  rating: number;
  attractions: Attraction[];
  specialties: string[];
  bestTime: string;
}

export interface Food {
  id: string;
  name: string;
  region: Region;
  image: string;
  description: string;
  priceRange: string;
  type: 'Street Food' | 'Restaurant' | 'Fine Dining';
  tags: string[];
  recommendedPlaces: { name: string; address: string; phone?: string; link?: string }[];
}

export interface ItineraryDay {
  day: number;
  activities: {
    time: string;
    description: string;
    location: string;
    cost: number;
    publicTransport?: string; // Thông tin tuyến xe/bus
  }[];
}

export interface TripPlan {
  itinerary: ItineraryDay[];
  flightCost: number;
  hotelCost: number;
  totalBudget: number;
  tips: string[];
}
