package com.example.ticketbackend.repository;

import com.example.ticketbackend.model.TipoINC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoINCRepository extends JpaRepository<TipoINC, Long> {
}

