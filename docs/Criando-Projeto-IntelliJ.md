Dito pelo ChatGPT:
Entendi. Vou enviar dentro de um bloco de código para os # e - aparecerem literalmente e você poder copiar direto para o .md:

# 🧠 Criando um Projeto Java com IntelliJ IDEA

O **IntelliJ IDEA Ultimate** possui um assistente integrado para criação de projetos **Spring Boot**, utilizando a mesma API do **Spring Initializr** (`start.spring.io`) diretamente pela IDE.


## 📋 Passo a passo

1. Abra o **IntelliJ IDEA**.
2. Clique em **New Project**.
3. No menu lateral, selecione **Spring Boot** em **Generators**.
4. Configure as informações do projeto:
   - **Name** → nome do projeto (ex: `demo`)
   - **Location** → local onde o projeto será salvo
   - **Create Git repository** → opcional, para inicializar um repositório Git
   - **Language** → linguagem utilizada no projeto: Java, Kotlin ou Groovy
   - **Type** → sistema de gerenciamento de dependências: Maven, Gradle - Groovy ou Gradle - Kotlin
   - **Group** → identificador da organização (ex: `br.com.dio`)
   - **Artifact** → nome do artefato/projeto (ex: `demo`)
   - **Package name** → pacote principal do projeto (ex: `com.example.demo`)
   - **JDK** → versão do JDK instalada na máquina
   - **Java** → versão do Java utilizada no projeto
   - **Packaging** → formato do projeto: Jar ou War
   - **Configuration** → formato dos arquivos de configuração: Properties ou YAML
5. Clique em **Next**.
6. Selecione a versão do **Spring Boot** que será utilizada.
7. Escolha as **dependências** necessárias para o projeto, como:
   - Spring Web
   - Lombok
   - Spring Boot DevTools
   - Spring Data JPA
8. Clique em **Create**.
9. O IntelliJ fará o download das dependências e criará automaticamente a estrutura inicial do projeto.


