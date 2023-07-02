package com.example.demo.repository;

import com.example.demo.dto.GenderEmployeeSum;
import com.example.demo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {


    @Query("SELECT new com.example.demo.dto.GenderEmployeeSum(e.gender, COUNT(e.gender)) " +
            "FROM Employee e " +
            "GROUP BY e.gender")
    List<GenderEmployeeSum> countTotalNumberOfEmployeesByGender();
}
