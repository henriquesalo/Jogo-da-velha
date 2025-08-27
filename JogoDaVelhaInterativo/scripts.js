class JogoDaVelha {
    constructor() {
        this.campos = document.querySelectorAll('.opcoes');
        this.quadro = document.querySelector('.quadro');
        this.textMensagemDeVitoria = document.querySelector('.mensagem-de-vitoria');
        this.mensagem = document.querySelector('.mensagem');
        this.botaoJogarNovamente = document.querySelector('.botaoJogarNovamente');

        this.isCircle = false;

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

        this.startGame();
        this.botaoJogarNovamente.addEventListener('click', () => this.startGame());
    }

    startGame() {
        this.isCircle = false;

        for (const campo of this.campos) {
            campo.classList.remove("circle");
            campo.classList.remove("x");
            campo.replaceWith(campo.cloneNode(true));
        }

        this.campos = document.querySelectorAll('.opcoes');
        for (const campo of this.campos) {
            campo.addEventListener('click', (e) => this.handleClick(e), { once: true } );
        }

        this.trocandoClasseDoHover();
        this.mensagem.classList.remove('mostrar-mensagem');
    }

    endGame(empate) {
        if(empate) {
            this.textMensagemDeVitoria.innerText = "Empate! Deu Velha!"
        } else {
            this.textMensagemDeVitoria.innerText = this.isCircle
                ? 'Bolinha Venceu!'
                : 'X Venceu!';
        }
        this.mensagem.classList.add("mostrar-mensagem");
    }

    verificarVitoria(jogadorAtual) {
        return this.combinacoes.some(combinacao =>
            combinacao.every(index =>
                this.campos[index].classList.contains(jogadorAtual)
            )
        );
    }

    verificarEmpate() {
        return [...this.campos].every(campo =>
            campo.classList.contains('x') || campo.classList.contains('circle')
        );
    }

    marcador(opcao, classToAdd) {
        opcao.classList.add(classToAdd);
    }

    trocandoClasseDoHover() {
        this.quadro.classList.remove('circle');
        this.quadro.classList.remove('x');

        if (this.isCircle) {
            this.quadro.classList.add("circle");
        } else {
            this.quadro.classList.add("x");
        }
    }

    trocarSimbolo() {
        this.isCircle = !this.isCircle;
        this.trocandoClasseDoHover();
    }

    handleClick(e) {
        const opcao = e.target;
        const classToAdd = this.isCircle ? 'circle' : 'x';
        this.marcador(opcao, classToAdd);

        const vitoria = this.verificarVitoria(classToAdd);
        const empate = this.verificarEmpate();

        if (vitoria) {
            this.endGame(false);
        } else if (empate) {
            this.endGame(true);
        } else {
            this.trocarSimbolo();
        }
    }
}

const jogo = new JogoDaVelha();