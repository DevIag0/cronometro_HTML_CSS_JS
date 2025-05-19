// Selecionando elementos do DOM
const displayElement = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

// Variáveis para controlar o cronômetro
let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId = null;
let hrs = 0;
let mins = 0;
let secs = 0;

// Função para iniciar o cronômetro
startBtn.addEventListener('click', () => {
    if (paused) {
        paused = false;
        // Se o cronômetro foi pausado antes, continua de onde parou
        // Caso contrário, inicia do zero
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000);
    }
});

// Função para pausar o cronômetro
pauseBtn.addEventListener('click', () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});

// Função para resetar o cronômetro
resetBtn.addEventListener('click', () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    displayElement.textContent = "00:00:00";
});

// Função para atualizar o tempo no display
function updateTime() {
    elapsedTime = Date.now() - startTime;

    // Convertendo o tempo para horas, minutos e segundos
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    // Formatando o tempo para exibição (adicionando zero à esquerda se necessário)
    secs = formatTime(secs);
    mins = formatTime(mins);
    hrs = formatTime(hrs);

    // Atualizando o display
    displayElement.textContent = `${hrs}:${mins}:${secs}`;

    function formatTime(time) {
        return time < 10 ? "0" + time : time;
    }
}
