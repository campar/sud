package com.example.demo.repository;

import com.example.demo.dto.GenderEmployeeSum;
import com.example.demo.dto.QuallificationListByGender;
import com.example.demo.model.Employee;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {


    @Query("SELECT new com.example.demo.dto.GenderEmployeeSum(e.gender, COUNT(e.gender)) " +
            "FROM Employee e " +
            "WHERE e.deletedAt IS NULL " +
            "GROUP BY e.gender")
    List<GenderEmployeeSum> countTotalNumberOfEmployeesByGender();


    @Modifying
    @Transactional
    @Query("update Employee e set deletedAt = CURRENT_DATE " +
            "WHERE e.id = :id")
    void fireEmployee(@PathVariable("id") Long id);


    @Query("SELECT e FROM Employee e " +
            "WHERE e.deletedAt IS NULL")
    List<Employee> findAllEmployees();



}