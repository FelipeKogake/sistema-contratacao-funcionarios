package com.example.funcionarios.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.funcionarios.model.Funcionario;
import com.example.funcionarios.service.FuncionarioService;

import lombok.RequiredArgsConstructor;

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

    @GetMapping("/candidatos/novo")
    public String formularioCadastro(Model model) {
        model.addAttribute("funcionario", new Funcionario());
        return "candidatos/novo";
    }

    @PostMapping("/candidatos")
    public String cadastrar(@ModelAttribute Funcionario funcionario) {
        funcionarioService.addFuncionario(funcionario);
        return "redirect:/candidatos";
    }

    @GetMapping("/indicadores")
    public String indicadores() {
        return "indicadores";
    }
}
