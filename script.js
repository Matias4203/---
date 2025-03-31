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
        iniciarAnimacion(); // Se ejecuta la animación después del login
    } else {
        mensajeError.textContent = "Usuario o contraseña incorrectos";
    }
}

// Aquí pon tu código original de la animación sin cambios.
