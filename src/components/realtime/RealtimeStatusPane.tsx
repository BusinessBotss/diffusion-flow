import React from 'react';
import { Clock, CheckCircle, XCircle, RotateCcw, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StatusEvent {
  id: string;
  type: 'sending' | 'delivered' | 'error' | 'retry';
  message: string;
  timestamp: Date;
  location?: string;
}

const mockEvents: StatusEvent[] = [
  {
    id: '1',
    type: 'delivered',
    message: 'Broadcast sent to Kitchen staff',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    location: 'Main Kitchen'
  },
  {
    id: '2',
    type: 'sending',
    message: 'Sending to Bar team...',
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
    location: 'Bar Area'
  },
  {
    id: '3',
    type: 'error',
    message: 'Failed to reach Hall staff',
    timestamp: new Date(Date.now() - 30 * 1000),
    location: 'Main Hall'
  }
];

const getStatusIcon = (type: StatusEvent['type']) => {
  switch (type) {
    case 'sending':
      return <Clock className="h-4 w-4" />;
    case 'delivered':
      return <CheckCircle className="h-4 w-4" />;
    case 'error':
      return <XCircle className="h-4 w-4" />;
    case 'retry':
      return <RotateCcw className="h-4 w-4" />;
  }
};

const getStatusChipClass = (type: StatusEvent['type']) => {
  switch (type) {
    case 'sending':
      return 'status-sending';
    case 'delivered':
      return 'status-delivered';
    case 'error':
      return 'status-error';
    case 'retry':
      return 'status-retry';
  }
};

export const RealtimeStatusPane = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-card-foreground">Estado en Tiempo Real</h3>
        </div>
        
        {/* Status Chips */}
        <div className="flex flex-wrap gap-2">
          <Badge className="status-chip status-sending">
            <Clock className="h-3 w-3 mr-1" />
            Enviando (1)
          </Badge>
          <Badge className="status-chip status-delivered">
            <CheckCircle className="h-3 w-3 mr-1" />
            Entregado (1)
          </Badge>
          <Badge className="status-chip status-error">
            <XCircle className="h-3 w-3 mr-1" />
            Error (1)
          </Badge>
        </div>
      </div>

      {/* Events List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {mockEvents.map((event) => (
            <div 
              key={event.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 transition-micro hover:bg-muted/50"
            >
              <div className={`mt-0.5 ${getStatusChipClass(event.type)}`}>
                {getStatusIcon(event.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground leading-tight">
                  {event.message}
                </p>
                {event.location && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {event.location}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {event.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};