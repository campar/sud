package com.example.demo.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EmployeeDTO {
    private Long id;
    private String jmbg;
    private String firstName;
    private String lastName;
    private String gender;
    private LocalDate dateOfBirth;
    private String quallification;
}
