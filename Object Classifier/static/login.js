document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('user').value;
    var password = document.getElementById('password').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            window.location.href = '/index';
        } else {
            loginError();
        }
    }

    xhr.send('username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password));
});

function loginError() {

    if (document.getElementById('loginError')) {
        return;
    }
    // Criação do elemento div
    var div = document.createElement("div");

    // Definição do ID e das classes da div
    div.id = "loginError";
    div.className = "alert alert-danger alert-dismissible fade show";

    // Criação do elemento strong e do texto dentro dele
    var strong = document.createElement("strong");
    strong.textContent = "Error! ";

    // Criação do elemento button
    var button = document.createElement("button");
    button.type = "button";
    button.className = "btn-close";
    button.setAttribute("data-bs-dismiss", "alert");

    // Texto dentro da div
    var text = document.createTextNode("Verifique seu usuário e senha para tentar novamente.");

    // Adicionando os elementos à div
    div.appendChild(strong);
    div.appendChild(text);
    div.appendChild(button);

    document.body.prepend(div);
}
