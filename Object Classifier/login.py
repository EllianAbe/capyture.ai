from flask import Blueprint, request, render_template

login_bp = Blueprint('login_bp', __name__)

users = {'capyadmin': 'capyadmin'}

@login_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username in users and users[username] == password:
            return render_template('index.html')
    return render_template('login.html'), 401

@login_bp.route('/signup', methods=['GET','POST'])
def add_user():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        users[username] = password

        return render_template('login.html')
    return render_template('signup.html')