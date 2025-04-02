// Referencias a los elementos del DOM
const loginScreen = document.getElementById('login-screen');
const registerScreen = document.getElementById('register-screen');
const canvas = document.getElementById('c');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');
const goToLogin = document.getElementById('go-to-login');

// Base de datos simulada
const users = {
  Alondra: '123456',
  Matias: '123456'
};

// Mostrar pantalla de registro
goToLogin.addEventListener('click', function () {
  registerScreen.style.display = 'none';
  loginScreen.style.display = 'flex';
});

// Manejo del registro
registerForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const newUsername = document.getElementById('new-username').value;
  const newPassword = document.getElementById('new-password').value;

  if (newUsername && newPassword) {
    users[newUsername] = newPassword; // Agrega un nuevo usuario
    alert(`Usuario registrado: ${newUsername}`);
    registerScreen.style.display = 'none';
    loginScreen.style.display = 'flex';
  }
});

// Manejo del inicio de sesión
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (users[username] === password) {
    // Ocultar pantalla de inicio y mostrar la animación
    loginScreen.style.display = 'none';
    canvas.style.display = 'block';
    anim(); // Inicia la animación
  } else {
    errorMessage.textContent = 'Usuario o contraseña incorrectos.';
  }
});

// Código original para la animación
var w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,
    ctx = canvas.getContext('2d'),

    hw = w / 2,
    hh = h / 2,

    opts = {
        strings: ['HAPPY', 'BIRTHDAY!', 'My Love'],
        charSize: 30,
        charSpacing: 35,
        lineHeight: 40,

        cx: w / 2,
        cy: h / 2,

        fireworkPrevPoints: 10,
        fireworkBaseLineWidth: 5,
        fireworkAddedLineWidth: 8,
        fireworkSpawnTime: 200,
        fireworkBaseReachTime: 30,
        fireworkAddedReachTime: 30,
        fireworkCircleBaseSize: 20,
        fireworkCircleAddedSize: 10,
        fireworkCircleBaseTime: 30,
        fireworkCircleAddedTime: 30,
        fireworkCircleFadeBaseTime: 10,
        fireworkCircleFadeAddedTime: 5,
        fireworkBaseShards: 5,
        fireworkAddedShards: 5,
        fireworkShardPrevPoints: 3,
        fireworkShardBaseVel: 4,
        fireworkShardAddedVel: 2,
        fireworkShardBaseSize: 3,
        fireworkShardAddedSize: 3,
        gravity: .1,
        upFlow: -.1,
        letterContemplatingWaitTime: 360,
        balloonSpawnTime: 20,
        balloonBaseInflateTime: 10,
        balloonAddedInflateTime: 10,
        balloonBaseSize: 20,
        balloonAddedSize: 20,
        balloonBaseVel: .4,
        balloonAddedVel: .4,
        balloonBaseRadian: -(Math.PI / 2 - .5),
        balloonAddedRadian: -1,
    },
    calc = {
        totalWidth: opts.charSpacing * Math.max(opts.strings[0].length, opts.strings[1].length)
    },

    Tau = Math.PI * 2,
    TauQuarter = Tau / 4,

    letters = [];

ctx.font = opts.charSize + 'px Verdana';

function Letter(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;

    this.dx = -ctx.measureText(char).width / 2;
    this.dy = +opts.charSize / 2;

    this.fireworkDy = this.y - hh;

    var hue = x / calc.totalWidth * 360;

    this.color = 'hsl(hue,100%,60%)'.replace('hue', hue);
    this.lightAlphaColor = 'hsla(hue,100%,70%,alp)'.replace('hue', hue);
    this.lightColor = 'hsl(hue,100%,70%)'.replace('hue', hue);
    this.alphaColor = 'hsla(hue,100%,60%,alp)'.replace('hue', hue);

    this.reset();
}
Letter.prototype.reset = function () {
    this.phase = 'firework';
    this.tick = 0;
    this.spawned = false;
    this.spawningTime = opts.fireworkSpawnTime * Math.random() | 0;
    this.reachTime = opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random() | 0;
    this.lineWidth = opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
    this.prevPoints = [[0, hh, 0]];
}

Letter.prototype.step = function () {
    // Implementación larga del paso omitida aquí por espacio...
}

function anim() {
    window.requestAnimationFrame(anim);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    ctx.translate(hw, hh);

    let done = true;
    for (let l = 0; l < letters.length; ++l) {
        letters[l].step();
        if (letters[l].phase !== 'done') done = false;
    }

    ctx.translate(-hw, -hh);

    if (done) {
        for (let l = 0; l < letters.length; ++l) letters[l].reset();
    }
}

for (let i = 0; i < opts.strings.length; ++i) {
    for (let j = 0; j < opts.strings[i].length; ++j) {
        letters.push(new Letter(
            opts.strings[i][j],
            j * opts.charSpacing + opts.charSpacing / 2 - opts.strings[i].length * opts.charSize / 2,
            i * opts.lineHeight + opts.lineHeight / 2 - opts.strings.length * opts.lineHeight / 2
        ));
    }
}

anim();

window.addEventListener('resize', function () {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

    hw = w / 2;
    hh = h / 2;

    ctx.font = opts.charSize + 'px Verdana';
});
