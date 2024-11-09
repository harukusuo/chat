function goToChat(roomName) {
    // Redirecionar para a sala de chat correspondente
    window.location.href = `/chat?room=${encodeURIComponent(roomName)}`;
}