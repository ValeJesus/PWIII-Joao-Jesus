# 🚀 Documentação – Spring Boot (API de Produtos)

API REST de produtos com **Spring Boot 4.1.1**, **Java 21**, **Spring Data JPA** e **PostgreSQL**.

---

# ✅ 1. Pré-requisitos

| Ferramenta | Versão | Para que serve |
|---|---|---|
| ☕ JDK | 21 | Compilar e rodar o projeto |
| 🐘 PostgreSQL | 14+ | Banco de dados |
| 🧪 Insomnia ou Postman | qualquer | Testar as rotas |
| 🧰 IDE (IntelliJ, VS Code, Eclipse) | qualquer | Editar o código |

Confira o Java no terminal:

```bash
java -version
```

A saída deve mostrar a versão **21**. O **Maven não precisa ser instalado**: o projeto já traz o Maven Wrapper (`mvnw` / `mvnw.cmd`).

---

# 🗄️ 2. Criar o banco de dados

O Spring cria as **tabelas** sozinho, mas **não cria o banco**. Crie-o uma vez:

**Opção A – pelo terminal (psql):**

```bash
psql -U postgres -c "CREATE DATABASE \"ProdutosJava\";"
```

**Opção B – pelo pgAdmin:** clique com o botão direito em *Databases → Create → Database* e use o nome `ProdutosJava`.

> ⚠️ O nome precisa ser idêntico ao da URL em `application.properties` (`ProdutosJava`, com P e J maiúsculos).

---

# 🔧 3. Configurar usuário e senha

O arquivo `src/main/resources/application.properties` lê as credenciais assim:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ProdutosJava
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:postgres}
```

A sintaxe `${DB_PASSWORD:postgres}` significa: *"use a variável de ambiente `DB_PASSWORD`; se ela não existir, use `postgres`"*. Assim a senha real nunca vai para o GitHub.

Se a senha do **seu** PostgreSQL for diferente de `postgres`, defina a variável **antes** de rodar, no mesmo terminal:

**Windows (PowerShell):**
```powershell
$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "sua_senha"
```

**Windows (CMD):**
```cmd
set DB_USERNAME=postgres
set DB_PASSWORD=sua_senha
```

**Linux / macOS:**
```bash
export DB_USERNAME=postgres
export DB_PASSWORD=sua_senha
```

---

# ▶️ 4. Rodar a aplicação

Abra o terminal **dentro da pasta `loja-produtos`** (onde está o `pom.xml`):

**Windows:**
```powershell
.\mvnw.cmd spring-boot:run
```

**Linux / macOS:**
```bash
./mvnw spring-boot:run
```

Na primeira vez o Maven baixa as dependências (pode levar alguns minutos). Quando aparecer algo como:

```
Tomcat started on port 8080 (http) with context path '/'
Started LojaProdutosApplication in 4.5 seconds
```

a API está no ar. Para parar, use `Ctrl + C`.

Teste no navegador: <http://localhost:8080/> deve exibir a mensagem de boas-vindas.

---

# 🧪 5. Testar o CRUD

Base da API: `http://localhost:8080/produtos`

| Método | Rota | O que faz |
|---|---|---|
| `POST` | `/produtos` | Cadastra um produto |
| `GET` | `/produtos` | Lista todos |
| `GET` | `/produtos/{id}` | Busca um pelo ID |
| `PUT` | `/produtos/{id}` | Atualiza um produto |
| `DELETE` | `/produtos/{id}` | Remove um produto |

### Cadastrar (POST)

Corpo (JSON) — no Insomnia/Postman use *Body → JSON*:

```json
{
  "nome": "Teclado Mecânico",
  "descricao": "Switch azul, ABNT2",
  "preco": 249.90,
  "quantidade": 15
}
```

Resposta `201 Created`, já com o `id` gerado:

```json
{
  "id": "3f0c2c9e-8a41-4b6e-9d67-1a2b3c4d5e6f",
  "nome": "Teclado Mecânico",
  "descricao": "Switch azul, ABNT2",
  "preco": 249.90,
  "quantidade": 15
}
```

