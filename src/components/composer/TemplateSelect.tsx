import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Tag, Languages } from 'lucide-react';

interface TemplateSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

interface Template {
  id: string;
  title: string;
  content: string;
  tags: string[];
  language: string;
}

const templates: Template[] = [
  {
    id: 'special-dish',
    title: 'Nuevo Plato Especial',
    content: 'Se ha añadido un nuevo plato especial al menú: {dish_name}. Precio: {price}. Ingredientes principales: {ingredients}.',
    tags: ['menu', 'especial', 'cocina'],
    language: 'ES'
  },
  {
    id: 'happy-hour',
    title: 'Happy Hour Alert',
    content: 'Happy hour begins in {minutes} minutes! All drinks {discount}% off.',
    tags: ['bar', 'promocion', 'bebidas'],
    language: 'EN'
  },
  {
    id: 'large-party',
    title: 'Reserva Grupo Grande',
    content: 'Grupo de {party_size} personas llega a las {time}. Mesa {table_number} preparada.',
    tags: ['reservas', 'sala', 'grupo'],
    language: 'ES'
  },
  {
    id: 'closing-time',
    title: 'Cierre del Local',
    content: 'Recordatorio: El local cierra en {minutes} minutos. Completar servicios pendientes.',
    tags: ['cierre', 'general', 'horario'],
    language: 'ES'
  }
];

export const TemplateSelect: React.FC<TemplateSelectProps> = ({ value, onValueChange }) => {
  const [search, setSearch] = useState('');
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const selectedTemplate = templates.find(template => template.id === value);
  
  const filteredTemplates = templates.filter(template => 
    template.title.toLowerCase().includes(search.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-3">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccionar template..." />
        </SelectTrigger>
        <SelectContent className="w-[400px]">
          {/* Search */}
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8"
              />
            </div>
          </div>

          {/* Templates */}
          <div className="max-h-64 overflow-auto">
            {filteredTemplates.map((template) => (
              <SelectItem 
                key={template.id} 
                value={template.id}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                <div className="flex items-start gap-3 w-full">
                  <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{template.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {template.language}
                      </Badge>
                      <div className="flex gap-1">
                        {template.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Preview on hover */}
                    {hoveredTemplate === template.id && (
                      <div className="mt-2 p-2 bg-muted/50 rounded text-xs text-muted-foreground border">
                        {template.content.length > 100 
                          ? `${template.content.substring(0, 100)}...`
                          : template.content
                        }
                      </div>
                    )}
                  </div>
                </div>
              </SelectItem>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No se encontraron templates
            </div>
          )}
        </SelectContent>
      </Select>

      {/* Selected Template Info */}
      {selectedTemplate && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs gap-1">
              <Languages className="h-3 w-3" />
              {selectedTemplate.language}
            </Badge>
            <div className="flex gap-1">
              {selectedTemplate.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground p-2 bg-muted/30 rounded border">
            <strong>Vista previa:</strong> {selectedTemplate.content}
          </div>
        </div>
      )}
    </div>
  );
};