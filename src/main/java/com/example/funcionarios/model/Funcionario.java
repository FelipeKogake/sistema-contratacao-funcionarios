package com.example.funcionarios.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Funcionario {

    private Integer id;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    private String telefone;

    @NotBlank(message = "Cargo é obrigatório")
    private String cargo;

    private String departamento;

    private Double salario;
    private String cidade;
    private Status status;

    public Funcionario(String nome, String email, String telefone, String cargo, String departamento, Double salario, String cidade, Status status) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cargo = cargo;
        this.departamento = departamento;
        this.salario = salario;
        this.cidade = cidade;
        this.status = status;
    }
}