### Com `curl` (Linux/macOS/Git Bash)

```bash
# criar
curl -X POST http://localhost:8080/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Mouse","descricao":"Sem fio","preco":89.90,"quantidade":30}'

# listar
curl http://localhost:8080/produtos

# buscar um (troque pelo id real)
curl http://localhost:8080/produtos/COLE-O-ID-AQUI

# atualizar
curl -X PUT http://localhost:8080/produtos/COLE-O-ID-AQUI \
  -H "Content-Type: application/json" \
  -d '{"nome":"Mouse Gamer","descricao":"RGB","preco":129.90,"quantidade":20}'

# deletar
curl -X DELETE http://localhost:8080/produtos/COLE-O-ID-AQUI
```

### Validações

Se enviar dados inválidos (nome vazio, preço `0` ou negativo, quantidade negativa), a API responde **`400 Bad Request`** e não grava nada. Se o `id` não existir, responde **`404`** com "Produto não encontrado.".

---

# 🏗️ 6. Como o projeto está organizado

```text
com.api.loja_produtos/
│
├── controllers/     # Camada de entrada: endpoints HTTP (equivale às rotas do Express)
│   └── ProdutoController.java
├── models/          # Entidades: cada classe vira uma tabela SQL
│   └── ProdutoModel.java
├── repositories/    # Acesso a dados: queries SQL geradas automaticamente
│   └── ProdutoRepository.java
├── OlaController.java              # Rota "/" só para conferir se subiu
└── LojaProdutosApplication.java    # Classe principal (main)
```

Fluxo de uma requisição:

```text
Cliente → Controller → Repository → PostgreSQL
                ↑            ↓
             JSON  ←  ProdutoModel
```

---

# 🧩 7. O código, camada por camada

### 📦 Model – `ProdutoModel.java`

`@Entity` marca a classe como tabela; `@Table` define o nome (`TB_PRODUTOS`). As anotações `@NotBlank`, `@NotNull`, `@DecimalMin` e `@Min` definem as regras de validação.

```java
@Entity
@Table(name = "TB_PRODUTOS")
public class ProdutoModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NotBlank(message = "O nome é obrigatório.")
    private String nome;

    private String descricao;

    @NotNull(message = "O preço é obrigatório.")
    @DecimalMin(value = "0.0", inclusive = false, message = "O preço deve ser maior que zero.")
    private BigDecimal preco;

    @NotNull(message = "A quantidade é obrigatória.")
    @Min(value = 0, message = "A quantidade não pode ser negativa.")
    private Integer quantidade;

    // getters e setters de todos os campos (veja o arquivo completo)
}
```

> 💡 **Getters e setters:** como os atributos são `private`, outras classes só os acessam por esses métodos (encapsulamento). O Spring/Jackson também os usa para converter JSON ⇄ objeto. Com **Lombok**, `@Getter` e `@Setter` na classe geram tudo isso sozinhos.

### 🗃️ Repository – `ProdutoRepository.java`

```java
@Repository
public interface ProdutoRepository extends JpaRepository<ProdutoModel, UUID> {
}
```

Só de estender `JpaRepository`, o Spring registra o **Bean** e entrega `save()`, `findAll()`, `findById()`, `delete()` sem nenhuma linha de SQL.

### 🌐 Controller – `ProdutoController.java`

```java
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoRepository repository;

    public ProdutoController(ProdutoRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<ProdutoModel> salvarProduto(@RequestBody @Valid ProdutoModel produto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(produto));
    }

    @GetMapping
    public ResponseEntity<List<ProdutoModel>> listarProdutos() {
        return ResponseEntity.status(HttpStatus.OK).body(repository.findAll());
    }

    // GET /{id}, PUT /{id} e DELETE /{id}: veja o arquivo completo
}
```

Pontos importantes:

* **`@RequestBody`** converte o JSON recebido em objeto Java.
* **`@Valid`** dispara as validações do model; se falharem, a resposta é `400`.
* **`@PathVariable`** lê o `{id}` da URL.
* **Injeção por construtor:** o Spring vê que o controller precisa de um `ProdutoRepository` e o entrega pronto. É a forma recomendada em vez de `@Autowired` no campo.
* **`BeanUtils.copyProperties(dadosNovos, produtoBanco, "id")`** copia os dados novos para o produto existente, ignorando o `id`.

