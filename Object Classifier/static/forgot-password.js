var tr = document.createElement('tr');


async function fetchUsers() {
    const response = await fetch("/users")
        .then(response => response.json())
        .then(users => view_users(users));
}

function view_users(users) {
    console.log(users)
    tbody = document.getElementById('user-rows');

    let order = 1;
    for (const user in users) {
        const valor = users[user];

        const tr = document.createElement('tr');

        const tdOrder = document.createElement('td');
        tdOrder.textContent = order;

        const tdUser = document.createElement('td');
        tdUser.textContent = user;

        const tdPassword = document.createElement('td');
        tdPassword.textContent = valor;

        tr.appendChild(tdOrder);
        tr.appendChild(tdUser);
        tr.appendChild(tdPassword);

        tbody.appendChild(tr);

        order++;
    }
}

fetchUsers();