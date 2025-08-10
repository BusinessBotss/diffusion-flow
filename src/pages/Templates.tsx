import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Copy, FileText, Search, Tag } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  content: string;
  tags: string[];
  language: string;
  lastUsed?: Date;
}

const Templates = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const mockTemplates: Template[] = [
    {
      id: '1',
      title: 'Nuevo Plato Especial',
      content: 'Se ha añadido un nuevo plato especial al menú: {dish_name}. Precio: {price}. Ingredientes principales: {ingredients}.',
      tags: ['menu', 'especial', 'cocina'],
      language: 'ES',
      lastUsed: new Date('2024-01-10')
    },
    {
      id: '2',
      title: 'Happy Hour Alert',
      content: 'Happy hour begins in {minutes} minutes! All drinks {discount}% off.',
      tags: ['bar', 'promocion', 'bebidas'],
      language: 'EN',
      lastUsed: new Date('2024-01-09')
    },
    {
      id: '3',
      title: 'Reserva Grupo Grande',
      content: 'Grupo de {party_size} personas llega a las {time}. Mesa {table_number} preparada.',
      tags: ['reservas', 'sala', 'grupo'],
      language: 'ES'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Templates</h1>
          <p className="text-muted-foreground">
            Gestiona plantillas reutilizables para tus difusiones
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" placeholder="Nombre del template..." />
              </div>
              <div>
                <Label htmlFor="content">Contenido</Label>
                <Textarea 
                  id="content" 
                  placeholder="Contenido del mensaje... Usa {variable} para placeholders"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="menu, especial, cocina (separados por comas)" />
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setIsDialogOpen(false)}>
                  Crear Template
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="card-shadow">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar templates..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Tag className="h-4 w-4" />
              Filtrar por Tags
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTemplates.map((template) => (
          <Card key={template.id} className="card-shadow transition-micro hover:card-shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {template.language}
                    </Badge>
                    {template.lastUsed && (
                      <span className="text-xs text-muted-foreground">
                        Usado {template.lastUsed.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {template.content}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 gap-2">
                  <Edit className="h-3 w-3" />
                  Editar
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Copy className="h-3 w-3" />
                  Duplicar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Templates;