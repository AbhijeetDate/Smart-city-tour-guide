
import React, { useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { City } from '@/types';
import { CITIES } from '@/data/mockData';

interface CitySelectorProps {
  onCitySelect: (city: City) => void;
  selectedCity?: City;
}

const CitySelector: React.FC<CitySelectorProps> = ({ onCitySelect, selectedCity }) => {
  const [open, setOpen] = useState(false);
  const cities = CITIES;

  return (
    <div className="w-full max-w-md mx-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-2 rounded-xl bg-white"
          >
            {selectedCity ? (
              <div className="flex items-center gap-2">
                <span className="text-base text-gray-800">{selectedCity.name}</span>
                <span className="text-sm text-gray-500">{selectedCity.state}</span>
              </div>
            ) : (
              <span className="text-gray-500 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Select a city to explore
              </span>
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Search cities..." className="h-9" />
            <CommandList>
              <CommandEmpty>No city found.</CommandEmpty>
              <CommandGroup>
                {cities.map((city) => (
                  <CommandItem
                    key={city.id}
                    onSelect={() => {
                      onCitySelect(city);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50"
                  >
                    <div className="flex items-center">
                      <div className="ml-2">
                        <p className="text-sm font-medium">{city.name}</p>
                        <p className="text-xs text-gray-500">{city.state}</p>
                      </div>
                    </div>
                    {selectedCity?.id === city.id && (
                      <Check className="h-4 w-4 text-india-green" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CitySelector;
