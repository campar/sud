package com.example.demo.controller;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.EmployeesGenderByPosition;
import com.example.demo.dto.GenderEmployeeSum;
import com.example.demo.dto.EmployeesGenderByAgeRange;
import com.example.demo.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;
    @GetMapping("/employee")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<EmployeeDTO> getAllEmployees(){

       return employeeService.getAllEmployees();
    }


    @PostMapping("/employee")
    @CrossOrigin(origins = "http://localhost:4200")
    public EmployeeDTO createEmployee(@RequestBody EmployeeDTO employeeDTO){
        return employeeService.createEmployee(employeeDTO);

    }


    @DeleteMapping("/employee/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public void deleteEmployee(@PathVariable Long id){
        employeeService.fireEmployee(id);
    }

    @GetMapping("/statistics")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<GenderEmployeeSum> countTotalNumberOfEmployeesByGender(){

        return employeeService.countTotalNumberOfEmployeesByGender();
    }



    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/employee/age-range")
    public List<EmployeesGenderByAgeRange> getAllQuallificationsByGender(){
        return employeeService.listEmployeesGenderByAgeRange();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/employee/position")
    public List<EmployeesGenderByPosition> listEmployeesGenderByPosition(){
        return employeeService.listEmployeesGenderByPosition();
    }
}
