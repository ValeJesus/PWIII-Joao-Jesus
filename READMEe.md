# Jogo da Velha em React

Este projeto é uma implementação simples de **Jogo da Velha (Tic-Tac-Toe)** usando **React**.
Ele demonstra conceitos importantes como:

* Componentes
* Props
* Estado (`useState`)
* Renderização condicional
* Imutabilidade de estado
* Histórico de jogadas (time travel)

---

# Estrutura do Código

O código possui os seguintes componentes principais:

* `Square` → Representa um quadrado do tabuleiro
* `Board` → Representa o tabuleiro completo
* `Game` → Controla o estado do jogo e o histórico
* `calculateWinner` → Função que verifica se há vencedor

---

# Importações

```javascript
import { useState } from "react";
import "./styles.css";
```

### Explicação

`import { useState } from "react";`

* Importa o **hook `useState`** do React.
* Ele permite criar **estado dentro de componentes funcionais**.

`import "./styles.css";`

* Importa o arquivo de **estilos CSS** usado para estilizar o jogo.

---

# Componente Square

```javascript
function Square({ value, onSquareClick }) {
```

* Define um componente funcional chamado **Square**.
* Recebe duas **props**:

  * `value` → valor exibido no quadrado (`X`, `O` ou `null`)
  * `onSquareClick` → função executada quando o quadrado é clicado.

---

```javascript
return (
  <button className="square" onClick={onSquareClick}>
    {value}
  </button>
);
```

* Renderiza um **botão**.
* `className="square"` aplica estilo CSS.
* `onClick={onSquareClick}` chama a função quando o botão é clicado.
* `{value}` mostra `X` ou `O` dentro do botão.

---

# Componente Board

```javascript
function Board({ xIsNext, squares, onPlay }) {
```

Este componente representa **todo o tabuleiro**.

Props recebidas:

* `xIsNext` → indica se o próximo jogador é X
* `squares` → array com os valores das casas
* `onPlay` → função chamada quando uma jogada acontece

---

# Função handleClick

```javascript
function handleClick(i) {
```

Função chamada quando um quadrado é clicado.

`i` representa o **índice do quadrado no array**.

---

```javascript
if (squares[i] || calculateWinner(squares)) {
  return;
}
```

Verifica duas condições:

1. Se o quadrado **já está preenchido**
2. Se **já existe um vencedor**

Se alguma for verdadeira, **não faz nada**.

---

```javascript
const nextSquares = squares.slice();
```

Cria uma **cópia do array `squares`**.

Isso é importante porque **React exige imutabilidade de estado**.

---

```javascript
if (xIsNext) {
  nextSquares[i] = "X";
} else {
  nextSquares[i] = "O";
}
```

Define qual jogador fez a jogada:

* Se `xIsNext` for verdadeiro → coloca `"X"`
* Caso contrário → `"O"`

---

```javascript
onPlay(nextSquares);
```

Chama a função `onPlay` enviada pelo componente **Game**.

Ela atualizará o **estado global do jogo**.

---

# Verificação de vencedor

```javascript
const winner = calculateWinner(squares);
```

Chama a função `calculateWinner` para verificar se alguém venceu.

---

```javascript
let status;
```

Cria uma variável que mostrará o **status do jogo**.

---

```javascript
if (winner) {
  status = "Vencedor: " + winner;
} else {
  status = "Próximo jogador: " + (xIsNext ? "X" : "O");
}
```

* Se existe vencedor → mostra `"Vencedor: X"` ou `"Vencedor: O"`
* Caso contrário → mostra qual é o **próximo jogador**

---

# Renderização do Tabuleiro

```javascript
<div className="board-row">
```

Cria uma **linha do tabuleiro**.

---

```javascript
<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
```

Cria um quadrado:

* `value={squares[0]}` → valor armazenado na posição 0
* `onSquareClick={() => handleClick(0)}` → executa a jogada.

