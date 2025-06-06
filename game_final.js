
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Carregar imagens
const unicornImage = new Image();
unicornImage.src = 'unicorn.png'; // Substitua pelo caminho correto

const koalaImage = new Image();
koalaImage.src = 'koala.png'; // Substitua pelo caminho correto

const golemImage = new Image();
golemImage.src = 'golem.png'; // Substitua pelo caminho correto

const backgroundImage = new Image();
backgroundImage.src = 'background.jpg'; // Substitua pelo caminho correto

// Definir tamanho do canvas
canvas.width = 800;
canvas.height = 400;

// Variáveis do Unicórnio e do Koala
let unicornX = 50, unicornY = 300, unicornSpeed = 5, jumpPower = 12, isJumping = false, jumpHeight = 0;
let koalaEnergy = 100, energyLossRate = 0.5, energyGain = 10;
let isKoalaSaved = false;
let golemX = 600, golemY = 300, golemSpeed = 2;
let gameTime = 200; // Tempo inicial (segundos)
let gameTimer;

// Função para desenhar o fundo
function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

// Função para desenhar o Unicórnio
function drawUnicorn() {
    ctx.drawImage(unicornImage, unicornX, unicornY - 50, 50, 50); // Unicórnio como imagem
    ctx.fillStyle = 'yellow';
    ctx.fillText('Unicórnio Guerreiro', unicornX, unicornY - 60);
}

// Função para desenhar o Koala preso com fios de energia
function drawKoala() {
    ctx.drawImage(koalaImage, 600, 200, 50, 50); // Koala preso
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(625, 200);
    ctx.lineTo(625, 250);
    ctx.stroke();
    ctx.fillStyle = 'red';
    ctx.fillText(`Energia: ${koalaEnergy.toFixed(1)}%`, 620, 190);
}

// Função para desenhar o Golem
function drawGolem() {
    ctx.drawImage(golemImage, golemX, golemY - 50, 60, 60); // Golem
    ctx.fillText('Golem da Insônia', golemX, golemY - 60);
}

// Função para desenhar o jogo
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawUnicorn();
    drawKoala();
    drawGolem();
    moveUnicorn();
    jump();
    decreaseKoalaEnergy();
    checkKoalaRescue();
    golemAttacks();
    checkGolemWeakness();
    requestAnimationFrame(drawGame);
}

// Função para controlar o movimento do Unicórnio
function moveUnicorn() {
    if (keys['ArrowRight'] && unicornX + 50 < canvas.width) {
        unicornX += unicornSpeed;
    }
    if (keys['ArrowLeft'] && unicornX > 0) {
        unicornX -= unicornSpeed;
    }
    if (keys['Space'] && !isJumping) {
        isJumping = true;
    }
}

// Função para pulo do Unicórnio
function jump() {
    if (isJumping) {
        if (jumpHeight < jumpPower) {
            unicornY -= 2;
            jumpHeight++;
        } else {
            isJumping = false;
        }
    } else if (unicornY < 300) {
        unicornY += 2;
        jumpHeight--;
    }
}

// Função para diminuir a energia do Koala
function decreaseKoalaEnergy() {
    if (!isKoalaSaved) {
        koalaEnergy -= energyLossRate;
    }
    if (koalaEnergy <= 0) {
        koalaEnergy = 0;
        alert('Koala perdeu toda a energia! Game Over!');
        resetGame();
    }
}

// Função para verificar se o Unicórnio alcançou o Koala
function checkKoalaRescue() {
    if (unicornX + 50 > 600 && unicornX < 650 && !isKoalaSaved) {
        koalaEnergy = 100;  // Energia do Koala será recuperada quando o unicórnio o alcançar
        isKoalaSaved = true;
        alert('Koala resgatado!');
    }
}

// Função para os ataques do Golem
let golemAttack = false;
let golemCooldown = 0;

function golemAttacks() {
    if (golemCooldown > 0) {
        golemCooldown--;
    } else {
        golemAttack = true;
        golemCooldown = 200;
    }
}

function checkGolemWeakness() {
    if (unicornX + 50 > golemX && unicornX < golemX + 60 && golemAttack) {
        alert('Você atacou o ponto fraco do Golem!');
        koalaEnergy += 20;
        if (koalaEnergy > 100) koalaEnergy = 100;
    }
}

// Função para reiniciar o jogo
function resetGame() {
    unicornX = 50;
    unicornY = 300;
    koalaEnergy = 100;
    isKoalaSaved = false;
    gameTime = 200;
    golemX = 600;
    startTimer();
    drawGame();
}

// Controle de teclas pressionadas
let keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Função para iniciar o timer
function startTimer() {
    setInterval(() => {
        if (gameTime > 0) {
            gameTime--;
            document.getElementById('energy').innerText = `${gameTime} s`;
        } else {
            alert('Tempo esgotado! Game Over!');
            resetGame();
        }
    }, 1000);
}

// Iniciar o jogo
startTimer();
drawGame();
