package com.test.rms.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.rms.dto.ReservationDTO;
import com.test.rms.dto.TableDTO;
import com.test.rms.model.Reservation;
import com.test.rms.model.Tablee;
import com.test.rms.repo.ReservationRepository;
import com.test.rms.repo.TableRepository;

import jakarta.transaction.Transactional;

@Service
public class ReservationService {
	@Autowired
    private ReservationRepository reservationRepository;
	@Autowired
    private TableRepository tableRepository;
	@Autowired
    private ModelMapper modelMapper;

    public List<ReservationDTO> getAllReservationDTOs() {
        List<Reservation> reservations = reservationRepository.findAll();
        return reservations.stream()
                .map(reservation ->{
                	List<Tablee> tables =  tableRepository.findByReservation(reservation);
                	ReservationDTO dto = modelMapper.map(reservation, ReservationDTO.class);
                	if(tables != null && !tables.isEmpty()) {
                		for (Tablee table : tables) {
                			dto.getTables().add(modelMapper.map(table, TableDTO.class));
						}
                	}
                	return dto;
                })
                .collect(Collectors.toList());
    }
    
    
    public ReservationDTO createReservation(ReservationDTO reservationDTO) {
        Reservation reservation = modelMapper.map(reservationDTO, Reservation.class);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate dateTime = LocalDate.parse(reservationDTO.getReservationDate(), formatter);
        reservation.setReservationDate(dateTime);
        reservation.setTables(null);
        Reservation createdReservation = reservationRepository.save(reservation);
        if(reservationDTO.getTables() != null && !reservationDTO.getTables().isEmpty()) {
        	reservationDTO.getTables().forEach(table->{
        		Optional<Tablee> tableeObj = tableRepository.findById(table.getId());
        		if(tableeObj.isPresent()) {
        			Tablee tablee = tableeObj.get();
        			tablee.setAvailability(false);
        			tablee.setReservation(createdReservation);
        			tableRepository.save(tablee);
        		}
        		
        	});
        }
        return modelMapper.map(createdReservation, ReservationDTO.class);
    }

    public ReservationDTO updateReservation(Long id, ReservationDTO reservationDTO) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isPresent()) {
            Reservation reservation = optionalReservation.get();
            reservation.setCustomerName(reservationDTO.getCustomerName());
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateTime = LocalDate.parse(reservationDTO.getReservationDate(), formatter);
            reservation.setReservationDate(dateTime);
            Reservation updatedReservation = reservationRepository.save(reservation);
            return modelMapper.map(updatedReservation, ReservationDTO.class);
        } else {
            return null;
        }
    }
    
    @Transactional
    public boolean deleteReservation(Long id) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isPresent()) {
        	List<Tablee> tables = tableRepository.findByReservation(optionalReservation.get());
        	if(tables != null && !tables.isEmpty()) {
        		for (Tablee tablee : tables) {
					tablee.setAvailability(true);
					tablee.setReservation(null);
				}
        		tableRepository.saveAll(tables);
        	}
            reservationRepository.delete(optionalReservation.get());
            return true;
        } else {
            return false;
        }
    }
    
}

