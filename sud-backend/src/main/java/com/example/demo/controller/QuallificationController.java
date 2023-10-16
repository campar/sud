package com.example.demo.controller;


import com.example.demo.dto.QuallificationListByGender;
import com.example.demo.model.Quallification;
import com.example.demo.service.QuallificationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class QuallificationController {

    private final QuallificationService quallificationService;

    @GetMapping("/quallifications")
    public List<Quallification> getAllQuallifications(){
        return quallificationService.getAllQuallifications();
    }


    @GetMapping("/quallifications/gender")
    public List<QuallificationListByGender> getAllQuallificationsByGender(){
        return quallificationService.getAlQuallificationsByGender();
    }


}
