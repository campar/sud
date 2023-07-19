package com.example.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class QuallificationListByGender {

    private String name;
    private Long total;
    private Long male;
    private Long female;
    private Long totalPercentage;
    private Long malePercentage;
    private Long femalePercentage;


}
