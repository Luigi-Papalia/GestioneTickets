package com.example.ticketbackend.repository;

import com.example.ticketbackend.model.GruppoInoltro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GruppoInoltroRepository extends JpaRepository<GruppoInoltro, Long> {
}

