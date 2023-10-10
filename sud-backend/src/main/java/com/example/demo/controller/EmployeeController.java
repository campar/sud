package com.example.demo.controller;

import com.example.demo.controller.error.JmbgUsedException;
import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.EmployeesGenderByPosition;
import com.example.demo.dto.GenderEmployeeSum;
import com.example.demo.dto.EmployeesGenderByAgeRange;
import com.example.demo.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

        if (employeeDTO.getJmbg() != null) {
            this.employeeService.findByJmbg(employeeDTO.getJmbg())
                    .ifPresent(u -> {
                        throw new ResponseStatusException(HttpStatus.CONFLICT, "uneti JMBG vec postoji");

                    });
        }
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
    @GetMapping("/employee/age-range" )
    public List<EmployeesGenderByAgeRange> getAllQuallificationsByGender(@RequestParam(required = false) Integer employedAt){
        if(employedAt != null){
            return employeeService.listEmployeesGenderByAgeRangeAndEmployedAt(employedAt);
        }
        return employeeService.listEmployeesGenderByAgeRange();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/employee/position")
    public List<EmployeesGenderByPosition> listEmployeesGenderByPosition(){
        return employeeService.listEmployeesGenderByPosition();
    }

}
