<!DOCTYPE html>
<html>
<head>
    <title>Livros</title>
</head>
<body>

<h1>Lista de Livros</h1>

<a href="/livros/create">
    Novo Livro
</a>

<br><br>

<table border="1" cellpadding="10">

    <tr>
        <th>ID</th>
        <th>Título</th>
        <th>Autor</th>
        <th>Ano</th>
        <th>Ações</th>
    </tr>

    @foreach($livros as $livro)

    <tr>
        <td>{{ $livro->id }}</td>
        <td>{{ $livro->titulo }}</td>
        <td>{{ $livro->autor }}</td>
        <td>{{ $livro->ano }}</td>

        <td>

            <a href="/livros/{{ $livro->id }}/edit">
                Editar
            </a>

            <form action="/livros/{{ $livro->id }}"
                  method="POST">

                @csrf
                @method('DELETE')

                <button type="submit">
                    Excluir
                </button>

            </form>

        </td>

    </tr>

    @endforeach

</table>

</body>
</html>