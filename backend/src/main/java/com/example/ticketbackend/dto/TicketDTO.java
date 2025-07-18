package com.example.ticketbackend.dto;

import java.time.LocalDate;

public class TicketDTO {
    private String numeroTicket;
    private LocalDate dataCreazione;
    private LocalDate dataLavorazione;
    private Long lavoratoDaId;
    private Integer priorita;
    private Long tipoIncId;
    private Long gruppoInoltroId;
    private String note;
    
    public TicketDTO() {}
    
    public String getNumeroTicket() {
        return numeroTicket;
    }
    
    public void setNumeroTicket(String numeroTicket) {
        this.numeroTicket = numeroTicket;
    }
    
    public LocalDate getDataCreazione() {
        return dataCreazione;
    }
    
    public void setDataCreazione(LocalDate dataCreazione) {
        this.dataCreazione = dataCreazione;
    }
    
    public LocalDate getDataLavorazione() {
        return dataLavorazione;
    }
    
    public void setDataLavorazione(LocalDate dataLavorazione) {
        this.dataLavorazione = dataLavorazione;
    }
    
    public Long getLavoratoDaId() {
        return lavoratoDaId;
    }
    
    public void setLavoratoDaId(Long lavoratoDaId) {
        this.lavoratoDaId = lavoratoDaId;
    }
    
    public Integer getPriorita() {
        return priorita;
    }
    
    public void setPriorita(Integer priorita) {
        this.priorita = priorita;
    }
    
    public Long getTipoIncId() {
        return tipoIncId;
    }
    
    public void setTipoIncId(Long tipoIncId) {
        this.tipoIncId = tipoIncId;
    }
    
    public Long getGruppoInoltroId() {
        return gruppoInoltroId;
    }
    
    public void setGruppoInoltroId(Long gruppoInoltroId) {
        this.gruppoInoltroId = gruppoInoltroId;
    }
    
    public String getNote() {
        return note;
    }
    
    public void setNote(String note) {
        this.note = note;
    }
}

