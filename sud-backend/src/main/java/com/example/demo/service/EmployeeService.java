package com.example.demo.service;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.GenderEmployeeSum;
import com.example.demo.dto.QuallificationListByGender;
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
import java.util.Collection;
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

        String day = employeeDTO.getJmbg().substring(0,2);
        String month = employeeDTO.getJmbg().substring(2,4);
        String year = employeeDTO.getJmbg().substring(4,7);

        DateTimeFormatter formatter = new DateTimeFormatterBuilder().appendPattern("MMdd")
                .optionalStart()
                .appendValueReduced(ChronoField.YEAR, 3, 3, LocalDate.now().minusYears(100))
                .optionalEnd()
                .toFormatter();
        String date = month + day + year;
        LocalDate formattedDate = LocalDate.parse(date, formatter);
        employee.setDateOfBirth(formattedDate);

        String gender = employeeDTO.getJmbg().substring(9,12);
        Integer genderParsed = Integer.parseInt((gender));

        if(genderParsed <= 499){
            employee.setGender("Мушко");
        }
        else if(genderParsed >= 500 && genderParsed <= 999){
            employee.setGender("Женско");
        }
        Quallification quallification = quallificationRepository.findByName(employeeDTO.getQuallification());

        employee.setQuallification(quallification);



        Integer yearOfBirth = employee.getDateOfBirth().getYear();
        Integer currentYear =  Year.now().getValue();

        employee.setAge(currentYear - yearOfBirth);

        employeeRepository.save(employee);

//        return employees.stream().map(this::convertToDto).collect(Collectors.toList());

        return convertToDto(employee);
//        return employee;
    }

    public void delete(Long id) {
        employeeRepository.deleteById(id);
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

        return dto;
    }


    public List<GenderEmployeeSum> countTotalNumberOfEmployeesByGender() {
        return employeeRepository.countTotalNumberOfEmployeesByGender();

    }

    public void fireEmployee(Long id) {
        employeeRepository.fireEmployee(id);
    }
}
