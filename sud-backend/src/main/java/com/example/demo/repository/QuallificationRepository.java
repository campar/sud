package com.example.demo.repository;

import com.example.demo.dto.QuallificationListByGender;
import com.example.demo.model.Quallification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuallificationRepository  extends JpaRepository<Quallification, Long> {

    Quallification findByName(String name);




    @Query("SELECT  new com.example.demo.dto.QuallificationListByGender(" +
            "q.name, " +
            "COUNT(*), " +
            "SUM(CASE " +
                "WHEN e.gender = 'Мушко' " +
                    "THEN 1 ELSE 0 " +
                "END), " +
            "SUM(CASE " +
                "WHEN e.gender = 'Женско' " +
                    "THEN 1 ELSE 0 " +
                "END), " +
            "(COUNT(*) / (SELECT COUNT(*) FROM Employee e WHERE e.deletedAt IS NULL) * 100), " +
            "(SUM(CASE WHEN e.gender = 'Мушко' THEN 1 ELSE 0 END) / (SELECT COUNT(*) FROM Employee e WHERE e.deletedAt IS NULL)) * 100, " +
            "(SUM(CASE WHEN e.gender = 'Женско' THEN 1 ELSE 0 END) / (SELECT COUNT(*) FROM Employee e WHERE e.deletedAt IS NULL)) * 100) " +
            "FROM Employee e " +
            "JOIN e.quallification q " +
            "WHERE e.deletedAt IS NULL " +
            "GROUP BY q.name")
    List<QuallificationListByGender> listQuallificationsByGender();



}
