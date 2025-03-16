const input_nome = document.querySelector('#input-nome');
const input_email = document.querySelector('#input-email');
const input_senha = document.querySelector('#input-senha');
const input_senha_confirm = document.querySelector('#input-senha-confirm');
const botao_submit = document.querySelector('#btn-submit');


botao_submit.addEventListener('click', (event) => {
    event.preventDefault();
    postUsuario();
});


const postUsuario = () => {
    const nome = input_nome.value;
    const email = input_email.value;
    const senha = input_senha.value;
    const senhaConfirm = input_senha_confirm.value;

    if (senha !== senhaConfirm) {
        alert("As senhas não coincidem!");
        return;
    }

    const novoUsuario = { nome, email, senha };
    console.log("Novo usuário:", novoUsuario);

    const usuario_json = JSON.stringify(novoUsuario);

    fetch("http://localhost:3000/usuarios", {
        body: usuario_json,
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("Usuário cadastrado:", data);
    })
    .catch((error) => {
        console.error("Erro ao cadastrar usuário:", error);
    });
}


const getUsuarios = () => {
    fetch('http://localhost:3000/usuarios')
    .then((res) => res.json())
    .then((json) => {
        console.log("Usuários cadastrados:", json);
    })
    .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
    });
}

const deleteUsuario = (id_usuario) => {
    fetch(`http://localhost:3000/usuarios/${id_usuario}`, {
        method: 'DELETE'
    })
    .then(() => {
        console.log(`Usuário com ID ${id_usuario} excluído.`);
    })
    .catch((error) => {
        console.error("Erro ao excluir usuário:", error);
    });
}
