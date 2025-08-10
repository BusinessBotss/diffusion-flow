import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BroadcastComposer } from '@/components/composer/BroadcastComposer';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Composer</h1>
        <p className="text-muted-foreground">
          Crea y envía difusiones a los equipos del restaurante
        </p>
      </div>
      
      <BroadcastComposer />
    </div>
  );
};

export default Home;