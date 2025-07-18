package com.example.ticketbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "TipoINC")
public class TipoINC {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String tipo;
    
    public TipoINC() {}
    
    public TipoINC(String tipo) {
        this.tipo = tipo;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTipo() {
        return tipo;
    }
    
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}

