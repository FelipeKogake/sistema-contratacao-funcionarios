package com.example.funcionarios.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CandidatoViewController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/candidatos")
    public String listagem() {
        return "candidatos/lista";
    }

    @GetMapping("/indicadores")
    public String indicadores() {
        return "indicadores";
    }
}
