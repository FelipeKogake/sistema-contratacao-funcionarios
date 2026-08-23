package com.example.funcionarios.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.funcionarios.model.Funcionario;
import com.example.funcionarios.service.FuncionarioService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/funcionarios")
@RequiredArgsConstructor
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    @PostMapping()
    public ResponseEntity<Funcionario> createFuncionario(@RequestBody @Valid Funcionario funcionario) {
        Funcionario result = funcionarioService.addFuncionario(funcionario);
        if (result == null) return ResponseEntity.badRequest().build();
        URI location = URI.create("/funcionarios/" + result.getId());
        return ResponseEntity.created(location).body(funcionario); 
    }

    @GetMapping()
    public ResponseEntity<List<Funcionario>> getFuncionarios() {
        return ResponseEntity.ok(funcionarioService.getFuncionarios());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> getFuncionario(@PathVariable Integer id) {
        Funcionario result = funcionarioService.getFuncionario(id);
        if (result == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok().body(result); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> updateFuncionario(@RequestBody @Valid Funcionario funcioario, @PathVariable Integer id) {
        Funcionario result = funcionarioService.updateFuncionario(funcioario, id);
        if (result == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok().body(result); 
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Funcionario> parcialUpdateFuncionario(@RequestBody Funcionario funcioario, @PathVariable Integer id) {
        Funcionario funcionario = funcionarioService.parcialUpdateFuncionario(funcioario, id);
        if (funcionario == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok().body(funcionario); 
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Funcionario> deleteFuncionario(@PathVariable Integer id) {
        if (!funcionarioService.deleteFuncionario(id)) return ResponseEntity.notFound().build();
        return ResponseEntity.ok().build(); 
    }
}
