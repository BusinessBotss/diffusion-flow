import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Send, MapPin, Users, FileText } from 'lucide-react';
import { LocalSelect } from './LocalSelect';
import { RoleSelect } from './RoleSelect';
import { TemplateSelect } from './TemplateSelect';
import { useToast } from '@/hooks/use-toast';

interface ComposerData {
  location: string;
  role: string;
  template: string;
  notes: string;
}

export const BroadcastComposer = () => {
  const [data, setData] = useState<ComposerData>({
    location: '',
    role: '',
    template: '',
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generatePreviewCommand = () => {
    if (!data.location || !data.role) return '';
    
    const parts = [
      `SEND_TO: ${data.location}`,
      `ROLE: ${data.role}`,
    ];
    
    if (data.template) {
      parts.push(`TEMPLATE: ${data.template}`);
    }
    
    if (data.notes.trim()) {
      parts.push(`MESSAGE: "${data.notes.trim()}"`);
    }
    
    return parts.join(' | ');
  };

  const handleSend = async () => {
    if (!data.location || !data.role) {
      toast({
        title: "Campos requeridos",
        description: "Debes seleccionar un local y un rol",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Difusión enviada",
        description: `Mensaje enviado a ${data.role} en ${data.location}`,
        className: "bg-success text-success-foreground",
      });
      
      // Reset form
      setData({
        location: '',
        role: '',
        template: '',
        notes: ''
      });
    }, 2000);
  };

  const isValid = data.location && data.role;
  const previewCommand = generatePreviewCommand();

  return (
    <div className="space-y-6">
      {/* Composer Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Location Select */}
        <Card className="card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4 text-accent" />
              Local
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LocalSelect 
              value={data.location}
              onValueChange={(value) => setData(prev => ({ ...prev, location: value }))}
            />
          </CardContent>
        </Card>

        {/* Role Select */}
        <Card className="card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-accent" />
              Rol
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RoleSelect 
              value={data.role}
              onValueChange={(value) => setData(prev => ({ ...prev, role: value }))}
            />
          </CardContent>
        </Card>

        {/* Template Select */}
        <Card className="card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-accent" />
              Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TemplateSelect 
              value={data.template}
              onValueChange={(value) => setData(prev => ({ ...prev, template: value }))}
            />
          </CardContent>
        </Card>
      </div>

      {/* Notes and Send */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Notas Adicionales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="notes" className="flex items-center justify-between">
              <span>Mensaje personalizado</span>
              <span className="text-xs text-muted-foreground">
                {data.notes.length}/240
              </span>
            </Label>
            <Textarea
              id="notes"
              placeholder="Añade información adicional o personaliza el mensaje..."
              value={data.notes}
              onChange={(e) => {
                if (e.target.value.length <= 240) {
                  setData(prev => ({ ...prev, notes: e.target.value }));
                }
              }}
              rows={3}
              className="mt-2 resize-none"
            />
          </div>

          {/* Preview Bar */}
          {previewCommand && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Vista previa del comando</Label>
              <div className="preview-command">
                {previewCommand}
              </div>
            </div>
          )}

          {/* Send Button */}
          <div className="flex justify-end pt-2">
            <Button 
              onClick={handleSend}
              disabled={!isValid || isLoading}
              size="lg"
              className="gap-2 min-w-[140px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Enviar Difusión
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};