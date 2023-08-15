package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EmployeesGenderByAgeRange {

    private String ageRange;
    private Long male;
    private Long female;
    private Long total;
    private Long totalPercentage;
    private Long malePercentage;
    private Long femalePercentage;
}
