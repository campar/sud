package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name="employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    // length = 13
    // sample: 11 06 997 80 001 6
    // (DD MM GGG RR BBB K)
    // DD = DAY
    // MM = MONTH
    // GGG = YEAR
    // RR = region

    // BBB =  IF 000 <= 499 return MUSKO
    //        IF 500 <= 999 return ZENSKO
    // K =  checksum

    // RR = region
    //* 00-09 – stranci koji su dobili SFRJ državljanstvo
    //* 10-19 – Bosna i Hercegovina (10 - Banja Luka, 17 - Sarajevo)
    //* 20-29 – Crna Gora
    //* 30-39 – Hrvatska (33 - Zagreb)
    //* 40-49 – Makedonija (45 - Skoplje)
    //* 50-59 – Slovenija ( 50 - Ljubljana )
    //* 60-69 – (Neupotrebljeno iz nepoznatog razloga)
    //            * 70-79 – Uža Srbija (71 - Beograd)
    //* 80-89 – Autonomna Pokrajina Vojvodina (80 - Novi Sad)
    //* 90-99 – Autonomna Pokrajina Kosovo i Metohija

//    https://web.archive.org/web/20110812183325/http://nultibitovi.net/blog/jedinstveni-mati-ni-broj-gra-anina
    @Column(name = "jmbg", columnDefinition="CHAR(13)")

    private String jmbg;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="gender")
    private String gender;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @ManyToOne
    @JoinColumn(name = "quallification_id", foreignKey = @ForeignKey(
            name = "fk__employee__quallification"
    ))
    private Quallification quallification;
}
