const campos = document.querySelectorAll('.opcoes');
const quadro = document.querySelector('.quadro');

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
    for (const campo of campos) {
        campo.addEventListener("click", handleClick, { once: true });
    }

    isCircle = false;
    
    quadro.classList.add("x");
};

const verificarVitoria = (jogadorAtual) => {
    return combinacoes.some(combinacao => {
        return combinacao.every(index =>{
            return campos[index].classList.contains(jogadorAtual);
        });
    });
};

const marcador = (opcao, classToAdd) => {
    opcao.classList.add(classToAdd);
};

const trocarSimbolo = () => {
    isCircle = !isCircle;

    quadro.classList.remove('circle');
    quadro.classList.remove('x');

    if (isCircle) {
        quadro.classList.add("circle");
    } else {
        quadro.classList.add("x");
    }

};

const handleClick = (e) => {
    const opcao = e.target;
    const classToAdd = isCircle ? 'circle' : 'x';
    marcador(opcao, classToAdd);

    const vitoria = verificarVitoria(classToAdd);
    if(vitoria) {
        console.log("vencedor!")
    }

    trocarSimbolo();
};

startGame();