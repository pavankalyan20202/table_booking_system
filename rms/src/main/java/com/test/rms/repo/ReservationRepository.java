package com.test.rms.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.rms.model.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}

