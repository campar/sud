package com.example.demo.service;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.EmployeesGenderByPosition;
import com.example.demo.dto.GenderEmployeeSum;
import com.example.demo.dto.EmployeesGenderByAgeRange;
import com.example.demo.model.Employee;
import com.example.demo.model.Quallification;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.QuallificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoField;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final QuallificationRepository quallificationRepository;

    public List<EmployeeDTO> getAllEmployees(){
        List<Employee> employees =  employeeRepository.findAllEmployees();

        return employees.stream().map(this::convertToDto).collect(Collectors.toList());
    }


    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO){

        Employee employee = new Employee();
        employee.setJmbg(employeeDTO.getJmbg());
        employee.setFirstName(employeeDTO.getFirstName());
        employee.setLastName(employeeDTO.getLastName());
        employee.setEmployedAt(employeeDTO.getEmployedAt());
        employee.setOnPosition(employeeDTO.getOnPosition());

        LocalDate dateOfBirth = parseDateOfBirth(employeeDTO.getJmbg());
        employee.setDateOfBirth(dateOfBirth);

        String gender = determineGender(employeeDTO.getJmbg());
        employee.setGender(gender);

        Integer age = calculateEmployeeAge(employee);
        employee.setAge(age);


        Quallification quallification = quallificationRepository.findByName(employeeDTO.getQuallification());
        employee.setQuallification(quallification);
        employeeRepository.save(employee);





        return convertToDto(employee);

    }

    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }


    private LocalDate parseDateOfBirth(String jmbg) {
        String day = jmbg.substring(0, 2);
        String month = jmbg.substring(2, 4);
        String year = jmbg.substring(4, 7);

        DateTimeFormatter formatter = new DateTimeFormatterBuilder().appendPattern("MMdd")
                .optionalStart()
                .appendValueReduced(ChronoField.YEAR, 3, 3, LocalDate.now().minusYears(100))
                .optionalEnd()
                .toFormatter();

        String date = month + day + year;
        return LocalDate.parse(date, formatter);
    }

    private String determineGender(String jmbg) {
        String gender = jmbg.substring(9, 12);
        Integer genderParsed = Integer.parseInt(gender);

        if (genderParsed <= 499) {
            return "Мушко";
        }
        return "Женско";
    }


    private Integer calculateEmployeeAge(Employee employee) {
        Integer yearOfBirth = employee.getDateOfBirth().getYear();
        Integer currentYear = Year.now().getValue();

        return currentYear - yearOfBirth;
    }

    public EmployeeDTO convertToDto(Employee employee) {
        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(employee.getId());
        dto.setJmbg(employee.getJmbg());
        dto.setGender(employee.getGender());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setDateOfBirth(employee.getDateOfBirth());
        dto.setQuallification(employee.getQuallification().getName());
        dto.setAge(employee.getAge());
        dto.setDeletedAt(employee.getDeletedAt());
        dto.setOnPosition(employee.getOnPosition());
        dto.setEmployedAt(employee.getEmployedAt());
        return dto;
    }


    public List<GenderEmployeeSum> countTotalNumberOfEmployeesByGender() {
        return employeeRepository.countTotalNumberOfEmployeesByGender();

    }

    public void fireEmployee(Long id) {
        employeeRepository.fireEmployee(id);
    }

    public List<EmployeesGenderByAgeRange> listEmployeesGenderByAgeRange(){
        return employeeRepository.listEmployeesGenderByAgeRange();
    }

    public List<EmployeesGenderByPosition> listEmployeesGenderByPosition(){
        return employeeRepository.listEmployeesGenderByPosition();
    }





}
