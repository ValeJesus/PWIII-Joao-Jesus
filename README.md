# PW3-fernando-fiani
## Programação Web ii por João Siles

### Read-me
Documentação passo a passo da criação de aplicações Laravel.

# PHP
Deve-se criar um arquivo php na IDE escolhida por você.

Para executar um arquivo de PHP siga estes passo:

Clone o repositório no caminho "C:\xampp\htdocs"

Abra o powershell como administrador

Execute os comandos na seguinte ordem:
```
npm install -g typescript
```
```
npm install -g tsc
```
Para executar o arquivo feche o powershell e abra novamente na pasta em que se localiza o arquivo e execute a seguinte linha:

-`tsc .nomedoarquivo.ts`
# Laravel frameork
As seguintes instruções se dirigem para a instalação do Laravel e a criação de uma aplicação Laravel.

# coisas que voce vai precisar
PHP

Composer

Laravel installer

Node and NPM

List item

# como instalar os componentes
abra o windows PowerShell como administrador

user este codigo

```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.4'))
```
#Criação do projeto Laravel
use este codigo primeiro
```
composer global require laravel/installer
```
## criação do app
1.feche o PowerShell

2.Abra o terminal do seu projeto

use esses codigos

cd --

cd --

cd C:

cd xampp

cd htdocs

cd no seu projeto

3.crie o projeto

use este codigo:
```
laravel new example-app
```
# configuração
1.feche o terminal

2.abra o Windows PowerShell

Digite este código para instalar todos os arquivos criando a pasta vendor
```
composer install
```
Digite este código para gerar os arquivos que são dependências do JavaScript
```
npm install
```
Digite este código para pegar os arquivos do npm install e gerar os executáveis ​​a partir deles

```
npm run build
```

3.Abra o Visual Studio Code, copie e cole o arquivo .env.example

4.renomeie o arquivo para .env

5.Abra o Windows PowerShell novamente

Digite este código para executar
```
php artisan
```
Digite este código para criar uma chave
```
php artisan key:generate
```
Digite este código para executar todos os arquivos do banco de dados

php artisan migrate

digite 'Yes'
