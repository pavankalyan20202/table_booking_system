package com.test.rms.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.rms.model.Reservation;
import com.test.rms.model.Tablee;


@Repository
public interface TableRepository extends JpaRepository<Tablee, Long> {
	Tablee findByTableName(String name);

	List<Tablee> findByAvailability(boolean available);
	
	List<Tablee> findByReservation(Reservation reservation);
}

