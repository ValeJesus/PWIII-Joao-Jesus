package com.api.loja_produtos;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OlaController {

    @GetMapping("/")
    public String mensagem() {
        return "API Loja de Produtos no ar! Use /produtos para acessar o CRUD.";
    }
}
