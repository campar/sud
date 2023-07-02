package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenderEmployeeSum {
    private String name;
    private Long value;

    public GenderEmployeeSum(String gender, Long total) {
        this.name = gender;
        this.value = total;
    }
}
