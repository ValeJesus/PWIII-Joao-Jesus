package com.api.loja_produtos.controllers;

import com.api.loja_produtos.models.ProdutoModel;
import com.api.loja_produtos.repositories.ProdutoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/produtos") // Todas as rotas começam com /produtos
public class ProdutoController {

    private final ProdutoRepository repository;

    // Injeção de dependência por construtor (o Spring entrega o repositório pronto)
    public ProdutoController(ProdutoRepository repository) {
        this.repository = repository;
    }

    // 1. CREATE (POST /produtos)
    @PostMapping
    public ResponseEntity<ProdutoModel> salvarProduto(@RequestBody @Valid ProdutoModel produto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(produto));
    }

    // 2. READ ALL (GET /produtos)
    @GetMapping
    public ResponseEntity<List<ProdutoModel>> listarProdutos() {
        return ResponseEntity.status(HttpStatus.OK).body(repository.findAll());
    }

    // 3. READ ONE (GET /produtos/{id})
    @GetMapping("/{id}")
    public ResponseEntity<Object> buscarUmProduto(@PathVariable(value = "id") UUID id) {
        Optional<ProdutoModel> produto = repository.findById(id);
        if (produto.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(produto.get());
    }

    // 4. UPDATE (PUT /produtos/{id})
    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarProduto(@PathVariable(value = "id") UUID id,
                                                   @RequestBody @Valid ProdutoModel dadosNovos) {
        Optional<ProdutoModel> produtoO = repository.findById(id);
        if (produtoO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
        }
        ProdutoModel produtoBanco = produtoO.get();
        BeanUtils.copyProperties(dadosNovos, produtoBanco, "id"); // Mantém o ID original
        return ResponseEntity.status(HttpStatus.OK).body(repository.save(produtoBanco));
    }

    // 5. DELETE (DELETE /produtos/{id})
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarProduto(@PathVariable(value = "id") UUID id) {
        Optional<ProdutoModel> produtoO = repository.findById(id);
        if (produtoO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado.");
        }
        repository.delete(produtoO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Produto deletado com sucesso.");
    }
}
