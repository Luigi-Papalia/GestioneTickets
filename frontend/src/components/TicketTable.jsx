import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Alert, AlertDescription } from '@/components/ui/alert.jsx';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/tickets');
      if (!response.ok) {
        throw new Error('Errore nel caricamento dei ticket');
      }
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      setError('Errore nel caricamento dei ticket: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('it-IT');
  };

  const getStatoBadgeVariant = (stato) => {
    switch (stato) {
      case 'Chiuso':
        return 'default';
      case 'Inoltrato':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getPrioritaBadgeVariant = (priorita) => {
    if (priorita >= 4) return 'destructive';
    if (priorita >= 3) return 'default';
    return 'secondary';
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Caricamento ticket...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Lista Ticket</CardTitle>
        <Button onClick={fetchTickets} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Aggiorna
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert className="mb-4 border-red-500 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {tickets.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nessun ticket trovato
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numero Ticket</TableHead>
                  <TableHead>Data Creazione</TableHead>
                  <TableHead>Data Lavorazione</TableHead>
                  <TableHead>Lavorato Da</TableHead>
                  <TableHead>Priorità</TableHead>
                  <TableHead>Tipo INC</TableHead>
                  <TableHead>Gruppo Inoltro</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.numeroTicket}>
                    <TableCell className="font-medium">
                      {ticket.numeroTicket}
                    </TableCell>
                    <TableCell>{formatDate(ticket.dataCreazione)}</TableCell>
                    <TableCell>{formatDate(ticket.dataLavorazione)}</TableCell>
                    <TableCell>
                      {ticket.lavoratoDa ? ticket.lavoratoDa.nome : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPrioritaBadgeVariant(ticket.priorita)}>
                        {ticket.priorita}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {ticket.tipoInc ? ticket.tipoInc.tipo : '-'}
                    </TableCell>
                    <TableCell>
                      {ticket.gruppoInoltro ? ticket.gruppoInoltro.gruppo : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatoBadgeVariant(ticket.stato)}>
                        {ticket.stato}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={ticket.note}>
                        {ticket.note || '-'}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketTable;

