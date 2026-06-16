<!DOCTYPE html>
<html>
<head>
    <title>Editar Livro</title>
</head>
<body>

<h1>Editar Livro</h1>

<form action="/livros/{{ $livro->id }}"
      method="POST">

    @csrf
    @method('PUT')

    <label>Título</label>
    <br>

    <input type="text"
           name="titulo"
           value="{{ $livro->titulo }}">

    <br><br>

    <label>Autor</label>
    <br>

    <input type="text"
           name="autor"
           value="{{ $livro->autor }}">

    <br><br>

    <label>Ano</label>
    <br>

    <input type="number"
           name="ano"
           value="{{ $livro->ano }}">

    <br><br>

    <button type="submit">
        Atualizar
    </button>

</form>

</body>
</html>