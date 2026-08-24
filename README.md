# Sistema de Contratação de Funcionários

Aplicação web para gerenciar o processo seletivo de candidatos: cadastro, acompanhamento de status (em análise, aprovado, reprovado, contratado) e indicadores do processo.

Desenvolvida com **Spring Boot** (backend + MVC/Thymeleaf) e **Bootstrap 5** no frontend, servido pelo próprio Spring como aplicação web tradicional (server-rendered + chamadas AJAX para a API REST).

## Funcionalidades

- **Início** (`/`) — landing page com visão geral do sistema.
- **Candidatos** (`/candidatos`) — listagem de candidatos com criação, edição, atualização de status e exclusão.
- **Indicadores** (`/indicadores`) — painel com contagem de candidatos por status (total, em análise, aprovados, reprovados, contratados).
- **API REST** (`/funcionarios`) — CRUD completo consumido pelas telas via JavaScript (`fetch`).

## Tecnologias

- Java 17
- Spring Boot 4.1.0 (Web MVC, Thymeleaf, Validation, DevTools)
- Lombok
- Maven (com Maven Wrapper)
- Bootstrap 5.3 + Bootstrap Icons (via CDN)
- HTML/CSS/JavaScript puro no frontend

## Como executar

Pré-requisitos: JDK 17+.

```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux/macOS
./mvnw spring-boot:run
```

A aplicação sobe em `http://localhost:8080`.

## Executando os testes

```bash
.\mvnw.cmd test
```

## Estrutura do projeto

```
src/main/java/com/example/funcionarios/
├── controller/
│   ├── CandidatoViewController.java  # rotas das páginas (Thymeleaf)
│   └── FuncionarioController.java    # API REST (/funcionarios)
├── model/
│   ├── Funcionario.java              # entidade candidato/funcionário
│   └── Status.java                   # EM_ANALISE, APROVADO, REPROVADO, CONTRATADO
├── repository/
│   └── FuncionarioRepository.java    # persistência em memória
└── service/
    └── FuncionarioService.java

src/main/resources/
├── templates/                        # páginas Thymeleaf (index, candidatos/lista, indicadores)
├── static/css/style.css
└── static/js/                        # api.js, lista.js, indicadores.js
```

> **Nota:** os dados são armazenados em memória (`ArrayList` no `FuncionarioRepository`), pré-carregados com 3 candidatos de exemplo. Ao reiniciar a aplicação, os dados voltam ao estado inicial.

## Thymeleaf

As páginas ficam em `src/main/resources/templates/` e são servidas pelo `CandidatoViewController` (rotas `/`, `/candidatos` e `/indicadores`), sem uso de API/REST controller nessas rotas de view.

- **`candidatos/lista.html`** é a única página com renderização dinâmica no servidor: o `CandidatoViewController` popula `model.addAttribute("funcionarios", ...)` e o template itera a lista com `th:each` para montar as linhas da tabela, usando `th:text` (nome, email, cargo, departamento, cidade, salário), `th:attr` (atributos `data-*` usados pelo JS para editar/excluir), `th:classappend` (classe CSS conforme o status) e `th:selected` (opção selecionada no `<select>` de status).
- **`index.html`** e **`indicadores.html`** são templates Thymeleaf estáticos (sem `th:*`): servem apenas de casca HTML, e o conteúdo dinâmico de indicadores é preenchido no client-side via `fetch` (`indicadores.js`), consumindo a API REST.
- Após a renderização inicial da lista pelo Thymeleaf, as operações de criação, edição, atualização de status e exclusão são feitas via AJAX (`lista.js` + `api.js`), sem novo round-trip de página.

## API REST

Base: `/funcionarios`

| Método | Endpoint             | Descrição                              |
|--------|-----------------------|-----------------------------------------|
| GET    | `/funcionarios`       | Lista todos os candidatos               |
| GET    | `/funcionarios/{id}`  | Busca um candidato pelo id              |
| POST   | `/funcionarios`       | Cria um novo candidato                  |
| PUT    | `/funcionarios/{id}`  | Atualiza um candidato por completo      |
| PATCH  | `/funcionarios/{id}`  | Atualiza campos específicos (ex.: status) |
| DELETE | `/funcionarios/{id}`  | Remove um candidato                     |

### Modelo `Funcionario`

```json
{
  "id": 1,
  "nome": "João",
  "email": "joao@gmail.com",
  "telefone": "123456789",
  "cargo": "Desenvolvedor",
  "departamento": "Desenvolvimento",
  "salario": 5000.00,
  "cidade": "São Paulo",
  "status": "APROVADO"
}
```

Campos `nome`, `email` e `cargo` são obrigatórios e validados (`@NotBlank`, `@Email`) nas operações de criação e atualização completa (POST/PUT).
