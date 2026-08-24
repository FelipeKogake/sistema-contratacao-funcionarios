package com.example.funcionarios.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.example.funcionarios.model.Funcionario;
import com.example.funcionarios.repository.FuncionarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FuncionarioService {

    private final FuncionarioRepository repository;

    public Funcionario addFuncionario(Funcionario funcionario) {
        repository.addFuncionario(funcionario);
        return funcionario;
    }

    public ArrayList<Funcionario> getFuncionarios() {
        return repository.getFuncionarios();
    }

    public Funcionario getFuncionario(Integer id) {
        return repository.getFuncionario(id);
    }

    public Funcionario updateFuncionario(Funcionario funcionario, Integer id) {
        return repository.updateFuncionario(funcionario, id);
    }

    public Funcionario parcialUpdateFuncionario(Funcionario funcionario, Integer id) {
        return repository.parcialUpdateFuncionario(funcionario, id);
    }

    public Boolean deleteFuncionario(Integer id) {
        return repository.deleteFuncionario(id);
    }
}
