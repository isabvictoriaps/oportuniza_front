var usuario;

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
    const formDataCadastroUsuario = new FormData(form_cadastro);

    fetch('http://127.0.0.1:5000/cadastro_usuario', {
        method: 'POST',
        body: formDataCadastroUsuario,
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

function cadastrarCurso() {
    const form_cadastrocurso = document.getElementById('cursos-form');
    const formDataCadastro = new FormData(form_cadastrocurso);

    fetch('http://127.0.0.1:5000/curso', {
        method: 'POST',
        body: formDataCadastro,
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
        })
        .catch(error => {
            console.error('Erro:', error);
            exibirMensagemDeErroCadastro(error.message);
        });
}

function login() {
    const form_login = document.getElementById('login-form');
    const formDataLogin = new FormData(form_login);
    var usuario;

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
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
            return response.json();
        })
        .then(data => {
            window.location.href = 'pagina_restrita.html';
            usuario = data.usuario
            console.log(usuario)
            return data.usuario
        })
        .catch(error => {
            console.error('Erro:', error);
            exibirMensagemDeErroLogin(error.message);
        });
        
}


function obterInformacoesUsuario(usuario) {
    console.log(usuario)
    fetch(`http://127.0.0.1:5000/usuario/${usuario}`, {
        method: 'GET',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição do usuário');
            }
            return response.json();
        })
        .then(data => {
            console.log('Nome Completo:', data.nome_completo);
            console.log('Imagem de Perfil:', data.img_usuario);

            login()

            const urlImagem = data.url_imagem;
            const imagemElemento = document.getElementById('img_usuario');
            const nomeUsuarioElemento = document.getElementById('nome_usuario');

            if (imagemElemento && nomeUsuarioElemento) {
                imagemElemento.src = urlImagem;
                imagemElemento.alt = 'Imagem do Usuário';
                nomeUsuarioElemento.innerText = data.nome_completo;
            } else {
                console.error('Elemento com ID "img_usuario" ou "nome_usuario" não encontrado.');
            }
        })
        .catch(error => {
            console.error('Erro ao obter informações do usuário:', error);
        });
};

