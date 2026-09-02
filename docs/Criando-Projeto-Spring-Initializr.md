# 🌱 Criando um Projeto Java com Spring Initializr

O **Spring Initializr** é a forma mais simples de gerar a estrutura inicial de um projeto Spring Boot diretamente pelo navegador.

## 📋 Passo a passo

1. Acesse o **Spring Initializr**.
2. Escolha o **Project**:
   - Maven
   - Gradle
3. Escolha a **Language**:
   - Java
   - Kotlin
   - Groovy
4. Escolha a versão do **Spring Boot**.
5. Preencha o **Project Metadata**:
   - Group
   - Artifact
   - Package name
   - Packaging
   - Java
6. Clique em **ADD DEPENDENCIES** e selecione as bibliotecas desejadas.
7. Clique em **GENERATE** para baixar o arquivo `.zip` do projeto.

---

## 📦 Dependências mais comuns

### Lombok

Biblioteca Java que reduz código repetitivo (boilerplate) utilizando anotações como `@Getter`, `@Setter`, `@Data`, `@Builder` e `@AllArgsConstructor`.

Ela gera automaticamente, durante a compilação, métodos que normalmente precisariam ser escritos manualmente.

### Spring Web

Módulo utilizado para construir aplicações web e APIs REST com Spring MVC.

Também inclui o **Tomcat** como servidor embarcado padrão, permitindo executar a aplicação sem a necessidade de instalar um servidor externo.

### Spring Boot DevTools

Ferramenta que facilita o desenvolvimento, oferecendo recursos como:

- Reinicialização automática da aplicação quando o código é alterado
- Restart rápido
- Suporte ao LiveReload no navegador

---

## 🔧 Build Tools

### Maven

Ferramenta de build e gerenciamento de dependências baseada em XML, utilizando o arquivo `pom.xml`.

É uma ferramenta tradicional, madura e amplamente utilizada no ecossistema Java.

### Gradle

Ferramenta de build mais moderna e flexível, baseada em scripts Groovy ou Kotlin:

- `build.gradle`
- `build.gradle.kts`

Possui recursos como cache incremental e pode oferecer builds mais rápidos em determinados projetos.

---

## 🗣️ Linguagens

### Kotlin

Linguagem moderna e interoperável com Java que roda na JVM.

Entre suas principais características estão:

- Sintaxe mais concisa
- Null-safety nativo
- Interoperabilidade com Java
- Suporte oficial do Google para desenvolvimento Android

No Spring, Kotlin pode ser utilizado como alternativa ao Java, proporcionando uma sintaxe mais enxuta.

---

## 🌀 Versões do Spring Boot / Snapshots

- Versões numeradas normalmente são versões **estáveis** e indicadas para produção.
- Versões marcadas como **SNAPSHOT** são versões em desenvolvimento e podem sofrer alterações antes do lançamento oficial.
- Versões **SNAPSHOT** não são recomendadas para ambientes de produção.

---

## 🏷️ Project Metadata

### Group

Identifica a organização ou empresa responsável pelo projeto, seguindo normalmente o padrão de domínio invertido.

Exemplos:

- `com.example`
- `br.com.dio`

Funciona como o namespace raiz do projeto.

### Artifact

Identifica o nome do projeto ou aplicação.

Exemplo:

`demo`

Também é utilizado para definir o nome do artefato gerado pelo build, como um arquivo `.jar` ou `.war`.

### Package Name

Define o pacote principal onde o código-fonte Java será organizado.

Normalmente é formado a partir do **Group + Artifact**.

Exemplo:

`com.example.demo`

### Packaging

Define o formato do arquivo final gerado pelo build:

- **Jar** → aplicação empacotada com servidor embutido, podendo ser executada diretamente com `java -jar app.jar`. É o formato mais comum em aplicações Spring Boot modernas.
- **War** → formato tradicional utilizado para implantação em servidores de aplicação externos, como Tomcat ou JBoss.

### Configuration

Define o formato utilizado pelos arquivos de configuração da aplicação:

- **Properties** → utiliza o arquivo `application.properties` e trabalha com configurações no formato `chave=valor`.
- **YAML** → utiliza o arquivo `application.yml` e organiza as configurações de forma hierárquica, sendo bastante útil para estruturas mais complexas.

---

## ☕ Versões do Java / LTS

O Java possui um ciclo de lançamentos no qual algumas versões são classificadas como **LTS (Long-Term Support)**.

| Versão | Tipo | Observação |
|---|---|---|
| 17 | LTS | Versão de suporte de longo prazo, amplamente utilizada em produção |
| 21 | LTS | Versão LTS com recursos modernos, incluindo Virtual Threads |
| 25 | LTS | Versão LTS mais recente do ciclo |
| 26 | Não-LTS | Versão de curto prazo, focada em novidades e testes |

### Diferença entre as versões

- **Versões LTS** recebem atualizações de segurança e correções por vários anos, sendo recomendadas para projetos em produção.
- **Versões não-LTS** recebem suporte por um período menor e são voltadas principalmente para quem deseja experimentar recursos mais recentes.

Para projetos de produção, geralmente é recomendado utilizar uma versão **LTS**.

---

## 🧩 Annotations (Anotações)

Annotations são **metadados** adicionados ao código Java utilizando a sintaxe `@NomeDaAnotação`.

Elas podem fornecer informações para o compilador, ferramentas como o Lombok ou frameworks como o Spring.

No Spring, as annotations são utilizadas para indicar como os componentes da aplicação devem ser identificados, configurados e conectados pelo container de injeção de dependência.

### Exemplos comuns

| Annotation | Para que serve |
|---|---|
| `@SpringBootApplication` | Marca a classe principal da aplicação, habilitando a configuração automática e o escaneamento de componentes |
| `@RestController` | Define uma classe como controlador REST |
| `@Service` | Identifica uma classe responsável pela regra de negócio |
| `@Repository` | Identifica uma classe responsável pelo acesso a dados |
| `@Autowired` | Permite a injeção automática de uma dependência |
| `@GetMapping` / `@PostMapping` | Mapeiam requisições HTTP para métodos específicos |

---

## 🫘 Beans

Um **Bean** é um objeto criado, gerenciado e controlado pelo **Spring Container**, em vez de ser instanciado manualmente pelo desenvolvedor utilizando `new`.

Esses objetos ficam registrados no **Spring Container (ApplicationContext)**, que é responsável por:

- Criar as instâncias
- Gerenciar suas dependências
- Controlar o ciclo de vida dos objetos
- Fornecer os Beans necessários para outros componentes

### Formas comuns de declarar um Bean

- Utilizando `@Component`, `@Service`, `@Repository` ou `@Controller` em uma classe.
- Utilizando `@Bean` em um método dentro de uma classe marcada com `@Configuration`.

O Spring encontra automaticamente essas classes durante o escaneamento de componentes e registra os objetos como Beans.

Isso permite utilizar **Injeção de Dependência (DI)**. Em vez de uma classe criar suas próprias dependências, ela apenas declara o que precisa, normalmente através do construtor, e o Spring fornece os Beans correspondentes.



---

