package com.example.ticketbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "LavoratoDa")
public class LavoratoDa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String nome;
    
    public LavoratoDa() {}
    
    public LavoratoDa(String nome) {
        this.nome = nome;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
}

