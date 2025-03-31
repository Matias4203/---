document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnIniciar").addEventListener("click", verificarLogin);
});

function verificarLogin() {
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;
    const mensajeError = document.getElementById("mensajeError");

    const usuariosValidos = {
        "Alondra": "123456789",
        "Matias": "123456789"
    };

    if (usuariosValidos[usuario] && usuariosValidos[usuario] === contrasena) {
        document.getElementById("pantallaInicial").style.display = "none";
        document.getElementById("contenedorAnimacion").style.display = "block";
        iniciarAnimacion(); // Llamar a la animación al ingresar
    } else {
        mensajeError.textContent = "Usuario o contraseña incorrectos";
    }
}

function iniciarAnimacion() {
    const canvas = document.getElementById("miCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let cuadrados = [];

    function crearCuadrados() {
        for (let i = 0; i < 20; i++) {
            cuadrados.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                tamano: 50,
                color: "blue",
                velocidadX: (Math.random() - 0.5) * 5,
                velocidadY: (Math.random() - 0.5) * 5
            });
        }
    }

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        cuadrados.forEach(cuadrado => {
            ctx.fillStyle = cuadrado.color;
            ctx.fillRect(cuadrado.x, cuadrado.y, cuadrado.tamano, cuadrado.tamano);

            cuadrado.x += cuadrado.velocidadX;
            cuadrado.y += cuadrado.velocidadY;

            if (cuadrado.x <= 0 || cuadrado.x + cuadrado.tamano >= canvas.width) {
                cuadrado.velocidadX *= -1;
            }
            if (cuadrado.y <= 0 || cuadrado.y + cuadrado.tamano >= canvas.height) {
                cuadrado.velocidadY *= -1;
            }
        });

        requestAnimationFrame(animar);
    }

    crearCuadrados();
    animar();
}
