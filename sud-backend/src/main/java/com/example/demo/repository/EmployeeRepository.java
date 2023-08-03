package com.example.demo.repository;

import com.example.demo.dto.EmployeesGenderByPosition;
import com.example.demo.dto.GenderEmployeeSum;
import com.example.demo.dto.EmployeesGenderByAgeRange;
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
    @Query("update Employee e set e.deletedAt = CURRENT_DATE " +
            "WHERE e.id = :id")
    void fireEmployee(@PathVariable("id") Long id);


    @Query("SELECT e FROM Employee e " +
            "WHERE e.deletedAt IS NULL")
    List<Employee> findAllEmployees();



    @Query("""
            SELECT new com.example.demo.dto.EmployeesGenderByAgeRange(
                g.ageRange,
                g.male,
                g.female,
                SUM(g.male + g.female) AS total,
                (SUM(g.male + g.female) / (SELECT COUNT(*) FROM Employee e) * 100) AS totalPercentage,
                (g.male / (SELECT COUNT(*) FROM Employee e) * 100) AS malePercentage,
                (g.female / (SELECT COUNT(*) FROM Employee e) * 100) AS femalePercentage)
             FROM (SELECT
                CASE
                    WHEN age <= 20 
                        THEN '0-20'
                    WHEN age BETWEEN 21 AND 30 
                        THEN '21-30'
                    WHEN age BETWEEN 31 AND 40 
                        THEN '31-40'
                    WHEN age BETWEEN 41 AND 50 
                        THEN '41-50'
                    WHEN age BETWEEN 51 AND 60 
                        THEN '51-60'
                    WHEN age BETWEEN 61 AND 70 
                        THEN '61-70'
                    WHEN age IS NULL 
                        THEN '(NULL)'
                END AS ageRange,
                SUM(CASE
                    WHEN gender = 'Мушко' 
                        THEN
                            CASE
                                WHEN age <= 20 
                                    THEN 1
                                WHEN age BETWEEN 11 AND 20 
                                    THEN 1
                                WHEN age BETWEEN 21 AND 30 
                                    THEN 1
                                WHEN age BETWEEN 31 AND 40 
                                    THEN 1
                                WHEN age BETWEEN 41 AND 50 
                                    THEN 1
                                WHEN age BETWEEN 51 AND 60 
                                    THEN 1
                                WHEN age BETWEEN 61 AND 70 
                                    THEN 1
                                WHEN age IS NULL 
                                    THEN 0
                                ELSE 0
                            END
                        ELSE 0
                    END) AS male,
                SUM(CASE
                    WHEN gender = 'Женско' 
                        THEN
                            CASE
                                WHEN age <= 20 
                                    THEN 1
                                WHEN age BETWEEN 11 AND 20 
                                    THEN 1
                                WHEN age BETWEEN 21 AND 30 
                                    THEN 1
                                WHEN age BETWEEN 31 AND 40 
                                    THEN 1
                                WHEN age BETWEEN 41 AND 50 
                                    THEN 1
                                WHEN age BETWEEN 51 AND 60 
                                    THEN 1
                                WHEN age BETWEEN 61 AND 70 
                                    THEN 1
                                WHEN age IS NULL 
                                    THEN 0
                                ELSE 0
                            END
                        ELSE 0
                    END) AS female
                FROM Employee e
                GROUP BY ageRange
                ORDER BY ageRange
            ) AS g
            GROUP BY g.ageRange, g.male, g.female
        """)
    List<EmployeesGenderByAgeRange> listEmployeesGenderByAgeRange();


    @Query("""
           SELECT new com.example.demo.dto.EmployeesGenderByPosition(
                  e.onPosition, 
                  COUNT(e) as total, 
                  SUM(CASE WHEN e.gender = 'Мушко' THEN 1 ELSE 0 END) as male, 
                  SUM(CASE WHEN e.gender = 'Женско' THEN 1 ELSE 0 END) as female, 
                  (COUNT(e) / (SELECT COUNT(e) FROM Employee e) * 100) as totalPercentage, 
                  (SUM(CASE WHEN e.gender = 'Мушко' THEN 1 ELSE 0 END) / (SELECT COUNT(e) FROM Employee e) * 100) as malePercentage, 
                  (SUM(CASE WHEN e.gender = 'Женско' THEN 1 ELSE 0 END) / (SELECT COUNT(e) FROM Employee e) * 100) as femalePercentage 
           )
           FROM Employee e 
           GROUP BY e.onPosition
       """)
    List<EmployeesGenderByPosition> listEmployeesGenderByPosition();


}