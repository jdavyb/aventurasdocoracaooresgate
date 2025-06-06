
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Definir tamanho do canvas
canvas.width = 800;
canvas.height = 400;

// Variáveis do Unicórnio e do Koala
let unicornX = 50, unicornY = 300, unicornSpeed = 5, jumpPower = 12, isJumping = false, jumpHeight = 0;
let koalaEnergy = 100, energyLossRate = 0.5, energyGain = 10;
let isKoalaSaved = false;
let golemX = 600, golemY = 300, golemSpeed = 2;

// Função para desenhar o Unicórnio
function drawUnicorn() {
    ctx.fillStyle = 'purple';
    ctx.fillRect(unicornX, unicornY - 50, 50, 50); // Desenha o unicórnio como um quadrado
}

// Função para desenhar o Koala
function drawKoala() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(300, 250, 50, 50); // Representa o Koala
    ctx.fillStyle = 'red';
    ctx.fillText(`Energia: ${koalaEnergy.toFixed(1)}`, 300, 240);
}

// Função para desenhar o Golem
function drawGolem() {
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(golemX, golemY - 50, 60, 60); // Golem como um quadrado
}

// Função de controle de movimento do Unicórnio
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

// Função de pulo do Unicórnio
function jump() {
    if (isJumping) {
        if (jumpHeight < jumpPower) {
            unicornY -= 2;  // Sobe o Unicórnio
            jumpHeight++;
        } else {
            isJumping = false;
        }
    } else if (unicornY < 300) {
        unicornY += 2;  // Desce o Unicórnio
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
    if (unicornX + 50 > 300 && unicornX < 350) {
        koalaEnergy += energyGain;
        if (koalaEnergy > 100) koalaEnergy = 100;
    }
}

// Função para desenhar o jogo
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawUnicorn();
    drawKoala();
    drawGolem();

    moveUnicorn();
    jump();
    decreaseKoalaEnergy();
    checkKoalaRescue();
    requestAnimationFrame(drawGame);
}

// Função para reiniciar o jogo
function resetGame() {
    unicornX = 50;
    unicornY = 300;
    koalaEnergy = 100;
    isKoalaSaved = false;
    golemX = 600;
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

// Iniciar o jogo
drawGame();
