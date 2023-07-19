package com.example.demo.service;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.QuallificationListByGender;
import com.example.demo.model.Employee;
import com.example.demo.model.Quallification;
import com.example.demo.repository.QuallificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuallificationService {

    private final QuallificationRepository quallificationRepository;

    public List<Quallification> getAllQuallifications(){
        List<Quallification> quallifications = quallificationRepository.findAll();

        return quallifications;
    }


    public List<QuallificationListByGender> getAlQuallificationsByGender(){
        return quallificationRepository.listQuallificationsByGender();
    }




}
