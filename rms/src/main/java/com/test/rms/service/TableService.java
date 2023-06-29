package com.test.rms.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.rms.dto.TableDTO;
import com.test.rms.model.Reservation;
import com.test.rms.model.Tablee;
import com.test.rms.repo.TableRepository;

@Service
public class TableService {
	
	@Autowired
    private TableRepository tableRepository;
	@Autowired
    private ModelMapper modelMapper;

    public List<TableDTO> getAllTableDTOs() {
        List<Tablee> tables = tableRepository.findAll();
        return tables.stream()
                .map(table -> modelMapper.map(table, TableDTO.class))
          
                
                .collect(Collectors.toList());
    }
    
    public TableDTO createTable(TableDTO tableDTO) {
    	Tablee exisitngTable = tableRepository.findByTableName(tableDTO.getTableName());
    	if(exisitngTable != null) {
    		return null;
    	} else {
    		Tablee table = modelMapper.map(tableDTO, Tablee.class);
            Tablee createdTable = tableRepository.save(table);
            return modelMapper.map(createdTable, TableDTO.class);
    	}
        
    }

    public TableDTO updateTable(Long id, TableDTO tableDTO) {
        Optional<Tablee> optionalTable = tableRepository.findById(id);
        if (optionalTable.isPresent()) {
            Tablee table = optionalTable.get();
            table.setTableName(tableDTO.getTableName());
            table.setCapacity(tableDTO.getCapacity());
            table.setAvailability(tableDTO.isAvailability());
            table.setReservation(modelMapper.map(tableDTO.getReservationDTO(), Reservation.class));
            Tablee updatedTable = tableRepository.save(table);
            return modelMapper.map(updatedTable, TableDTO.class);
        } else {
            return null;
        }
    }

    public boolean deleteTable(Long id) {
        Optional<Tablee> optionalTable = tableRepository.findById(id);
        if (optionalTable.isPresent()) {
            tableRepository.delete(optionalTable.get());
            return true;
        } else {
            return false;
        }
    }

	public List<TableDTO> getAllAvailableTableDTOs() {
		List<Tablee> tables = tableRepository.findByAvailability(true);
		return tables.stream()
                .map(table -> modelMapper.map(table, TableDTO.class))
                .collect(Collectors.toList());
	}
    
}


