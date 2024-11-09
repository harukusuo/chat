
function goBack() {
    window.history.back();
}

document.getElementById('send-button').addEventListener('click', sendMessage);

document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText !== "") {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.setAttribute('data-sender', 'user');
        messageElement.innerHTML = `<span class="sender">Seu Nome</span> ${messageText}`;

        document.getElementById('messages-container').appendChild(messageElement);
        messageInput.value = "";
        document.getElementById('messages-container').scrollTop = document.getElementById('messages-container').scrollHeight;
    }
}

const urlParams = new URLSearchParams(window.location.search);
const roomName = urlParams.get('room');
if (roomName) {
    document.getElementById('chat-room-name').textContent = roomName;
}