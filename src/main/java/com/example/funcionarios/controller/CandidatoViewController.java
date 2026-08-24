package com.example.funcionarios.controller;

import com.example.funcionarios.service.FuncionarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class CandidatoViewController {
    private final FuncionarioService funcionarioService;

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/candidatos")
    public String listagem(Model model) {
        model.addAttribute("funcionarios", funcionarioService.getFuncionarios());
        return "candidatos/lista";
    }

    @GetMapping("/indicadores")
    public String indicadores() {
        return "indicadores";
    }
}
