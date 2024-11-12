document.getElementById('entrar-button').addEventListener('click', async () => {
    const nickname = document.getElementById('nickname-input').value.trim();
    if (!nickname) {
        alert('Por favor, insira um apelido.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/entrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nick: nickname })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro ao registrar usuário:', response.statusText, errorText);
            alert('Erro ao registrar usuário. Tente novamente.');
            return;
        }

        const data = await response.json();
        if (data.token && data.idUser && data.nick) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('idUser', data.idUser);
            localStorage.setItem('nick', data.nick);
            window.location.href = 'salas.html';
        } else {
            console.error('Dados incompletos recebidos:', data);
            alert('Erro ao registrar usuário. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro na requisição. Tente novamente.');
    }
});