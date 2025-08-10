import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { RealtimeStatusPane } from '../realtime/RealtimeStatusPane';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AppLayout = () => {
  const [isStatusPaneOpen, setIsStatusPaneOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 lg:pr-80">
          <div className="p-6">
            <Outlet />
          </div>
        </main>

        {/* Desktop Status Pane */}
        <aside className="hidden lg:block fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 border-l border-border bg-card">
          <RealtimeStatusPane />
        </aside>

        {/* Mobile Status Pane */}
        <div className="lg:hidden">
          <Sheet open={isStatusPaneOpen} onOpenChange={setIsStatusPaneOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="fixed bottom-6 right-6 z-50 card-shadow-lg"
              >
                <Activity className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <RealtimeStatusPane />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};