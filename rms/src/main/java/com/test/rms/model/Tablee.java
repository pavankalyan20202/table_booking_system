package com.test.rms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tablee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tableId;
    
    private String tableName;
    
    private int capacity;
    
    private boolean availability;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "reservation_id", nullable = true, insertable = true, updatable = true)
    private Reservation reservation;

}
