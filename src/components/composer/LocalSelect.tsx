import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock } from 'lucide-react';

interface LocalSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const locations = [
  { id: 'main-kitchen', name: 'Main Kitchen', type: 'kitchen', isFavorite: true },
  { id: 'prep-kitchen', name: 'Prep Kitchen', type: 'kitchen', isFavorite: false },
  { id: 'bar-area', name: 'Bar Area', type: 'bar', isFavorite: true },
  { id: 'main-hall', name: 'Main Hall', type: 'dining', isFavorite: false },
  { id: 'private-room', name: 'Private Room', type: 'dining', isFavorite: false },
  { id: 'office', name: 'Office', type: 'admin', isFavorite: false },
];

const recentLocations = ['main-kitchen', 'bar-area'];

export const LocalSelect: React.FC<LocalSelectProps> = ({ value, onValueChange }) => {
  const selectedLocation = locations.find(loc => loc.id === value);

  return (
    <div className="space-y-3">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccionar local..." />
        </SelectTrigger>
        <SelectContent>
          {/* Favorites */}
          <div className="p-2">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
              <Star className="h-3 w-3" />
              Favoritos
            </div>
            {locations
              .filter(loc => loc.isFavorite)
              .map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {location.name}
                  </div>
                </SelectItem>
              ))}
          </div>

          {/* Recent */}
          {recentLocations.length > 0 && (
            <div className="p-2 border-t">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
                <Clock className="h-3 w-3" />
                Recientes
              </div>
              {locations
                .filter(loc => recentLocations.includes(loc.id) && !loc.isFavorite)
                .map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {location.name}
                    </div>
                  </SelectItem>
                ))}
            </div>
          )}

          {/* All Locations */}
          <div className="p-2 border-t">
            <div className="text-xs font-medium text-muted-foreground mb-2">
              Todos los locales
            </div>
            {locations
              .filter(loc => !loc.isFavorite && !recentLocations.includes(loc.id))
              .map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {location.name}
                  </div>
                </SelectItem>
              ))}
          </div>
        </SelectContent>
      </Select>

      {/* Selected Location Info */}
      {selectedLocation && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {selectedLocation.type}
          </Badge>
          {selectedLocation.isFavorite && (
            <Badge variant="secondary" className="text-xs gap-1">
              <Star className="h-3 w-3" />
              Favorito
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};