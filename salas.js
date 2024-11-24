function goToChat(roomName, roomId) {
    // Redirecionar para a sala de chat correspondente
    window.location.href = `./chat.html?room=${encodeURIComponent(roomName)}&id=${roomId}`;
}

async function fetchRooms() {
    try {
        const token = localStorage.getItem('token');
        const idUser = localStorage.getItem('idUser');
        const nick = localStorage.getItem('nick');

        if (!token || !idUser || !nick) {
            console.error('Dados de autenticação ausentes.');
            alert('Erro de autenticação. Por favor, faça login novamente.');
            window.location.href = 'index.html';
            return;
        }

        const response = await fetch('https://api-chat-sahs.vercel.app/salas', {
            headers: {
                'token': token,
                'iduser': idUser,
                'nick': nick
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro ao buscar salas:', response.statusText, errorText);
            alert('Erro ao buscar salas. Tente novamente.');
            return;
        }
        const rooms = await response.json();
        const roomsContainer = document.getElementById('rooms');
        rooms.forEach(room => {
            const button = document.createElement('button');
            button.className = 'room-button';
            button.onclick = () => goToChat(room.nome, room._id);
            button.innerHTML = `
                <div class="room-info">
                    <h3>${room.nome}</h3>
                    <p>${room.descricao}</p>
                </div>
            `;
            roomsContainer.appendChild(button);
        });
    } catch (error) {
        console.error('Erro ao buscar salas:', error);
        alert('Erro ao buscar salas. Tente novamente.');
    }
}

fetchRooms();