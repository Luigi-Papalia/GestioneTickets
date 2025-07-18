package com.example.ticketbackend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Ticket")
public class Ticket {
    @Id
    @Column(name = "numero_ticket", length = 20)
    private String numeroTicket;
    
    @Column(name = "data_creazione", nullable = false)
    private LocalDate dataCreazione;
    
    @Column(name = "data_lavorazione")
    private LocalDate dataLavorazione;
    
    @ManyToOne
    @JoinColumn(name = "lavorato_da_id")
    private LavoratoDa lavoratoDa;
    
    @Column(nullable = false)
    private Integer priorita;
    
    @ManyToOne
    @JoinColumn(name = "tipo_inc_id")
    private TipoINC tipoInc;
    
    @ManyToOne
    @JoinColumn(name = "gruppo_inoltro_id")
    private GruppoInoltro gruppoInoltro;
    
    @Column(nullable = false, length = 50)
    private String stato;
    
    @Column(columnDefinition = "TEXT")
    private String note;
    
    public Ticket() {}
    
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
    
    public LavoratoDa getLavoratoDa() {
        return lavoratoDa;
    }
    
    public void setLavoratoDa(LavoratoDa lavoratoDa) {
        this.lavoratoDa = lavoratoDa;
    }
    
    public Integer getPriorita() {
        return priorita;
    }
    
    public void setPriorita(Integer priorita) {
        this.priorita = priorita;
    }
    
    public TipoINC getTipoInc() {
        return tipoInc;
    }
    
    public void setTipoInc(TipoINC tipoInc) {
        this.tipoInc = tipoInc;
    }
    
    public GruppoInoltro getGruppoInoltro() {
        return gruppoInoltro;
    }
    
    public void setGruppoInoltro(GruppoInoltro gruppoInoltro) {
        this.gruppoInoltro = gruppoInoltro;
    }
    
    public String getStato() {
        return stato;
    }
    
    public void setStato(String stato) {
        this.stato = stato;
    }
    
    public String getNote() {
        return note;
    }
    
    public void setNote(String note) {
        this.note = note;
    }
}

