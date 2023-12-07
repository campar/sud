package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EmployeesGenderByPosition {

    private Boolean onPosition;
    private Long total;
    private Long male;
    private Long female;
    private Double totalPercentage;
    private Double malePercentage;
    private Double femalePercentage;
}
