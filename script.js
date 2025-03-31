function verificarLogin() {
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;
    const mensajeError = document.getElementById("mensajeError");

    // Usuarios válidos
    const usuariosValidos = {
        "Alondra": "123456789",
        "Matias": "123456789"
    };

    if (usuariosValidos[usuario] && usuariosValidos[usuario] === contrasena) {
        document.getElementById("pantallaInicial").style.display = "none"; // Oculta la pantalla de login
        document.getElementById("contenedorAnimacion").style.display = "block"; // Muestra la animación
    } else {
        mensajeError.textContent = "Usuario o contraseña incorrectos";
    }
}

// Tu código de animación original (manteniendo la animación)
const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 50, 50);
    requestAnimationFrame(animar);
}

animar();
