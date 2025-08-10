import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Radio, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Composer', href: '/app' },
  { name: 'History', href: '/history' },
  { name: 'Templates', href: '/templates' },
];

export const AppHeader = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border card-shadow">
      <div className="flex items-center justify-between h-16 px-6">
        
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Radio className="h-6 w-6 text-accent" />
            <h1 className="text-xl font-semibold text-foreground">
              Difusiones GM
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={location.pathname === item.href ? "secondary" : "ghost"}
              className="transition-micro"
            >
              <Link to={item.href}>{item.name}</Link>
            </Button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          
          {/* Language Switcher */}
          <Select defaultValue="es">
            <SelectTrigger className="w-20 h-9">
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">ES</SelectItem>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="zh">ZH</SelectItem>
            </SelectContent>
          </Select>

          {/* User Avatar */}
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-accent text-accent-foreground">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};