O mesmo padrão se repete para as **9 casas do tabuleiro**.

---

# Componente Game

```javascript
export default function Game() {
```

Este é o **componente principal da aplicação**.

Ele controla:

* estado
* histórico
* navegação entre jogadas.

---

# Estado do jogo

```javascript
const [history, setHistory] = useState([Array(9).fill(null)]);
```

Cria o estado `history`.

* É um **array de históricos de tabuleiro**.
* Começa com um tabuleiro vazio:

```
[null, null, null,
 null, null, null,
 null, null, null]
```

---

```javascript
const [currentMove, setCurrentMove] = useState(0);
```

Guarda **qual jogada está sendo exibida**.

Isso permite **voltar no tempo** (time travel).

---

# Jogador atual

```javascript
const xIsNext = currentMove % 2 === 0;
```

Verifica de quem é a vez:

* Jogadas pares → `X`
* Jogadas ímpares → `O`

---

```javascript
const currentSquares = history[currentMove];
```

Pega o **estado do tabuleiro da jogada atual**.

---

# Função handlePlay

```javascript
function handlePlay(nextSquares) {
```

Executada quando uma jogada é feita.

---

```javascript
const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
```

Cria um novo histórico:

1. Remove jogadas futuras
2. Adiciona a nova jogada

Isso mantém o **histórico consistente**.

---

```javascript
setHistory(nextHistory);
setCurrentMove(nextHistory.length - 1);
```

Atualiza:

* histórico do jogo
* jogada atual

---

# Função jumpTo

```javascript
function jumpTo(nextMove) {
  setCurrentMove(nextMove);
}
```

Permite **voltar para uma jogada específica**.

Isso implementa o **time travel do jogo**.

---

# Lista de jogadas

```javascript
const moves = history.map((squares, move) => {
```

Cria a lista de botões de histórico.

Cada jogada vira um botão.

---

```javascript
if (move > 0) {
  description = "Ir para jogada #" + move;
} else {
  description = "Ir para início";
}
```

Define o texto do botão.

---

```javascript
<button onClick={() => jumpTo(move)}>
```

Ao clicar, volta para aquela jogada.

---

# Renderização do jogo

```javascript
<div className="game">
```

Container principal.

---

```javascript
<Board
  xIsNext={xIsNext}
  squares={currentSquares}
  onPlay={handlePlay}
/>
```

Renderiza o tabuleiro e passa:

* jogador atual
* estado do tabuleiro
* função de jogada.

---

```javascript
<ol>{moves}</ol>
```

Mostra o **histórico de jogadas**.

---

# Função calculateWinner

```javascript
function calculateWinner(squares) {
```

Função responsável por **verificar se alguém venceu**.

---

```javascript
const lines = [
```

Lista todas as **combinações vencedoras possíveis**.

Exemplos:

* linhas horizontais
* verticais
* diagonais.

---

Exemplo:

```
[0,1,2] → primeira linha
[0,4,8] → diagonal
```

---

```javascript
for (let i = 0; i < lines.length; i++) {
```

Percorre todas as combinações possíveis.

---

```javascript
const [a, b, c] = lines[i];
```

Extrai os três índices da linha atual.

---

```javascript
if (
  squares[a] &&
  squares[a] === squares[b] &&
  squares[a] === squares[c]
)
```

Verifica se:

1. Existe valor no quadrado
2. Os três quadrados são iguais.

Se sim → há vencedor.

---

```javascript
return squares[a];
```

Retorna `"X"` ou `"O"`.

---

```javascript
return null;
```

Se nenhuma combinação vencer → retorna `null`.

---

# Resultado

O jogo permite:

* Jogar **Jogo da Velha**
* Alternar entre jogadores
* Detectar vencedor
* Voltar no histórico de jogadas

---

# Tecnologias usadas

* React
* JavaScript
* CSS
* Hooks (`useState`)
