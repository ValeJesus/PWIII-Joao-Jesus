<?php

namespace App\Http\Controllers;

use App\Models\Livro;
use Illuminate\Http\Request;

class LivroController extends Controller
{
    public function index()
    {
        $livros = Livro::all();

        return view('livros.index', compact('livros'));
    }

    public function create()
    {
        return view('livros.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|max:255',
            'autor' => 'required|max:255',
            'ano' => 'required|integer'
        ]);

        Livro::create($request->all());

        return redirect('/livros');
    }

    public function edit($id)
    {
        $livro = Livro::findOrFail($id);

        return view('livros.edit', compact('livro'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'titulo' => 'required|max:255',
            'autor' => 'required|max:255',
            'ano' => 'required|integer'
        ]);

        $livro = Livro::findOrFail($id);

        $livro->update($request->all());

        return redirect('/livros');
    }

    public function destroy($id)
    {
        Livro::destroy($id);

        return redirect('/livros');
    }
}