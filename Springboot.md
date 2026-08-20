# Criando uma Aplicação Spring Boot

## 1. Spring Initializr

Acesse:

[https://start.spring.io/](https://start.spring.io/)

Configure:

* **Project:** Maven
* **Language:** Java
* **Spring Boot:** versão estável
* **Group:**`com.example`
* **Artifact:** nome do projeto
* **Packaging:** Jar
* **Java:** versão instalada

## 2. Dependências

Clique em **Add Dependencies** e adicione:

* **Spring Web** — criação de APIs e aplicações Web.
* **Spring Boot DevTools** — facilita o desenvolvimento.
* **Spring Data JPA** — integração com banco de dados.
* **MySQL Driver** — conexão com MySQL.

Depois clique em **Generate** para baixar o projeto.

## 3. Abrindo o projeto

Extraia o `.zip` e abra a pasta na IDE.

A estrutura básica será:

```text
src/
 └── main/
     ├── java/
     │   └── com.example.demo/
     │       └── DemoApplication.java
     └── resources/
         └── application.properties

pom.xml
```

## 4. Executando

No terminal:

```bash
mvn spring-boot:run
```

Ou execute `DemoApplication.java` pela IDE.

Por padrão, a aplicação estará disponível em:

```text
http://localhost:8080
```

## 5. Primeiro Controller

Crie um Controller:

```java
@RestController
public class HelloController {

    @GetMapping("/")
    public String hello() {
        return "Olá, Spring Boot!";
    }
}
```

Acesse:

```text
http://localhost:8080/
```

Resultado:

```text
Olá, Spring Boot!
```
