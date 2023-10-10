package com.example.demo.controller.error;

public class JmbgUsedException extends RuntimeException{

    public static final String message = "uneti JMBG vec postoji";

    public JmbgUsedException(){
        super(message);
    }
}
