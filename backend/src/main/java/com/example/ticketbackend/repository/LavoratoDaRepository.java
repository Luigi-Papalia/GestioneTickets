package com.example.ticketbackend.repository;

import com.example.ticketbackend.model.LavoratoDa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LavoratoDaRepository extends JpaRepository<LavoratoDa, Long> {
}

