import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import TicketForm from './components/TicketForm.jsx';
import TicketTable from './components/TicketTable.jsx';
import { FileText, Table, Ticket } from 'lucide-react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Ticket className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Sistema Gestione Ticket</h1>
          </div>
          <p className="text-lg text-gray-600">
            Gestisci i tuoi ticket in modo semplice ed efficace
          </p>
        </div>

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Nuovo Ticket
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2">
              <Table className="h-4 w-4" />
              Lista Ticket
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="space-y-4">
            <TicketForm />
          </TabsContent>
          
          <TabsContent value="table" className="space-y-4">
            <TicketTable />
          </TabsContent>
        </Tabs>

        <footer className="text-center mt-12 text-gray-500">
          <p>© 2025 Sistema Gestione Ticket - Sviluppato con React e Spring Boot</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

