import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Search, Filter, MoreHorizontal } from 'lucide-react';

const History = () => {
  const mockHistory = [
    {
      id: '1',
      timestamp: '2024-01-10 14:30',
      location: 'Main Kitchen',
      role: 'Chef',
      message: 'New special dish added to menu',
      status: 'delivered',
      recipients: 3
    },
    {
      id: '2',
      timestamp: '2024-01-10 13:15',
      location: 'Bar Area',
      role: 'Bar',
      message: 'Happy hour starts in 15 minutes',
      status: 'delivered',
      recipients: 2
    },
    {
      id: '3',
      timestamp: '2024-01-10 12:45',
      location: 'Main Hall',
      role: 'Sala',
      message: 'Large group arriving at 7 PM',
      status: 'error',
      recipients: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="status-chip status-delivered">Entregado</Badge>;
      case 'error':
        return <Badge className="status-chip status-error">Error</Badge>;
      default:
        return <Badge className="status-chip status-sending">Enviando</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Historial</h1>
        <p className="text-muted-foreground">
          Revisa todas las difusiones enviadas
        </p>
      </div>

      {/* Filters */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar mensaje..." 
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Local" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kitchen">Main Kitchen</SelectItem>
                <SelectItem value="bar">Bar Area</SelectItem>
                <SelectItem value="hall">Main Hall</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chef">Chef</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="sala">Sala</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delivered">Entregado</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="sending">Enviando</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Difusiones Recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Mensaje</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Destinatarios</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHistory.map((item) => (
                <TableRow key={item.id} className="transition-micro hover:bg-muted/30">
                  <TableCell className="font-mono text-sm">
                    {item.timestamp}
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item.message}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(item.status)}
                  </TableCell>
                  <TableCell>{item.recipients}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;