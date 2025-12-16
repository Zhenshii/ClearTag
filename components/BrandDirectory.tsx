import React, { useState, useMemo } from 'react';
import { BRANDS } from '../constants';
import { Brand } from '../types';

export const BrandDirectory: React.FC = () => {
  const [filterPrice, setFilterPrice] = useState<string>('All');
  const [filterLocation, setFilterLocation] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrands = useMemo(() => {
    return BRANDS.filter((brand) => {
      const matchesPrice = filterPrice === 'All' || brand.priceRange === filterPrice;
      const matchesLocation = filterLocation === 'All' || brand.location.includes(filterLocation);
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            brand.primaryFabrics.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesPrice && matchesLocation && matchesSearch;
    });
  }, [filterPrice, filterLocation, searchTerm]);

  const uniqueLocations = Array.from(new Set(BRANDS.map(b => b.location.split(',')[0].trim())));

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-earth-200">
        <h2 className="text-2xl font-serif text-forest-900 mb-6">Curated Directory</h2>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-earth-800 mb-1">Search Brands or Fabrics</label>
            <input 
              type="text" 
              placeholder="e.g. Cotton, Linen, Brand Name..." 
              className="w-full p-2.5 rounded-lg border border-earth-300 bg-earth-50 focus:ring-2 focus:ring-forest-400 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-earth-800 mb-1">Price</label>
            <select 
              className="w-full p-2.5 rounded-lg border border-earth-300 bg-earth-50 focus:ring-2 focus:ring-forest-400 focus:outline-none"
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
            >
              <option value="All">All Prices</option>
              <option value="$">$ (Budget)</option>
              <option value="$$">$$ (Standard)</option>
              <option value="$$$">$$$ (Premium)</option>
              <option value="$$$$">$$$$ (Luxury)</option>
            </select>
          </div>

          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-earth-800 mb-1">Location</label>
            <select 
              className="w-full p-2.5 rounded-lg border border-earth-300 bg-earth-50 focus:ring-2 focus:ring-forest-400 focus:outline-none"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option value="All">All Locations</option>
              {uniqueLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>

      {filteredBrands.length === 0 && (
        <div className="text-center py-12 text-earth-600">
          <p className="text-lg">No brands found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

const BrandCard: React.FC<{ brand: Brand }> = ({ brand }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-earth-200 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={brand.imageUrl} 
          alt={brand.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-forest-800 shadow-sm">
          {brand.priceRange}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-forest-900">{brand.name}</h3>
        </div>
        
        <p className="text-earth-700 text-sm mb-4 line-clamp-2">{brand.description}</p>
        
        <div className="mt-auto space-y-3">
          <div className="flex flex-wrap gap-2">
            {brand.primaryFabrics.slice(0, 3).map(fabric => (
              <span key={fabric} className="px-2 py-1 bg-forest-50 text-forest-700 text-xs rounded-md">
                {fabric}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-xs text-earth-500 pt-3 border-t border-earth-100">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            {brand.location}
          </div>

          <a 
            href={brand.websiteUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full text-center py-2 bg-forest-800 text-white rounded-lg hover:bg-forest-700 transition-colors text-sm font-medium mt-4"
          >
            Visit Shop
          </a>
        </div>
      </div>
    </div>
  );
};
