document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/signup', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            window.location.href = '/login';
        }
    }

    xhr.send('username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password));
});




