package com.example.ticketbackend.controller;

import com.example.ticketbackend.dto.TicketDTO;
import com.example.ticketbackend.model.*;
import com.example.ticketbackend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TicketController {
    
    @Autowired
    private TicketService ticketService;
    
    @PostMapping("/tickets/validate")
    public ResponseEntity<Map<String, Object>> validateTicket(@RequestBody TicketDTO ticketDTO) {
        Map<String, Object> response = new HashMap<>();
        String validationError = ticketService.validateTicket(ticketDTO);
        
        if (validationError != null) {
            response.put("valid", false);
            response.put("message", validationError);
        } else {
            response.put("valid", true);
            response.put("message", "Dati validi");
        }
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/tickets")
    public ResponseEntity<Map<String, Object>> createTicket(@RequestBody TicketDTO ticketDTO) {
        Map<String, Object> response = new HashMap<>();
        String validationError = ticketService.validateTicket(ticketDTO);
        
        if (validationError != null) {
            response.put("success", false);
            response.put("message", validationError);
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            Ticket savedTicket = ticketService.saveTicket(ticketDTO);
            response.put("success", true);
            response.put("message", "Ticket salvato con successo");
            response.put("ticket", savedTicket);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Errore durante il salvataggio: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> getAllTickets() {
        List<Ticket> tickets = ticketService.getAllTickets();
        return ResponseEntity.ok(tickets);
    }
    
    @GetMapping("/lavorato-da")
    public ResponseEntity<List<LavoratoDa>> getAllLavoratoDa() {
        List<LavoratoDa> lavoratoDa = ticketService.getAllLavoratoDa();
        return ResponseEntity.ok(lavoratoDa);
    }
    
    @GetMapping("/tipo-inc")
    public ResponseEntity<List<TipoINC>> getAllTipoINC() {
        List<TipoINC> tipoINC = ticketService.getAllTipoINC();
        return ResponseEntity.ok(tipoINC);
    }
    
    @GetMapping("/gruppo-inoltro")
    public ResponseEntity<List<GruppoInoltro>> getAllGruppoInoltro() {
        List<GruppoInoltro> gruppoInoltro = ticketService.getAllGruppoInoltro();
        return ResponseEntity.ok(gruppoInoltro);
    }
}

