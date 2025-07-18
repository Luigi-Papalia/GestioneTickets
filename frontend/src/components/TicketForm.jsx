import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Alert, AlertDescription } from '@/components/ui/alert.jsx';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    numeroTicket: '',
    dataCreazione: '',
    dataLavorazione: '',
    lavoratoDaId: '',
    priorita: '',
    tipoIncId: '',
    gruppoInoltroId: '',
    note: ''
  });

  const [dropdownData, setDropdownData] = useState({
    lavoratoDa: [],
    tipoInc: [],
    gruppoInoltro: []
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const [lavoratoDaRes, tipoIncRes, gruppoInoltroRes] = await Promise.all([
        fetch('http://localhost:8080/api/lavorato-da'),
        fetch('http://localhost:8080/api/tipo-inc'),
        fetch('http://localhost:8080/api/gruppo-inoltro')
      ]);

      const lavoratoDa = await lavoratoDaRes.json();
      const tipoInc = await tipoIncRes.json();
      const gruppoInoltro = await gruppoInoltroRes.json();

      setDropdownData({ lavoratoDa, tipoInc, gruppoInoltro });
    } catch (error) {
      setMessage({ text: 'Errore nel caricamento dei dati', type: 'error' });
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setMessage({ text: '', type: '' });
  };

  const clearForm = () => {
    setFormData({
      numeroTicket: '',
      dataCreazione: '',
      dataLavorazione: '',
      lavoratoDaId: '',
      priorita: '',
      tipoIncId: '',
      gruppoInoltroId: '',
      note: ''
    });
    setMessage({ text: '', type: '' });
  };

  const validateData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/tickets/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          lavoratoDaId: formData.lavoratoDaId ? parseInt(formData.lavoratoDaId) : null,
          priorita: formData.priorita ? parseInt(formData.priorita) : null,
          tipoIncId: formData.tipoIncId ? parseInt(formData.tipoIncId) : null,
          gruppoInoltroId: formData.gruppoInoltroId ? parseInt(formData.gruppoInoltroId) : null
        }),
      });

      const result = await response.json();
      setMessage({
        text: result.message,
        type: result.valid ? 'success' : 'error'
      });
    } catch (error) {
      setMessage({ text: 'Errore nella validazione', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const submitData = async () => {
    setIsLoading(true);
    try {
      const validationResponse = await fetch("http://localhost:8080/api/tickets/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          lavoratoDaId: formData.lavoratoDaId ? parseInt(formData.lavoratoDaId) : null,
          priorita: formData.priorita ? parseInt(formData.priorita) : null,
          tipoIncId: formData.tipoIncId ? parseInt(formData.tipoIncId) : null,
          gruppoInoltroId: formData.gruppoInoltroId ? parseInt(formData.gruppoInoltroId) : null
        }),
      });

      const validationResult = await validationResponse.json();

      if (!validationResult.valid) {
        setMessage({ text: validationResult.message, type: "error" });
        setIsLoading(false);
        return;
      }

      const response = await fetch("http://localhost:8080/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          lavoratoDaId: formData.lavoratoDaId ? parseInt(formData.lavoratoDaId) : null,
          priorita: formData.priorita ? parseInt(formData.priorita) : null,
          tipoIncId: formData.tipoIncId ? parseInt(formData.tipoIncId) : null,
          gruppoInoltroId: formData.gruppoInoltroId ? parseInt(formData.gruppoInoltroId) : null
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ text: result.message, type: "success" });
        clearForm();
      } else {
        setMessage({ text: result.message, type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Errore nell\'invio dei dati", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Inserimento Ticket</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {message.text && (
          <Alert className={message.type === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
            <div className="flex items-center gap-2">
              {message.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                {message.text}
              </AlertDescription>
            </div>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="numeroTicket">Numero Ticket *</Label>
            <Input
              id="numeroTicket"
              placeholder="INCXXXXXXXXX"
              value={formData.numeroTicket}
              onChange={(e) => handleInputChange('numeroTicket', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priorita">Priorità *</Label>
            <Select value={formData.priorita} onValueChange={(value) => handleInputChange('priorita', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona priorità" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataCreazione">Data Creazione *</Label>
            <Input
              id="dataCreazione"
              type="date"
              value={formData.dataCreazione}
              onChange={(e) => handleInputChange('dataCreazione', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataLavorazione">Data Lavorazione</Label>
            <Input
              id="dataLavorazione"
              type="date"
              value={formData.dataLavorazione}
              onChange={(e) => handleInputChange('dataLavorazione', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lavoratoDa">Lavorato Da</Label>
            <Select value={formData.lavoratoDaId} onValueChange={(value) => handleInputChange('lavoratoDaId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona persona" />
              </SelectTrigger>
              <SelectContent>
                {dropdownData.lavoratoDa.map(item => (
                  <SelectItem key={item.id} value={item.id.toString()}>{item.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipoInc">Tipo INC</Label>
            <Select value={formData.tipoIncId} onValueChange={(value) => handleInputChange('tipoIncId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona tipo" />
              </SelectTrigger>
              <SelectContent>
                {dropdownData.tipoInc.map(item => (
                  <SelectItem key={item.id} value={item.id.toString()}>{item.tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="gruppoInoltro">Gruppo Inoltro</Label>
            <Select value={formData.gruppoInoltroId} onValueChange={(value) => handleInputChange('gruppoInoltroId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona gruppo" />
              </SelectTrigger>
              <SelectContent>
                {dropdownData.gruppoInoltro.map(item => (
                  <SelectItem key={item.id} value={item.id.toString()}>{item.gruppo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              placeholder="Inserisci note aggiuntive..."
              value={formData.note}
              onChange={(e) => handleInputChange('note', e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            onClick={validateData} 
            disabled={isLoading}
            className="flex-1"
            variant="outline"
          >
            {isLoading ? 'Validazione...' : 'Valida Dati'}
          </Button>
          
          <Button 
            onClick={submitData} 
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Invio...' : 'Invia Ticket'}
          </Button>
          
          <Button 
            onClick={clearForm} 
            variant="destructive"
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketForm;

