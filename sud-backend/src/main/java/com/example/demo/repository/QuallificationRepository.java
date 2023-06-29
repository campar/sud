package com.example.demo.repository;

import com.example.demo.model.Quallification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuallificationRepository  extends JpaRepository<Quallification, Long> {

    Quallification findByName(String name);
}
