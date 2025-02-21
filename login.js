const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');

// Troca entre Login e Cadastro
showRegister?.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

showLogin?.addEventListener('click', () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Cadastro
registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    if (usuarios[username]) {
        alert('⚠️ Usuário já existe. Escolha outro nome.');
        return;
    }

    usuarios[username] = { senha: password, itens: [] };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('✅ Conta criada com sucesso! Faça o login.');

    registerForm.reset();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Login
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    if (usuarios[username] && usuarios[username].senha === password) {
        localStorage.setItem('usuarioLogado', username);
        window.location.href = 'home.html';
    } else {
        alert('❌ Usuário ou senha incorretos.');
    }
});
