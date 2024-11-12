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

async function fetchMessages() {
    try {
        const token = localStorage.getItem('token');
        const idUser = localStorage.getItem('idUser');
        const nick = localStorage.getItem('nick');
        const urlParams = new URLSearchParams(window.location.search);
        const idSala = urlParams.get('id');
        // timestamp 24h ago
        const timestamp = Date.now() - 24 * 60 * 60 * 1000;

        const response = await fetch(`http://localhost:5000/sala/mensagens?idSala=${idSala}&timestamp=${timestamp}`, {
            headers: {
                'token': token,
                'iduser': idUser,
                'nick': nick
            }
        });
        if (response.ok) {
            let messages = await response.json();

            if(!messages.msgs) {
                console.error('Failed to fetch messages:', messages.msgs);
                return;
            }
            messages = messages.msgs;

            const messagesContainer = document.getElementById('messages-container');
            messagesContainer.innerHTML = ''; // Clear existing messages
            messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.setAttribute('data-sender', message.nick);
                messageElement.innerHTML = `<span class="sender">${message.nick}</span> ${message.msg}`;
                messagesContainer.appendChild(messageElement);
            });
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } else {
            console.error('Failed to fetch messages:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchMessages);

async function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText !== "") {
        const token = localStorage.getItem('token');
        const idUser = localStorage.getItem('idUser');
        const nick = localStorage.getItem('nick');
        const urlParams = new URLSearchParams(window.location.search);
        const idSala = urlParams.get('id');

        try {
            const response = await fetch('http://localhost:5000/sala/mensagem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                    'iduser': idUser,
                    'nick': nick
                },
                body: JSON.stringify({
                    msg: messageText,
                    idSala: idSala
                })
            });

            if (response.ok) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.setAttribute('data-sender', 'user');
                messageElement.innerHTML = `<span class="sender">${nick}</span> ${messageText}`;

                document.getElementById('messages-container').appendChild(messageElement);
                messageInput.value = "";
                document.getElementById('messages-container').scrollTop = document.getElementById('messages-container').scrollHeight;
            } else {
                console.error('Failed to send message:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}

const urlParams = new URLSearchParams(window.location.search);
const roomName = urlParams.get('room');
if (roomName) {
    document.getElementById('chat-room-name').textContent = roomName;
}