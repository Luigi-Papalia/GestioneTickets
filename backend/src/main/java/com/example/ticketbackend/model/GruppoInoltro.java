package com.example.ticketbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "GruppoInoltro")
public class GruppoInoltro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String gruppo;
    
    public GruppoInoltro() {}
    
    public GruppoInoltro(String gruppo) {
        this.gruppo = gruppo;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getGruppo() {
        return gruppo;
    }
    
    public void setGruppo(String gruppo) {
        this.gruppo = gruppo;
    }
}

