package com.example.ticketbackend.service;

import com.example.ticketbackend.dto.TicketDTO;
import com.example.ticketbackend.model.*;
import com.example.ticketbackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class TicketService {
    
    @Autowired
    private TicketRepository ticketRepository;
    
    @Autowired
    private LavoratoDaRepository lavoratoDaRepository;
    
    @Autowired
    private TipoINCRepository tipoINCRepository;
    
    @Autowired
    private GruppoInoltroRepository gruppoInoltroRepository;
    
    private static final Pattern TICKET_PATTERN = Pattern.compile("^INC\\d{9}$");
    
    public String validateTicket(TicketDTO ticketDTO) {
        if (ticketDTO.getNumeroTicket() == null || !TICKET_PATTERN.matcher(ticketDTO.getNumeroTicket()).matches()) {
            return "Numero ticket deve essere nel formato INCXXXXXXXXX dove X è un numero";
        }
        
        if (ticketDTO.getDataCreazione() == null) {
            return "Data creazione è obbligatoria";
        }
        
        if (ticketDTO.getPriorita() == null || ticketDTO.getPriorita() < 1 || ticketDTO.getPriorita() > 5) {
            return "Priorità deve essere un numero da 1 a 5";
        }
        
        if (ticketDTO.getLavoratoDaId() != null && !lavoratoDaRepository.existsById(ticketDTO.getLavoratoDaId())) {
            return "Lavorato Da non valido";
        }
        
        if (ticketDTO.getTipoIncId() != null && !tipoINCRepository.existsById(ticketDTO.getTipoIncId())) {
            return "Tipo INC non valido";
        }
        
        if (ticketDTO.getGruppoInoltroId() != null && !gruppoInoltroRepository.existsById(ticketDTO.getGruppoInoltroId())) {
            return "Gruppo Inoltro non valido";
        }
        
        return null; // Nessun errore
    }
    
    public Ticket saveTicket(TicketDTO ticketDTO) {
        Ticket ticket = new Ticket();
        ticket.setNumeroTicket(ticketDTO.getNumeroTicket());
        ticket.setDataCreazione(ticketDTO.getDataCreazione());
        ticket.setDataLavorazione(ticketDTO.getDataLavorazione());
        ticket.setPriorita(ticketDTO.getPriorita());
        ticket.setNote(ticketDTO.getNote());
        
        if (ticketDTO.getLavoratoDaId() != null) {
            Optional<LavoratoDa> lavoratoDa = lavoratoDaRepository.findById(ticketDTO.getLavoratoDaId());
            lavoratoDa.ifPresent(ticket::setLavoratoDa);
        }
        
        if (ticketDTO.getTipoIncId() != null) {
            Optional<TipoINC> tipoINC = tipoINCRepository.findById(ticketDTO.getTipoIncId());
            tipoINC.ifPresent(ticket::setTipoInc);
        }
        
        if (ticketDTO.getGruppoInoltroId() != null) {
            Optional<GruppoInoltro> gruppoInoltro = gruppoInoltroRepository.findById(ticketDTO.getGruppoInoltroId());
            gruppoInoltro.ifPresent(ticket::setGruppoInoltro);
        }
        
        // Determina lo stato
        if (ticketDTO.getGruppoInoltroId() == null) {
            ticket.setStato("Chiuso");
        } else {
            ticket.setStato("Inoltrato");
        }
        
        return ticketRepository.save(ticket);
    }
    
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
    
    public List<LavoratoDa> getAllLavoratoDa() {
        return lavoratoDaRepository.findAll();
    }
    
    public List<TipoINC> getAllTipoINC() {
        return tipoINCRepository.findAll();
    }
    
    public List<GruppoInoltro> getAllGruppoInoltro() {
        return gruppoInoltroRepository.findAll();
    }
}

