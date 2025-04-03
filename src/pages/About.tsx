
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1598413741029-da46ec437a33?q=80&w=2071" 
            alt="About India Tourism" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            About IndiaTourScribe
          </h1>
          <p className="text-white/90 max-w-2xl">
            Our mission and story behind creating the ultimate travel companion for India
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            <p className="text-gray-600">
              At IndiaTourScribe, we believe that exploring India should be an enriching, hassle-free experience for every traveler. Our mission is to simplify travel planning while ensuring that visitors get to experience the authentic beauty, culture, and heritage of India.
            </p>
            <p className="text-gray-600">
              We're dedicated to helping travelers discover the hidden gems, navigate complex logistics, and create memorable journeys through our diverse and culturally rich country.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Our Story</h2>
            <p className="text-gray-600">
              IndiaTourScribe was born from the personal travel experiences of our founders, who recognized the challenges international and domestic tourists face when planning trips across India. 
            </p>
            <p className="text-gray-600">
              After experiencing firsthand the complexities of coordinating visits to multiple attractions, calculating costs, and finding the most efficient routes, they envisioned a platform that would make this process seamless and enjoyable.
            </p>
            <p className="text-gray-600">
              Launched in 2023, our platform combines local expertise with innovative technology to create personalized travel experiences that showcase the best of what India has to offer.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">What Sets Us Apart</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-india-saffron">Local Expertise</h3>
                <p className="text-gray-600">
                  Our team consists of travel enthusiasts from across India who bring authentic local knowledge to every recommendation and itinerary.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-india-blue">Smart Planning</h3>
                <p className="text-gray-600">
                  Our proprietary algorithm optimizes routes, calculates accurate costs, and suggests the best timing for each attraction.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-india-green">Comprehensive Information</h3>
                <p className="text-gray-600">
                  We provide detailed, up-to-date information about attractions, including ticket prices, opening hours, and traveler reviews.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-india-orange">Personalization</h3>
                <p className="text-gray-600">
                  Every traveler is unique, and our platform allows for customized itineraries based on individual preferences and interests.
                </p>
              </div>
            </div>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Our Vision for the Future</h2>
            <p className="text-gray-600">
              We're constantly working to enhance the IndiaTourScribe experience. Our roadmap includes expanding our coverage to more remote destinations, integrating real-time weather and crowd data, and developing mobile applications for on-the-go planning.
            </p>
            <p className="text-gray-600">
              We're also committed to supporting sustainable tourism practices and contributing to the local communities that make India such a special destination.
            </p>
          </section>
        </div>
      </div>
      
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Join Us on This Journey</h2>
          <p className="text-gray-600 mb-8">
            Whether you're planning your first trip to India or you're a seasoned traveler looking to explore new regions, IndiaTourScribe is here to help you create unforgettable experiences.
          </p>
          <a href="/explore" className="inline-block bg-india-saffron hover:bg-india-orange text-white font-medium px-6 py-3 rounded-full transition-colors">
            Start Planning Your Journey
          </a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
