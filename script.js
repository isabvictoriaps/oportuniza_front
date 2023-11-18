function exibirMensagemDeErroLogin(message) {
    const mensagemDeErroElemento = document.getElementById('mensagem-de-erro-login');
    if (message) {
        mensagemDeErroElemento.innerText = message;
    } else {
        mensagemDeErroElemento.innerText = 'Erro desconhecido.';
    }
}

function exibirMensagemDeErroCadastro(message) {
    const mensagemDeErroElemento = document.getElementById('mensagem-de-erro-cadastro');
    if (message) {
        mensagemDeErroElemento.innerText = message;
    } else {
        mensagemDeErroElemento.innerText = 'Erro desconhecido.';
    }
}

function cadastrarUsuario() {
    const form_cadastro = document.getElementById('registration-form');
    const formDataCadastro = new FormData(form_cadastro);

    const dataCadastro = {};
    formDataCadastro.forEach((value, key) => {
        dataCadastro[key] = value;
    });

    fetch('http://127.0.0.1:5000/cadastro_usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataCadastro),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message);
            });
        }
        return response.json();
    })
    .then(data => {
        window.location.href = 'tela_login.html';
    })
    .catch(error => {
        console.error('Erro:', error);
        exibirMensagemDeErroCadastro(error.message);
    });
}

function login() {
    const form_login = document.getElementById('login-form');
    const formDataLogin = new FormData(form_login);

    const dataLogin = {};
    formDataLogin.forEach((value, key) => {
        dataLogin[key] = value;
    });

    fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataLogin),
    })
    .then(response => {
        console.log(response); 
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message);
            });
        }
        return response.json();
    })
    .then(data => {
        window.location.href = 'pagina_restrita.html';
    })
    .catch(error => {
        console.error('Erro:', error);
        exibirMensagemDeErroLogin(error.message);
    });
}
