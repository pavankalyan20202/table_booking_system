package com.test.rms.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.rms.dto.TableDTO;
import com.test.rms.service.TableService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/tables")
public class TableController {
	
	@Autowired
    private TableService tableService;

    @GetMapping
    public ResponseEntity<List<TableDTO>> getAllTables() {
        List<TableDTO> tableDTOs = tableService.getAllTableDTOs();
        return ResponseEntity.ok(tableDTOs);
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<TableDTO>> getAllAvailableTables() {
        List<TableDTO> tableDTOs = tableService.getAllAvailableTableDTOs();
        return ResponseEntity.ok(tableDTOs);
    }
    
    @PostMapping
    public ResponseEntity<TableDTO> createTable(@RequestBody TableDTO tableDTO) {
        TableDTO tableDto = tableService.createTable(tableDTO);
        if(tableDTO == null)
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(tableDto);
        else
        	return ResponseEntity.status(HttpStatus.CREATED).body(tableDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TableDTO> updateTable(@PathVariable Long id, @RequestBody TableDTO tableDTO) {
        TableDTO updatedTableDTO = tableService.updateTable(id, tableDTO);
        if (updatedTableDTO != null) {
            return ResponseEntity.ok(updatedTableDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTable(@PathVariable Long id) {
        boolean deleted = tableService.deleteTable(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
}


