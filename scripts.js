const campos = document.querySelectorAll('.opcoes');
const quadro = document.querySelector('.quadro');

let isCircle;

const startGame = () => {
    for (const campo of campos) {
        campo.addEventListener("click", handleClick, { once: true });
    }

    isCircle = false;
    
    quadro.classList.add("x");
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

    trocarSimbolo();
};

startGame();