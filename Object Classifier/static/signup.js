document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/signup', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            success();
            setTimeout(function () {
                window.location.href = '/';
            }, 3000);

        }
    }

    xhr.send('username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password));
});

function success() {
    var div = document.createElement("div");

    div.setAttribute("class", "alert alert-success");

    div.setAttribute("role", "alert");

    div.innerHTML = "Seu usuário foi criado com sucesso! Você será redirecionado para a página em alguns instantes";

    document.body.prepend(div);
}