---

# 📚 8. Dependências (`pom.xml`)

| Dependência | Função |
|---|---|
| `spring-boot-starter-webmvc` | API REST (Spring MVC + Tomcat embutido) |
| `spring-boot-starter-data-jpa` | JPA/Hibernate: mapeia classes Java para tabelas |
| `spring-boot-starter-validation` | Validações (`@NotBlank`, `@Min`, `@Valid`...) |
| `postgresql` | Driver de conexão com o PostgreSQL |
| `spring-boot-devtools` | Reinicia a aplicação ao salvar arquivos |
| `lombok` | Reduz código repetitivo (getters, setters, builders) |

> 🗄️ **O que é JPA?** É o padrão do Java para ORM (Object-Relational Mapping): faz a ponte entre objetos Java e tabelas SQL, dispensando `INSERT`, `SELECT` e `UPDATE` manuais nas operações básicas.

---

# 🫘 9. O que é um Spring Bean?

Um **Bean** é um objeto cujo ciclo de vida é gerenciado pelo Spring (você não usa `new`). Todos ficam no **Spring Container**. Formas de registrar:

1. Anotações como `@Component`, `@Service`, `@Repository` ou `@RestController` sobre a classe.
2. Um método anotado com `@Bean` dentro de uma classe `@Configuration`.

Isso é a base da **Injeção de Dependência**: cada classe declara do que precisa e o Spring injeta a instância correta.

---

# 🏷️ 10. Spring Initializr e versões

Este projeto foi gerado em **start.spring.io** com: Maven, Java, Spring Boot 4.1.1, Jar, Properties, Java 21.

* **Versão estável** (ex: `4.1.1`): pronta para produção.
* **SNAPSHOT / milestone** (ex: `4.2.0-SNAPSHOT`): em desenvolvimento, evite.
* **Group** (`com.api`): identifica a organização. **Artifact** (`loja-produtos`): identifica o projeto. **Package**: junção dos dois.
* **Jar**: executável com servidor embutido (padrão). **War**: para servidores de aplicação externos.

### `application.yml` (alternativa ao `.properties`)

```yaml
spring:
  application:
    name: loja-produtos
  datasource:
    url: jdbc:postgresql://localhost:5432/ProdutosJava
    username: ${DB_USERNAME:postgres}
    password: ${DB_PASSWORD:postgres}
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
```

---

# 🛠️ 11. Problemas comuns

| Erro | Causa | Solução |
|---|---|---|
| `Connection to localhost:5432 refused` | PostgreSQL desligado | Inicie o serviço do PostgreSQL |
| `database "ProdutosJava" does not exist` | Banco não foi criado | Veja a seção 2 |
| `password authentication failed` | Senha diferente da configurada | Defina `DB_PASSWORD` (seção 3) |
| `Port 8080 was already in use` | Outra aplicação usa a porta | Feche-a ou adicione `server.port=8081` ao `application.properties` |
| `release version 21 not supported` / `invalid target release` | JDK mais antigo que 21 | Instale o JDK 21 e confira `java -version` |
| `JAVA_HOME not defined` | Variável de ambiente ausente | Aponte `JAVA_HOME` para a pasta do JDK 21 |
| `Permission denied: ./mvnw` (Linux/macOS) | Sem permissão de execução | `chmod +x mvnw` |
| `mvnw package` / `mvnw test` falha | O teste `contextLoads` sobe o contexto e precisa do banco | Ligue o PostgreSQL ou use `-DskipTests` |
| `400 Bad Request` no POST | JSON inválido ou dados fora das regras | Confira `Content-Type: application/json` e os campos |

---

# 📦 12. Versionamento (Git)

✅ Enviar: `src/`, `pom.xml`, `mvnw`, `mvnw.cmd`, `.mvn/`, `.gitignore`.
❌ Não enviar: `target/`, senhas reais e arquivos `.env`.
