package com.example.funcionarios.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.funcionarios.model.Funcionario;
import com.example.funcionarios.model.Status;


@Repository
public class FuncionarioRepository {
    private ArrayList<Funcionario> funcionarios = new ArrayList<>(List.of(
        new Funcionario(1, "João", "joao@gmail.com", "123456789", "Desenvolvedor", "Desenvolvimento", 5000.00, "São Paulo", Status.APROVADO),
        new Funcionario(2, "Maria", "maria@gmail.com", "123456789", "Desenvolvedor", "Desenvolvimento", 5000.00, "São Paulo", Status.REPROVADO),
        new Funcionario(3, "Pedro", "pedro@gmail.com", "123456789", "Desenvolvedor", "Desenvolvimento", 5000.00, "São Paulo", Status.EM_ANALISE)
    ));
    Integer proximoId = funcionarios.size() + 1;

    public Funcionario addFuncionario(Funcionario funcionario) {
        funcionario.setId(proximoId++);
        funcionarios.add(funcionario);
        return funcionario;
    }

    public ArrayList<Funcionario> getFuncionarios() {
        return funcionarios;
    }

    public Funcionario getFuncionario(Integer id) {
        return buscarPorId(id);
    }

    public Funcionario updateFuncionario(Funcionario funcionario, Integer id) {
        Funcionario funcionarioToUpdate = buscarPorId(id);
        if (funcionarioToUpdate == null) {
            return null;
        }
        funcionarioToUpdate.setNome(funcionario.getNome());
        funcionarioToUpdate.setEmail(funcionario.getEmail());
        funcionarioToUpdate.setTelefone(funcionario.getTelefone());
        funcionarioToUpdate.setCargo(funcionario.getCargo());
        funcionarioToUpdate.setDepartamento(funcionario.getDepartamento());
        funcionarioToUpdate.setSalario(funcionario.getSalario());
        funcionarioToUpdate.setCidade(funcionario.getCidade());
        funcionarioToUpdate.setStatus(funcionario.getStatus());
        return funcionarioToUpdate;
    }

    public Funcionario parcialUpdateFuncionario(Funcionario funcionario, Integer id) {
        Funcionario funcionarioToUpdate = buscarPorId(id);
        if (funcionarioToUpdate == null) {
            return null;
        }
        if (funcionario.getNome() != null) {
            funcionarioToUpdate.setNome(funcionario.getNome());
        }
        if (funcionario.getEmail() != null) {
            funcionarioToUpdate.setEmail(funcionario.getEmail());
        }
        if (funcionario.getTelefone() != null) {
            funcionarioToUpdate.setTelefone(funcionario.getTelefone());
        }
        if (funcionario.getCargo() != null) {
            funcionarioToUpdate.setCargo(funcionario.getCargo());
        }
        if (funcionario.getDepartamento() != null) {
            funcionarioToUpdate.setDepartamento(funcionario.getDepartamento());
        }
        if (funcionario.getSalario() != null) {
            funcionarioToUpdate.setSalario(funcionario.getSalario());
        }
        if (funcionario.getCidade() != null) {
            funcionarioToUpdate.setCidade(funcionario.getCidade());
        }
        if (funcionario.getStatus() != null) {
            funcionarioToUpdate.setStatus(funcionario.getStatus());
        }

        return funcionarioToUpdate;
    }

    public Boolean deleteFuncionario(Integer id) {
        Funcionario funcionarioToDelete = buscarPorId(id);
        if (funcionarioToDelete == null) {
            return false;
        }
        funcionarios.remove(funcionarioToDelete);
        return true;
    }

    private Funcionario buscarPorId(Integer id) {
        return funcionarios.stream()
            .filter(f -> f.getId().equals(id))
            .findFirst()
            .orElse(null);
    }
}
