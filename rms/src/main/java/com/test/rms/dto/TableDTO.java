package com.test.rms.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TableDTO {
    private Long id;
    private String tableName;
    private int capacity;
    @JsonProperty
    private boolean availability;
    private ReservationDTO reservationDTO; 
    
}
