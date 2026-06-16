<!DOCTYPE html>
<html>
<head>
    <title>Novo Livro</title>
</head>
<body>

<h1>Cadastrar Livro</h1>

<form action="/livros" method="POST">

    @csrf

    <label>Título</label>
    <br>

    <input type="text"
           name="titulo">

    <br><br>

    <label>Autor</label>
    <br>

    <input type="text"
           name="autor">

    <br><br>

    <label>Ano</label>
    <br>

    <input type="number"
           name="ano">

    <br><br>

    <button type="submit">
        Salvar
    </button>

</form>

</body>
</html>