package com.example.demo.controller;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.GenderEmployeeSum;
import com.example.demo.model.Employee;
import com.example.demo.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
        employeeService.delete(id);
    }

    @GetMapping("/statistics")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<GenderEmployeeSum> countTotalNumberOfEmployeesByGender(){

        return employeeService.countTotalNumberOfEmployeesByGender();
    }
}
