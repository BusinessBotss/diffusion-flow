import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, ChefHat, Wine, Utensils, Shield } from 'lucide-react';

interface RoleSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const roles = [
  { 
    id: 'chef', 
    name: 'Chef', 
    synonyms: ['Kitchen', 'Cocina', 'Cocinero'], 
    icon: ChefHat,
    color: 'text-orange-600'
  },
  { 
    id: 'bar', 
    name: 'Bar', 
    synonyms: ['Bartender', 'Barman', 'Bebidas'], 
    icon: Wine,
    color: 'text-purple-600'
  },
  { 
    id: 'sala', 
    name: 'Sala', 
    synonyms: ['Waiter', 'Camarero', 'Servicio'], 
    icon: Utensils,
    color: 'text-blue-600'
  },
  { 
    id: 'admin', 
    name: 'Admin', 
    synonyms: ['Manager', 'Gerente', 'Administración'], 
    icon: Shield,
    color: 'text-green-600'
  },
];

export const RoleSelect: React.FC<RoleSelectProps> = ({ value, onValueChange }) => {
  const selectedRole = roles.find(role => role.id === value);

  return (
    <div className="space-y-3">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccionar rol..." />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <SelectItem key={role.id} value={role.id}>
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${role.color}`} />
                  <div>
                    <div className="font-medium">{role.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {role.synonyms.join(', ')}
                    </div>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {/* Selected Role Info */}
      {selectedRole && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs gap-1">
            <selectedRole.icon className="h-3 w-3" />
            {selectedRole.name}
          </Badge>
          <span className="text-xs text-muted-foreground">
            También conocido como: {selectedRole.synonyms.join(', ')}
          </span>
        </div>
      )}
    </div>
  );
};