const campos = document.querySelectorAll('.opcoes');
const quadro = document.querySelector('.quadro');
const textMensagemDeVitoria = document.querySelector('.mensagem-de-vitoria');
const mensagem = document.querySelector('.mensagem');
const botaoJogarNovamente = document.querySelector('.botaoJogarNovamente');

let isCircle;

const combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    isCircle = false;

    for (const campo of campos) {
        campo.classList.remove("circle");
        campo.classList.remove("x");
        campo.removeEventListener("click", handleClick);
        campo.addEventListener("click", handleClick, { once: true });
    }
    
    trocandoClasseDoHover();
    mensagem.classList.remove('mostrar-mensagem');
};

const endGame = (empate) => {
    if(empate) {
        textMensagemDeVitoria.innerText = "Empate!"
    } else {
        textMensagemDeVitoria.innerText = isCircle 
        ? 'Bolinha Venceu!'
        : 'X Venceu!';
    }

    mensagem.classList.add("mostrar-mensagem")
};

const verificarVitoria = (jogadorAtual) => {
    return combinacoes.some(combinacao => {
        return combinacao.every(index =>{
            return campos[index].classList.contains(jogadorAtual);
        });
    });
};

const verificarEmpate = () => {
    return [...campos].every(campo => {
        return campo.classList.contains('x') || campo.classList.contains('circle');
    });
};

const marcador = (opcao, classToAdd) => {
    opcao.classList.add(classToAdd);
};

const trocandoClasseDoHover = () => {
    quadro.classList.remove('circle');
    quadro.classList.remove('x');

    if (isCircle) {
        quadro.classList.add("circle");
    } else {
        quadro.classList.add("x");
    }
};

const trocarSimbolo = () => {
    isCircle = !isCircle;

    trocandoClasseDoHover();
};

const handleClick = (e) => {
    const opcao = e.target;
    const classToAdd = isCircle ? 'circle' : 'x';
    marcador(opcao, classToAdd);

    const vitoria = verificarVitoria(classToAdd);
    const empate = verificarEmpate();
    
    if(vitoria) {
        endGame(false);
    } else if(empate) {
        endGame(true);
    } else {
        trocarSimbolo();
    }
};

startGame();
botaoJogarNovamente.addEventListener('click', startGame);