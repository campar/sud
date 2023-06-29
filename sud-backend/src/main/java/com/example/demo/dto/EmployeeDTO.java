package com.example.demo.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeDTO {
    private Long id;
    private String jmbg;
    private String firstName;
    private String lastName;
    private String gender;
    private LocalDate dateOfBirth;
    private String quallification;
}
