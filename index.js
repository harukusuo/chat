
document.getElementById('entrar-button').addEventListener('click', function() {
    const nickname = document.getElementById('nickname-input').value.trim();
    
    if (nickname === "") {
        alert("Você deve escolher um apelido para continuar.");
    } else {
        window.location.href = 'salas.html';
    }
});