const readline = require("readline");

class JogoDaVelha {
    constructor() {
        this.tabuleiro = Array(9).fill(null);
        this.jogadorAtual = "X";
        this.combinacoes = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    }

    mostrarTabuleiro() {
        console.log(`
          ${this.tabuleiro[0] || "-"} | ${this.tabuleiro[1] || "-"} | ${this.tabuleiro[2] || "-"}
          ${this.tabuleiro[3] || "-"} | ${this.tabuleiro[4] || "-"} | ${this.tabuleiro[5] || "-"}
          ${this.tabuleiro[6] || "-"} | ${this.tabuleiro[7] || "-"} | ${this.tabuleiro[8] || "-"}
        `);
    }

    jogar(posicao) {
        if (posicao < 0 || posicao > 8) {
            console.log("❌ Posição inválida! Escolha entre 0 e 8.");
            return false;
        }

        if (this.tabuleiro[posicao] !== null) {
            console.log("⚠️ Essa posição já está ocupada!");
            return false;
        }

        this.tabuleiro[posicao] = this.jogadorAtual;
        return true;
    }

    verificarVitoria() {
        return this.combinacoes.some(combinacao =>
            combinacao.every(index => this.tabuleiro[index] === this.jogadorAtual)
        );
    }

    verificarEmpate() {
        return this.tabuleiro.every(campo => campo !== null);
    }

    alternarJogador() {
        this.jogadorAtual = this.jogadorAtual === "X" ? "O" : "X";
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const jogo = new JogoDaVelha();

console.log("=== Jogo da Velha ===");
console.log("Digite uma posição de 0 a 8 para jogar:");
jogo.mostrarTabuleiro();

function jogarRodada() {
    rl.question(`👉 Jogador ${jogo.jogadorAtual}, escolha uma posição (0-8): `, (resposta) => {
        const posicao = parseInt(resposta);

        if (!jogo.jogar(posicao)) {
            return jogarRodada();
        }

        jogo.mostrarTabuleiro();

        if (jogo.verificarVitoria()) {
            console.log(`🏆 Jogador ${jogo.jogadorAtual} venceu!`);
            rl.close();
            return;
        }

        if (jogo.verificarEmpate()) {
            console.log("🤝 Empate! Deu velha!");
            rl.close();
            return;
        }

        jogo.alternarJogador();
        jogarRodada();
    });
}

jogarRodada();