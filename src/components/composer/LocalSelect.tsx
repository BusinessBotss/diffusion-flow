import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock } from 'lucide-react';

interface LocalSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const locations = [
  { id: 'r1', name: 'Tokyo Sushi Bar', city: 'Madrid', type: 'japonés', isFavorite: true },
  { id: 'r2', name: 'Dragon Wok Madrid', city: 'Madrid', type: 'chino', isFavorite: true },
  { id: 'r3', name: 'Lotus Garden Barcelona', city: 'Barcelona', type: 'asiático', isFavorite: true },
  { id: 'r4', name: 'Golden Panda Valencia', city: 'Valencia', type: 'chino', isFavorite: false },
  { id: 'r5', name: 'Sakura Lounge Bilbao', city: 'Bilbao', type: 'japonés', isFavorite: false },
  { id: 'r6', name: 'Bamboo House Sevilla', city: 'Sevilla', type: 'asiático', isFavorite: false },
  { id: 'r7', name: 'Red Lantern Málaga', city: 'Málaga', type: 'chino', isFavorite: false },
  { id: 'r8', name: 'Zen Garden Zaragoza', city: 'Zaragoza', type: 'japonés', isFavorite: true },
  { id: 'r9', name: 'Imperial Palace Alicante', city: 'Alicante', type: 'chino', isFavorite: false },
  { id: 'r10', name: 'Thai Orchid Murcia', city: 'Murcia', type: 'tailandés', isFavorite: false },
  { id: 'r11', name: 'Shanghai Express Palma', city: 'Palma', type: 'chino', isFavorite: false },
  { id: 'r12', name: 'Kyoto House Granada', city: 'Granada', type: 'japonés', isFavorite: false },
  { id: 'r13', name: 'Silk Road Toledo', city: 'Toledo', type: 'asiático', isFavorite: false },
  { id: 'r14', name: 'Mandala Kitchen León', city: 'León', type: 'indio', isFavorite: false },
  { id: 'r15', name: 'Ocean Pearl Santander', city: 'Santander', type: 'asiático', isFavorite: false },
];

const recentLocations = ['r1', 'r3', 'r8'];

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
                   <div className="flex items-center justify-between w-full">
                     <div className="flex items-center gap-2">
                       <MapPin className="h-4 w-4" />
                       <div>
                         <div className="font-medium">{location.name}</div>
                         <div className="text-xs text-muted-foreground">{location.city}</div>
                       </div>
                     </div>
                     <Badge variant="outline" className="text-xs">{location.type}</Badge>
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
                   <div className="flex items-center justify-between w-full">
                     <div className="flex items-center gap-2">
                       <MapPin className="h-4 w-4" />
                       <div>
                         <div className="font-medium">{location.name}</div>
                         <div className="text-xs text-muted-foreground">{location.city}</div>
                       </div>
                     </div>
                     <Badge variant="outline" className="text-xs">{location.type}</Badge>
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
                   <div className="flex items-center justify-between w-full">
                     <div className="flex items-center gap-2">
                       <MapPin className="h-4 w-4" />
                       <div>
                         <div className="font-medium">{location.name}</div>
                         <div className="text-xs text-muted-foreground">{location.city}</div>
                       </div>
                     </div>
                     <Badge variant="outline" className="text-xs">{location.type}</Badge>
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